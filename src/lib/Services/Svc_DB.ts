import type { User, Persona_Record } from '$lib/types';
import { dispatchBrowserEvent } from '$lib/Services/Svc_Toast'; // Corrected: Absolute import

// Define a type for the fetch function to allow for SvelteKit's contextual fetch
type FetchLike = typeof globalThis.fetch;

const cache = new Map<string, Promise<any>>();

function createApiMessage(query: any): { message: string; iconType?: string; } {
  if (query?.e) {
    const endpoint = query.e.split('.').pop();
    if (endpoint.includes('search_options')) return { message: 'Loading Filters...', iconType: 'Loading' };
    if (endpoint.includes('vw_')) return { message: `Loading ${endpoint.replace('vw_', '')}...`, iconType: 'Loading' };
    if (endpoint.includes('inventory')) return { message: 'Searching Inventory...', iconType: 'Searching' };
    if (endpoint.includes('population')) return { message: 'Searching Population... ', iconType: 'Searching' };
    if (endpoint.includes('Banks')) return { message: 'Loading Banks...', iconType: 'Loading' };
    if (endpoint.includes('fn_user')) return { message: 'Loading Users...', iconType: 'Loading' };
    if (endpoint.includes('fn_pending')) return { message: `Loading Items for ${query.w.replace(/'/g, '')}...`, iconType: 'Loading' };
    if (endpoint.includes('fn_newpurchase')) return { message: `Creating new Purchase Record...`, iconType: 'Creating' };
    if (endpoint.includes('fn_newltoprocess')) return { message: `Processing Transaction...`, iconType: 'Processing' };
  }
  return { message: 'Filtering...', iconType: 'Filtering' };
}

const CACHE_BLACKLIST = [
  'vehicles.fn_newltoprocess'
];

function shouldCache(query: string | object): boolean {
  const queryStr = typeof query === 'string' ? query : JSON.stringify(query);
  return !CACHE_BLACKLIST.some(blacklisted => queryStr.includes(blacklisted));
}

export function graphine(method: 'post' | 'get', query: string | object, customFetch?: FetchLike): Promise<any> {
  const fetchToUse = customFetch || globalThis.fetch;

  const cacheKey = JSON.stringify({ method, query });
  if (shouldCache(query) && cache.has(cacheKey)) {
    dispatchBrowserEvent('apirequest:cachehit');
    return cache.get(cacheKey)!;
  }
  const { message, iconType } = createApiMessage(query);
  dispatchBrowserEvent('apirequest:start', { message, iconType });
  const promise = (async () => {
    try {
      const endpoint = '/api/query';

      let fullUrl = endpoint;
      const requestOptions: RequestInit = {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };

      if (method.toUpperCase() === 'POST') {
        requestOptions.body = JSON.stringify(query);
      } else {
        if (typeof query !== 'string') {
          throw new Error('Invalid query type for GET request.');
        }
        fullUrl = `${endpoint}?${query}`;
      }

      console.log('--- graphine: Making fetch request to:', fullUrl, 'with options:', requestOptions);
      const response = await fetchToUse(fullUrl, requestOptions);
      console.log('--- graphine: Received fetch response. Status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        let errorText = 'No error text available.';
        try {
          errorText = await response.text();
        } catch (textError) {
          console.error('--- graphine: Failed to get error text from response:', textError);
          errorText = 'Could not parse error response text.';
        }
        console.error('--- graphine: !!! FETCH RESPONSE NOT OK !!! Status:', response.status, 'Error Text:', errorText);
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
      const data = await response.json();
      console.log('--- graphine: Successfully parsed JSON data:', data);
      dispatchBrowserEvent('apirequest:end', { detail: { success: true } });

      return data;
    } catch (error) {
      console.error('--- graphine: ERROR caught in inner try-catch:', error);
      dispatchBrowserEvent('apirequest:end', { detail: { success: false } });
      throw error;
    }
  })();

  promise.catch((error) => {
    console.error('--- graphine: ERROR caught in outer promise.catch (network/uncaught):', error);
    cache.delete(cacheKey);
  });
  cache.set(cacheKey, promise);

  return promise;
}

export function clearCacheEntry(method: 'post' | 'get', query: string | object) {
  const cacheKey = JSON.stringify({ method, query });
  if (cache.has(cacheKey)) {
    cache.delete(cacheKey);
  }
}

export async function graphine_notify({
  e,
  w,
  l,
  notify,
  roles = [],
  tag = 'generic'
}: {
  e: string;
  w: any[];
  l?: string;
  notify?: {
    method: string;
    payload: any;
    roles?: string[];
    tag?: string;
  };
  roles?: string[];
  tag?: string;
}, customFetch?: FetchLike) {
  const fetchToUse = customFetch || globalThis.fetch;

  console.log('--- graphine_notify START ---');
  console.log('  e (endpoint):', e);
  console.log('  w (database arguments):', w);
  console.log('  l (limit):', l);
  console.log('  notify (broadcast project_Config):', notify);
  console.log('  roles (default if not in notify):', roles);
  console.log('  tag (default if not in notify):', tag);

  const queryToGraphine = { e, w, l };
  console.log('--- Sending to graphine (POST /api/query/):', queryToGraphine);

  try {
    const result = await graphine('POST', queryToGraphine, customFetch);

    console.log('--- Received result from graphine:', result);

    if (notify?.method && notify?.payload) {
      if (e.includes('fn_newpurchase')) {
        const originalPurchaseId = notify.payload.purchase_id;
        notify.payload.purchase_id = result[0].fn_newpurchase;
        console.log('--- fn_newpurchase detected. purchase_id updated in notify.payload:');
        console.log(`    Original: ${originalPurchaseId}, New: ${notify.payload.purchase_id}`);
      }

      const broadcastBody = {
        notify: {
          method: notify.method,
          payload: notify.payload,
          roles: notify.roles || roles,
          tag: notify.tag || tag
        }
      };
      console.log('--- Sending to /api/broadcast (body):', JSON.stringify(broadcastBody, null, 2));

      await fetchToUse('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(broadcastBody)
      });
      console.log('--- Broadcast fetch completed successfully.');
    }

    console.log('--- graphine_notify END ---');
    return result;
  } catch (error) {
    console.error('--- graphine_notify ERROR caught:', error);
    throw error;
  }
}

function capFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function loadBanks(customFetch?: FetchLike): Promise<any[]> {
  const predicate = { e: 'Finance.Banks' };
  return graphine('post', predicate, customFetch);
}

export async function loadUsersByPersona(persona: string, customFetch?: FetchLike): Promise<User[]> {
  const userList = persona.toLowerCase() === 'purchase' ? 'buyers' : persona;
  const predicate = {
    e: 'vehicles.fn_user',
    l: '40',
    w: `'${userList}'`
  };
  return await graphine('post', predicate, customFetch);
}

export async function loadPendingPersonaItems(persona: string, customFetch?: FetchLike): Promise<Persona_Record[]> {
  let x = capFirst(persona);
  const predicate = {
    e: 'vehicles.fn_pendingprocess',
    w: `'${x}'`
  };
  return await graphine('post', predicate, customFetch);
}

export async function loadPersonaItem(id: string, customFetch?: FetchLike): Promise<Persona_Record[]> {
  const predicate = {
    e: 'vehicles.fn_360view',
    w: `'${id}'`
  };
  return await graphine('post', predicate, customFetch);
}