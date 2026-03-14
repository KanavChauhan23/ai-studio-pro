import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 });

  try {
    // Server-side fetch — no CORS issues
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120000); // 2 min timeout

    const res = await fetch(decodeURIComponent(url), {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    const msg = err.name === 'AbortError' ? 'Timed out' : err.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
