'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string,string> = {
  realistic: 'photorealistic, professional photography, sharp focus, natural lighting',
  cinematic: 'cinematic, dramatic lighting, film grain, movie still',
  artistic:  'digital art, vibrant, trending on artstation, masterpiece',
  anime:     'anime style, studio quality, beautiful lighting, vibrant colors',
  '3d':      '3d render, octane render, studio lighting, ultra realistic',
  sketch:    'pencil sketch, detailed line art, professional illustration',
};

// Smaller safe dimensions — large sizes cause Pollinations to timeout
const DIMS: Record<string,[number,number]> = {
  '1:1':  [512, 512],
  '16:9': [768, 432],
  '9:16': [432, 768],
  '4:3':  [640, 480],
};

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt, setPrompt]   = useState('');
  const [style, setStyle]     = useState('realistic');
  const [ratio, setRatio]     = useState('1:1');
  const [count, setCount]     = useState('1');
  const [images, setImages]   = useState<{ url:string; loaded:boolean; error:boolean; retries:number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!user) fetchUser().catch(() => router.push('/login')); }, [user]);

  const buildUrl = (enhanced: string, w: number, h: number, seed: number) =>
    `https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=flux`;

  const generate = () => {
    if (!prompt.trim()) { toast.error('Enter a prompt first'); return; }
    setLoading(true);
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h] = DIMS[ratio];
    const n = parseInt(count);
    setImages(Array.from({ length: n }, (_, i) => ({
      url: buildUrl(enhanced, w, h, Math.floor(Math.random() * 99999) + i * 1337),
      loaded: false,
      error: false,
      retries: 0,
    })));
  };

  const onLoad = (i: number) => {
    setImages(p => p.map((x, j) => j === i ? { ...x, loaded: true, error: false } : x));
    setLoading(false);
    toast.success('Image generated!');
  };

  const onError = (i: number) => {
    setImages(prev => {
      const img = prev[i];
      // Auto-retry up to 2 times with a new seed
      if (img.retries < 2) {
        const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
        const [w, h] = DIMS[ratio];
        const newSeed = Math.floor(Math.random() * 99999);
        const newUrl  = buildUrl(enhanced, w, h, newSeed);
        return prev.map((x, j) => j === i ? { ...x, url: newUrl, retries: x.retries + 1 } : x);
      }
      // After 2 retries, mark as failed
      toast.error('Generation failed — try a different prompt or style');
      setLoading(false);
      return prev.map((x, j) => j === i ? { ...x, loaded: true, error: true } : x);
    });
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
              placeholder="A cinematic portrait of a neon-lit city at midnight, rain-soaked streets…"
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
          <div>
            <button className="btn btn-p" onClick={generate} disabled={loading}>
              {loading ? <><span className="spin" /> Generating…</> : '🖼️ Generate Images'}
            </button>
          </div>
        </div>

        {images.length > 0 && (
          <div className="img-grid" style={{ gridTemplateColumns: images.length === 1 ? '1fr' : '1fr 1fr' }}>
            {images.map((img, i) => (
              <div key={i} className="img-c">
                {!img.loaded && (
                  <div className="img-skel">
                    <span className="spin spin-v" style={{ width:32, height:32, borderWidth:3 }} />
                    <p style={{ marginTop:12, fontSize:12, color:'var(--tx3)' }}>
                      {img.retries > 0 ? `Retrying… (${img.retries}/2)` : 'Generating your image…'}
                    </p>
                  </div>
                )}
                {!img.error && (
                  <img
                    src={img.url}
                    alt={`Generated ${i + 1}`}
                    style={{ width:'100%', display: img.loaded ? 'block' : 'none', borderRadius:'16px 16px 0 0' }}
                    onLoad={() => onLoad(i)}
                    onError={() => onError(i)}
                  />
                )}
                {img.error && (
                  <div style={{ padding:48, textAlign:'center', fontSize:13, color:'var(--tx2)' }}>
                    ❌ Generation failed — try a different prompt or style
                    <br />
                    <button
                      className="btn btn-g"
                      style={{ marginTop:16, fontSize:12 }}
                      onClick={() => {
                        const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
                        const [w, h] = DIMS[ratio];
                        const newSeed = Math.floor(Math.random() * 99999);
                        setImages(p => p.map((x, j) => j === i
                          ? { url: buildUrl(enhanced, w, h, newSeed), loaded: false, error: false, retries: 0 }
                          : x));
                        setLoading(true);
                      }}
                    >
                      🔄 Try Again
                    </button>
                  </div>
                )}
                {img.loaded && !img.error && (
                  <div className="img-foot">
                    <span style={{ fontSize:12, color:'var(--tx2)' }}>Image {i + 1}</span>
                    <a href={img.url} target="_blank" rel="noreferrer"
                      className="btn btn-g" style={{ fontSize:12, padding:'5px 12px', textDecoration:'none' }}>
                      ⬇ Download
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
