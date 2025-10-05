// $lib/Services/Svc_Vehicles.ts
export function generatePlateNumber(vin: string, year: number, bodyType: string): string {
  const prefix = getPrefixFromYear(year) ?? 'XX';
  const bodyCode = getBodyTypeCode(bodyType) ?? 'X';
  const hash = vinToStableNumber(vin);
  const last4 = (hash % 10000).toString().padStart(4, '0');
  return `${prefix}${bodyCode} ${last4}`;
}

function getPrefixFromYear(year: number): string | null {
  if (!year || isNaN(year)) return null;
  if (year >= 2020) return 'N';
  if (year >= 2010) return 'M';
  if (year >= 2000) return 'L';
  return 'K';
}

function getBodyTypeCode(bodyType: string): string | null {
  if (!bodyType) return null;
  const normalized = bodyType.toLowerCase();
  if (normalized.includes('sedan')) return 'S';
  if (normalized.includes('suv')) return 'U';
  if (normalized.includes('truck')) return 'T';
  if (normalized.includes('van')) return 'V';
  return 'X';
}

function vinToStableNumber(vin: string): number {
  if (!vin) return 0;
  let sum = 0;
  for (let i = 0; i < vin.length; i++) {
    const char = vin.charCodeAt(i);
    sum = (sum * 31 + char) >>> 0; // ensure unsigned 32-bit
  }
  return sum;
}

/**
 * Returns the current ISO timestamp for audit fields.
 */
export function generateEffectiveDateTime(): string {
  return new Date().toISOString();
}
