import { NextRequest, NextResponse } from 'next/server';

// Try multiple Pollinations URLs until one works
async function tryFetch(urls: string[]): Promise<Response> {
  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 110000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      });
      clearTimeout(timer);
      if (res.ok) return res;
    } catch (_) {
      // try next URL
    }
  }
  throw new Error('All attempts failed');
}

export async function GET(req: NextRequest) {
  const prompt  = req.nextUrl.searchParams.get('prompt');
  const width   = req.nextUrl.searchParams.get('width')  || '512';
  const height  = req.nextUrl.searchParams.get('height') || '512';
  const seed    = req.nextUrl.searchParams.get('seed')   || '42';

  if (!prompt) return NextResponse.json({ error: 'No prompt' }, { status: 400 });

  const encoded = encodeURIComponent(prompt);

  // Try different models in order — fallback if one fails
  const urls = [
    `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true`,
    `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=turbo`,
    `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&seed=${seed}&nologo=true`,
    `https://image.pollinations.ai/prompt/${encoded}?seed=${seed}&nologo=true`,
  ];

  try {
    const res        = await tryFetch(urls);
    const buffer     = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
