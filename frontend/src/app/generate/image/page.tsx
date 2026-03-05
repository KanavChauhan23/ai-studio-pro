'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string, string> = {
  realistic: 'photorealistic, highly detailed, 8k, professional photography, sharp focus',
  artistic:  'digital art, vibrant colors, trending on artstation, masterpiece quality',
  cartoon:   'cartoon illustration, clean lines, colorful, fun, professional animation style',
  sketch:    'pencil sketch, detailed line art, black and white, professional illustration',
  anime:     'anime style, studio quality, detailed, beautiful lighting, vibrant',
  '3d':      '3d render, cinema4d, octane render, studio lighting, ultra realistic',
};
const DIMS: Record<string, [number,number]> = {
  '1:1':[1024,1024], '16:9':[1280,720], '9:16':[720,1280], '4:3':[1024,768],
};

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [ratio, setRatio] = useState('1:1');
  const [count, setCount] = useState('1');
  const [images, setImages] = useState<{ url: string; loaded: boolean; error: boolean }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!user) fetchUser().catch(() => router.push('/login')); }, [user]);

  const generate = () => {
    if (!prompt.trim()) { toast.error('Enter a prompt'); return; }
    setLoading(true);
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h] = DIMS[ratio];
    const n = parseInt(count);
    setImages(Array.from({ length: n }, (_, i) => ({
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${w}&height=${h}&seed=${Math.floor(Math.random()*99999)+i*1000}&nologo=true`,
      loaded: false, error: false,
    })));
  };

  const onLoad  = (i: number) => { setImages(p => p.map((x, j) => j === i ? {...x, loaded:true} : x)); setLoading(false); };
  const onError = (i: number) => { setImages(p => p.map((x, j) => j === i ? {...x, loaded:true,error:true} : x)); setLoading(false); toast.error('Image failed — try a different prompt'); };

  return (
    <AppLayout>
      <div className="tool-page">
        <div className="tool-header anim-in">
          <div className="tool-badge">✦ Free · Pollinations.ai · No credits needed</div>
          <div className="tool-icon-wrap">🖼️</div>
          <h1 className="tool-title">Image Generator</h1>
          <p className="tool-desc">Generate stunning AI images for free — completely unlimited</p>
        </div>
        <div className="tool-divider" />

        <div className="ai-card anim-in anim-in-d1" style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div className="field-wrap">
            <label className="field-label">Describe your image</label>
            <textarea className="ai-textarea" rows={3}
              placeholder="A cinematic portrait of a futuristic city at night, neon lights reflected on wet streets…"
              value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <div className="fields-grid-3">
            {[
              { l:'Style', v:style, s:setStyle, o:Object.keys(STYLES) },
              { l:'Aspect Ratio', v:ratio, s:setRatio, o:Object.keys(DIMS) },
              { l:'Number of Images', v:count, s:setCount, o:['1','2','3','4'] },
            ].map(({ l, v, s, o }) => (
              <div key={l} className="field-wrap">
                <label className="field-label">{l}</label>
                <select className="ai-select" value={v} onChange={e => s(e.target.value)}>
                  {o.map(x => <option key={x} value={x}>{x.charAt(0).toUpperCase()+x.slice(1)}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div>
            <button className="ai-btn ai-btn-primary" onClick={generate} disabled={loading}>
              {loading ? <><span className="spinner" /> Generating…</> : '🖼️ Generate Images'}
            </button>
          </div>
        </div>

        {images.length > 0 && (
          <div className={`img-grid anim-in`} style={{ gridTemplateColumns: images.length === 1 ? '1fr' : '1fr 1fr' }}>
            {images.map((img, i) => (
              <div key={i} className="img-card">
                {!img.loaded && <div className="img-skel"><span className="spinner spinner-dark" style={{ width:32,height:32,borderWidth:3 }} /></div>}
                {!img.error && <img src={img.url} alt={`Gen ${i+1}`} style={{ width:'100%', display: img.loaded ? 'block' : 'none', borderRadius:'12px 12px 0 0' }} onLoad={() => onLoad(i)} onError={() => onError(i)} />}
                {img.error && <div className="img-err">❌ Failed to generate — try a different prompt or style</div>}
                {img.loaded && !img.error && (
                  <div className="img-foot">
                    <span style={{ fontSize:12, color:'var(--c-t2)' }}>Image {i+1}</span>
                    <a href={img.url} target="_blank" rel="noreferrer" className="ai-btn ai-btn-ghost" style={{ fontSize:12, padding:'5px 12px', textDecoration:'none' }}>⬇ Download</a>
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
