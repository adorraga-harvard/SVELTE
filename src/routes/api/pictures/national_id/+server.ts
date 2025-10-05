// +server.ts
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('static/pictures/national_id');

function ensureDirExists() {
  fs.mkdirSync(baseDir, { recursive: true });
}

function isValidPng(filename: string) {
  return filename.endsWith('.png') || filename.endsWith('.qr');
}

function saveFile(filename: string, buffer: Buffer) {
  ensureDirExists();
  fs.writeFileSync(path.join(baseDir, filename), buffer);
}

function fileExists(filename: string) {
  return fs.existsSync(path.join(baseDir, filename));
}

export const POST: RequestHandler = async ({ request }) => {
  const filename = request.headers.get('x-filename');
  if (!filename || !isValidPng(filename)) {
    return new Response('Invalid or missing filename', { status: 400 });
  }

  const buffer = Buffer.from(await request.arrayBuffer());

  try {
    saveFile(filename, buffer);
    return new Response('Saved', { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const GET: RequestHandler = async ({ url }) => {
  const national_id = url.searchParams.get('national_id');

  if (!national_id) {
    return new Response('Missing national_id', { status: 400 });
  }

  // Construct file paths
  const photoPath = `${national_id}.png`;
  const thumbPath = `${national_id}_thumb.png`;
  const qrPath = `${national_id}.qr`;

  const photoExists = fileExists(photoPath);
  const thumbExists = fileExists(thumbPath);
  const qrExists = fileExists(qrPath);

  // If none exist, return early
  if (!photoExists && !thumbExists && !qrExists) {
    return new Response(JSON.stringify({ exists: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Compose response
  const result: Record<string, unknown> = { exists: true };
  if (photoExists) result.full = `/pictures/national_id/${photoPath}`;
  if (thumbExists) result.thumb = `/pictures/national_id/${thumbPath}`;
  if (qrExists) result.qr = `/pictures/national_id/${qrPath}`;

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};


//
// // Utility to return an <img> HTML tag as Response
// export async function QR_View(national_id: string, width = 200): Promise<Response> {
//   const qrPath = path.join(baseDir, `${national_id}.qr`);
//   if (!fs.existsSync(qrPath)) {
//     return new Response(`<p>QR for ${national_id} not found.</p>`, {
//       status: 404,
//       headers: { 'Content-Type': 'text/html' }
//     });
//   }
//
//   const imgUrl = `/pictures/national_id/${national_id}.qr`;
//   const html = `<img src="${imgUrl}" width="${width}" height="${width}" alt="QR for ${national_id}" style="object-fit: contain;" />`;
//
//   return new Response(html, {
//     status: 200,
//     headers: { 'Content-Type': 'text/html' }
//   });
// }
