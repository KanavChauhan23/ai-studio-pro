// This proxy is intentionally disabled — Pollinations blocks cloud server IPs.
// Images are loaded directly via <img> tags in the frontend instead.
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ error: 'Use direct image URLs instead' }, { status: 410 });
}
