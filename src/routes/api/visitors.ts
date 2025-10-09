import fs from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';

const filePath = path.resolve('$lib/Data/visitors.json');

export const POST: RequestHandler = async ({ request, locals }) => {
  const visitors = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Get the IP from the request headers
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0] || request.headers.get('remote_addr') || 'unknown';

  const newId = visitors.length > 0 ? visitors[visitors.length - 1].id + 1 : 1;

  const newVisitor = {
    id: newId,
    ip,
    visitedAt: new Date().toISOString(),
    page: '/'
  };

  visitors.push(newVisitor);
  fs.writeFileSync(filePath, JSON.stringify(visitors, null, 2));

  return new Response(JSON.stringify(newVisitor), { status: 201 });
};
