'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string, string> = {
  realistic: 'photorealistic, professional photography, sharp focus, natural lighting',
  cinematic: 'cinematic, dramatic lighting, film grain, movie still',
  artistic:  'digital art, vibrant, trending on artstation, masterpiece',
  anime:     'anime style, studio quality, beautiful lighting, vibrant colors',
  '3d':      '3d render, octane render, studio lighting, ultra realistic',
  sketch:    'pencil sketch, detailed line art, professional illustration',
};

const DIMS: Record<string, [number, number]> = {
  '1:1':  [512, 512],
  '16:9': [768, 432],
  '9:16': [432, 768],
  '4:3':  [640, 480],
};

type ImgState = { blobUrl: string | null; loading: boolean; error: string | null; progress: number };

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt, setPrompt] = useState('');
  const [style,  setStyle]  = useState('realistic');
  const [ratio,  setRatio]  = useState('1:1');
  const [count,  setCount]  = useState('1');
  const [images, setImages] = useState<ImgState[]>([]);
  const [anyLoading, setAnyLoading] = useState(false);

  useEffect(() => { if (!user) fetchUser().catch(() => router.push('/login')); }, [user]);

  // Tick a fake progress bar while waiting
  const tickProgress = (idx: number) => {
    let pct = 5;
    const id = setInterval(() => {
      pct = Math.min(pct + Math.random() * 8, 90);
      setImages(prev => prev.map((x, j) =>
        j === idx && x.loading ? { ...x, progress: Math.round(pct) } : x
      ));
    }, 800);
    return id;
  };

  const fetchImage = async (url: string, idx: number) => {
    const tid = tickProgress(idx);
    try {
      const controller = new AbortController();
      // 90 second timeout — Pollinations can be slow
      const timer = setTimeout(() => controller.abort(), 90000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      clearInterval(tid);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      if (!blob.type.startsWith('image/')) throw new Error('Not an image');

      const blobUrl = URL.createObjectURL(blob);
      setImages(prev => prev.map((x, j) =>
        j === idx ? { ...x, blobUrl, loading: false, error: null, progress: 100 } : x
      ));
    } catch (err: any) {
      clearInterval(tid);
      const msg = err.name === 'AbortError' ? 'Timed out — try a shorter prompt' : 'Generation failed';
      setImages(prev => prev.map((x, j) =>
        j === idx ? { ...x, loading: false, error: msg, progress: 0 } : x
      ));
      toast.error(msg);
    }
  };

  const generate = async () => {
    if (!prompt.trim()) { toast.error('Enter a prompt first'); return; }
    setAnyLoading(true);

    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    const n        = parseInt(count);

    const initial: ImgState[] = Array.from({ length: n }, () => ({
      blobUrl: null, loading: true, error: null, progress: 5,
    }));
    setImages(initial);

    const fetches = Array.from({ length: n }, (_, i) => {
      const seed = Math.floor(Math.random() * 99999) + i * 1337;
      const url  = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=flux`;
      return fetchImage(url, i);
    });

    await Promise.allSettled(fetches);
    setAnyLoading(false);
  };

  const retry = (idx: number) => {
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    const seed     = Math.floor(Math.random() * 99999);
    const url      = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=flux`;
    setImages(prev => prev.map((x, j) =>
      j === idx ? { blobUrl: null, loading: true, error: null, progress: 5 } : x
    ));
    setAnyLoading(true);
    fetchImage(url, idx).then(() => setAnyLoading(false));
  };

  return (
    <AppLayout>
      <div className="tp">
        <div className="tp-head au">
          <div className="tp-pill">✦ Free · Pollinations.ai · No credits needed</div>
          <div className="tp-icon">🖼️</div>
          <h1 className="tp-title">Image Generator</h1>
          <p className="tp-desc">Generate stunning AI art and photos — completely free, no credits required</p>
        </div>
        <div className="tp-divider" />

        <div className="form-glass au au1">
          <div className="field">
            <label className="flabel">Describe your image</label>
            <textarea className="fi-ta" rows={3}
              placeholder="A cinematic portrait of a neon-lit city at midnight, rain-soaked streets reflecting purple lights…"
              value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <div className="fgrid3">
            {[
              { l:'Style',        v:style, s:setStyle, o:Object.keys(STYLES) },
              { l:'Aspect Ratio', v:ratio, s:setRatio, o:Object.keys(DIMS)   },
              { l:'Images',       v:count, s:setCount, o:['1','2','3','4']   },
            ].map(({ l, v, s, o }) => (
              <div key={l} className="field">
                <label className="flabel">{l}</label>
                <select className="fi-sel" value={v} onChange={e => s(e.target.value)}>
                  {o.map(x => <option key={x} value={x}>{x.charAt(0).toUpperCase() + x.slice(1)}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button className="btn btn-p" onClick={generate} disabled={anyLoading}>
            {anyLoading ? <><span className="spin" /> Generating…</> : '🖼️ Generate Images'}
          </button>
        </div>

        {images.length > 0 && (
          <div className="img-grid" style={{ marginTop:24, display:'grid', gap:16,
            gridTemplateColumns: images.length === 1 ? '1fr' : '1fr 1fr' }}>
            {images.map((img, i) => (
              <div key={i} className="img-c">

                {/* ── Loading state with progress bar ── */}
                {img.loading && (
                  <div style={{
                    padding: '60px 24px', textAlign:'center',
                    background:'var(--g1)', borderRadius:16, border:'1px solid var(--b1)'
                  }}>
                    <span className="spin spin-v" style={{ width:36, height:36, borderWidth:3 }} />
                    <p style={{ marginTop:14, fontSize:13, color:'var(--tx2)' }}>
                      Generating image {i + 1}…
                    </p>
                    <p style={{ fontSize:11, color:'var(--tx3)', marginTop:4 }}>
                      This can take 20–40 seconds
                    </p>
                    {/* Progress bar */}
                    <div style={{
                      marginTop:16, height:4, borderRadius:4,
                      background:'var(--g2)', overflow:'hidden'
                    }}>
                      <div style={{
                        height:'100%', borderRadius:4,
                        background:'linear-gradient(90deg, var(--v), var(--v1))',
                        width:`${img.progress}%`,
                        transition:'width 0.8s ease'
                      }} />
                    </div>
                    <p style={{ fontSize:11, color:'var(--tx3)', marginTop:6 }}>{img.progress}%</p>
                  </div>
                )}

                {/* ── Error state ── */}
                {img.error && (
                  <div style={{
                    padding:'48px 24px', textAlign:'center',
                    background:'var(--g1)', borderRadius:16, border:'1px solid rgba(244,63,94,0.2)'
                  }}>
                    <div style={{ fontSize:28, marginBottom:10 }}>❌</div>
                    <p style={{ fontSize:13, color:'var(--tx2)', marginBottom:16 }}>{img.error}</p>
                    <button className="btn btn-g" style={{ fontSize:12 }} onClick={() => retry(i)}>
                      🔄 Try Again
                    </button>
                  </div>
                )}

                {/* ── Success state ── */}
                {img.blobUrl && (
                  <>
                    <img
                      src={img.blobUrl}
                      alt={`Generated ${i + 1}`}
                      style={{ width:'100%', borderRadius:'16px 16px 0 0', display:'block' }}
                    />
                    <div className="img-foot">
                      <span style={{ fontSize:12, color:'var(--tx2)' }}>Image {i + 1}</span>
                      <div style={{ display:'flex', gap:8 }}>
                        <button className="btn btn-g" style={{ fontSize:12, padding:'5px 12px' }}
                          onClick={() => retry(i)}>🔄 Regenerate</button>
                        <a href={img.blobUrl} download={`ai-image-${i+1}.png`}
                          className="btn btn-p" style={{ fontSize:12, padding:'5px 12px', textDecoration:'none' }}>
                          ⬇ Download
                        </a>
                      </div>
                    </div>
                  </>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
