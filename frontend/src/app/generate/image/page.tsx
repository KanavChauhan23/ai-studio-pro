'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string, string> = {
  realistic: 'photorealistic, professional photography, sharp focus',
  cinematic: 'cinematic, dramatic lighting, film grain, movie still',
  artistic:  'digital art, vibrant colors, masterpiece illustration',
  anime:     'anime style, studio quality, vibrant colors',
  '3d':      '3d render, octane render, studio lighting, ultra realistic',
  sketch:    'pencil sketch, detailed line art, illustration',
};

const DIMS: Record<string, [number, number]> = {
  '1:1':  [512, 512],
  '16:9': [768, 432],
  '9:16': [432, 768],
  '4:3':  [640, 480],
};

type ImgState = {
  url: string;
  status: 'loading' | 'done' | 'error';
  retries: number;
};

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt,  setPrompt]  = useState('');
  const [style,   setStyle]   = useState('realistic');
  const [ratio,   setRatio]   = useState('1:1');
  const [count,   setCount]   = useState('1');
  const [images,  setImages]  = useState<ImgState[]>([]);
  const [loading, setLoading] = useState(false);
  const timeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => { if (!user) fetchUser().catch(() => router.push('/login')); }, [user]);

  // Clear all timeouts on unmount
  useEffect(() => () => { Object.values(timeouts.current).forEach(clearTimeout); }, []);

  const buildUrl = (text: string, w: number, h: number, seed: number) => {
    // Keep it minimal — no model param, no extra flags that cause 500s
    const encoded = encodeURIComponent(text);
    return `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&seed=${seed}&nologo=true`;
  };

  const setStatus = (idx: number, status: ImgState['status']) => {
    setImages(prev => prev.map((x, j) => j === idx ? { ...x, status } : x));
  };

  const generate = () => {
    if (!prompt.trim()) { toast.error('Enter a prompt first'); return; }
    // Clear any old timeouts
    Object.values(timeouts.current).forEach(clearTimeout);
    timeouts.current = {};

    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    const n        = parseInt(count);
    setLoading(true);

    const newImages: ImgState[] = Array.from({ length: n }, (_, i) => ({
      url:     buildUrl(enhanced, w, h, Math.floor(Math.random() * 99999) + i * 1337),
      status:  'loading',
      retries: 0,
    }));
    setImages(newImages);

    // Set 90s timeout per image — if onLoad/onError hasn't fired, retry
    newImages.forEach((_, i) => {
      timeouts.current[i] = setTimeout(() => {
        setImages(prev => {
          if (prev[i]?.status !== 'loading') return prev;
          // Retry with new seed
          const updated = [...prev];
          updated[i] = {
            url: buildUrl(`${prompt.trim()}, ${STYLES[style]}`, w, h, Math.floor(Math.random() * 99999)),
            status: 'loading',
            retries: (prev[i]?.retries ?? 0) + 1,
          };
          return updated;
        });
      }, 90000);
    });
  };

  const onLoad = (idx: number) => {
    clearTimeout(timeouts.current[idx]);
    setStatus(idx, 'done');
    setLoading(false);
    toast.success('Image ready!');
  };

  const onError = (idx: number) => {
    clearTimeout(timeouts.current[idx]);
    const img = images[idx];
    if (!img) return;

    if (img.retries < 2) {
      // Auto-retry with new seed
      const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
      const [w, h]   = DIMS[ratio];
      const newSeed  = Math.floor(Math.random() * 99999);
      setImages(prev => prev.map((x, j) => j === idx
        ? { url: buildUrl(enhanced, w, h, newSeed), status: 'loading', retries: x.retries + 1 }
        : x
      ));
      // Reset timeout for retry
      timeouts.current[idx] = setTimeout(() => setStatus(idx, 'error'), 90000);
    } else {
      setStatus(idx, 'error');
      setLoading(false);
      toast.error('Image failed after retries — try a simpler prompt');
    }
  };

  const retryManual = (idx: number) => {
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    const newSeed  = Math.floor(Math.random() * 99999);
    setImages(prev => prev.map((x, j) => j === idx
      ? { url: buildUrl(enhanced, w, h, newSeed), status: 'loading', retries: 0 }
      : x
    ));
    setLoading(true);
    timeouts.current[idx] = setTimeout(() => setStatus(idx, 'error'), 90000);
  };

  const allDone = images.length > 0 && images.every(x => x.status !== 'loading');

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
              placeholder="A cinematic portrait of a neon-lit city at midnight…"
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
          <button className="btn btn-p" onClick={generate} disabled={loading && !allDone}>
            {loading && !allDone ? <><span className="spin" /> Generating…</> : '🖼️ Generate Images'}
          </button>
        </div>

        {images.length > 0 && (
          <div style={{ marginTop:24, display:'grid', gap:16,
            gridTemplateColumns: images.length === 1 ? '1fr' : '1fr 1fr' }}>
            {images.map((img, i) => (
              <div key={img.url} className="img-c">

                {/* Hidden img tag always present — browser loads it in background */}
                <img
                  src={img.url}
                  alt=""
                  style={{ display: 'none' }}
                  onLoad={() => onLoad(i)}
                  onError={() => onError(i)}
                />

                {/* Loading skeleton */}
                {img.status === 'loading' && (
                  <div style={{ padding:'60px 24px', textAlign:'center',
                    background:'var(--g1)', borderRadius:16, border:'1px solid var(--b1)' }}>
                    <span className="spin spin-v" style={{ width:36, height:36, borderWidth:3 }} />
                    <p style={{ marginTop:14, fontSize:13, color:'var(--tx2)' }}>
                      {img.retries > 0 ? `Retrying… (attempt ${img.retries + 1})` : `Generating image ${i + 1}…`}
                    </p>
                    <p style={{ fontSize:11, color:'var(--tx3)', marginTop:4 }}>
                      Takes 20–60 seconds · Please wait
                    </p>
                    {/* Animated pulse bar */}
                    <div style={{ marginTop:16, height:3, borderRadius:4,
                      background:'var(--g2)', overflow:'hidden', position:'relative' }}>
                      <div style={{
                        position:'absolute', top:0, left:'-60%',
                        width:'60%', height:'100%', borderRadius:4,
                        background:'linear-gradient(90deg, transparent, var(--v), transparent)',
                        animation:'img-scan 2s ease-in-out infinite'
                      }} />
                    </div>
                    <style>{`
                      @keyframes img-scan {
                        0%   { left: -60%; }
                        100% { left: 160%; }
                      }
                    `}</style>
                  </div>
                )}

                {/* Error */}
                {img.status === 'error' && (
                  <div style={{ padding:'48px 24px', textAlign:'center',
                    background:'var(--g1)', borderRadius:16, border:'1px solid rgba(244,63,94,0.2)' }}>
                    <div style={{ fontSize:28, marginBottom:10 }}>❌</div>
                    <p style={{ fontSize:13, color:'var(--tx2)', marginBottom:4 }}>Generation failed</p>
                    <p style={{ fontSize:11, color:'var(--tx3)', marginBottom:16 }}>
                      Try a shorter or simpler prompt
                    </p>
                    <button className="btn btn-g" style={{ fontSize:12 }} onClick={() => retryManual(i)}>
                      🔄 Try Again
                    </button>
                  </div>
                )}

                {/* Success */}
                {img.status === 'done' && (
                  <>
                    <img src={img.url} alt={`Generated ${i + 1}`}
                      style={{ width:'100%', borderRadius:'16px 16px 0 0', display:'block' }} />
                    <div className="img-foot">
                      <span style={{ fontSize:12, color:'var(--tx2)' }}>Image {i + 1}</span>
                      <div style={{ display:'flex', gap:8 }}>
                        <button className="btn btn-g" style={{ fontSize:12, padding:'5px 12px' }}
                          onClick={() => retryManual(i)}>🔄 Regenerate</button>
                        <a href={img.url} target="_blank" rel="noreferrer"
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
