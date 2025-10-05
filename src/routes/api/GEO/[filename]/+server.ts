// src/routes/api/GEO/[filename]/+server.ts
import fs from 'fs/promises';
import path from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const { filename } = params;

  // only allow .json files
  if (!filename.endsWith('.json')) {
    return new Response('Only .json files are allowed', { status: 400 });
  }

  const filePath = path.join('/etc/GEO/lowres', filename);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(`File not found: ${filePath}`, { status: 404 });
  }
};
