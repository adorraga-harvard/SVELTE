import type { RequestHandler } from './$types';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

// Absolute path to the data file
const DATA_FILE = resolve('./src/lib/Data/visitors.json');

function getIPv4(request: Request) {
    // Check common proxy headers for real client IP
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        const ip = forwarded.split(',')[0].trim();
        if (ip.includes('.')) return ip; // IPv4 only
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp && realIp.includes('.')) return realIp;

    // Node socket fallback (rarely available in SvelteKit)
    // @ts-ignore
    const socketIp = (request as any).socket?.remoteAddress;
    if (socketIp && socketIp.includes('.')) return socketIp;

    return 'Unknown';
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();

        const visitor = {
            page: data.page,
            visitedAt: data.visitedAt,
            ip: getIPv4(request)
        };

        // Ensure directory exists
        const dir = dirname(DATA_FILE);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        let visitors: any[] = [];
        if (existsSync(DATA_FILE)) {
            try {
                const fileContent = readFileSync(DATA_FILE, 'utf-8').trim();
                visitors = fileContent ? JSON.parse(fileContent) : [];
            } catch (err) {
                console.warn('Corrupted JSON detected. Resetting file.');
                visitors = [];
            }
        }

        visitors.push(visitor);
        writeFileSync(DATA_FILE, JSON.stringify(visitors, null, 2), 'utf-8');

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error('Error writing visitor:', err);
        return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
    }
};
