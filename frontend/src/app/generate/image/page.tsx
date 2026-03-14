'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string, string> = {
  realistic: 'photorealistic, sharp focus, natural lighting',
  cinematic: 'cinematic, dramatic lighting, film grain',
  artistic:  'digital art, vibrant colors, masterpiece',
  anime:     'anime style, studio quality, vibrant',
  '3d':      '3d render, octane render, studio lighting',
  sketch:    'pencil sketch, detailed line art',
};

const DIMS: Record<string, [number, number]> = {
  '1:1':  [512, 512],
  '16:9': [768, 432],
  '9:16': [432, 768],
  '4:3':  [640, 480],
};

// Keep URL short and clean — long prompts cause issues
function buildUrl(prompt: string, w: number, h: number, seed: number) {
  // Trim prompt to max 200 chars to avoid URL issues
  const trimmed = prompt.slice(0, 200);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(trimmed)}?width=${w}&height=${h}&seed=${seed}&nologo=true`;
}

type Slot = {
  key: string;   // unique key — changing this forces React to remount the img
  url: string;
  status: 'idle' | 'loading' | 'done' | 'error';
  retries: number;
};

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt,     setPrompt]     = useState('');
  const [style,      setStyle]      = useState('realistic');
  const [ratio,      setRatio]      = useState('1:1');
  const [count,      setCount]      = useState('1');
  const [slots,      setSlots]      = useState<Slot[]>([]);
  const [anyLoading, setAnyLoading] = useState(false);

  useEffect(() => {
    if (!user) fetchUser().catch(() => router.push('/login'));
  }, [user]);

  // Watch slots — update anyLoading
  useEffect(() => {
    setAnyLoading(slots.some(s => s.status === 'loading'));
  }, [slots]);

  const newSeed = () => Math.floor(Math.random() * 999999);

  const generate = useCallback(() => {
    if (!prompt.trim()) { toast.error('Enter a prompt first'); return; }
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    const n        = parseInt(count);
    const seed     = newSeed();

    setSlots(Array.from({ length: n }, (_, i) => ({
      key:    `${Date.now()}-${i}`,
      url:    buildUrl(enhanced, w, h, seed + i * 1000),
      status: 'loading',
      retries: 0,
    })));
    toast('Generating… please wait up to 60 seconds', { icon: '⏳', duration: 5000 });
  }, [prompt, style, ratio, count]);

  const handleLoad = useCallback((idx: number) => {
    setSlots(prev => prev.map((s, i) => i === idx ? { ...s, status: 'done' } : s));
    toast.success('Image ready!');
  }, []);

  const handleError = useCallback((idx: number) => {
    setSlots(prev => {
      const slot = prev[idx];
      if (!slot) return prev;

      // Auto-retry up to 3 times with new seed + new key to force fresh img mount
      if (slot.retries < 3) {
        const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
        const [w, h]   = DIMS[ratio];
        const seed     = newSeed();
        return prev.map((s, i) => i === idx ? {
          key:     `retry-${Date.now()}-${idx}`,
          url:     buildUrl(enhanced, w, h, seed),
          status:  'loading',
          retries: slot.retries + 1,
        } : s);
      }

      // All retries exhausted
      toast.error('Could not generate image — check your internet or try again');
      return prev.map((s, i) => i === idx ? { ...s, status: 'error' } : s);
    });
  }, [prompt, style, ratio]);

  const retrySlot = useCallback((idx: number) => {
    const enhanced = `${prompt.trim()}, ${STYLES[style]}`;
    const [w, h]   = DIMS[ratio];
    setSlots(prev => prev.map((s, i) => i === idx ? {
      key:     `manual-${Date.now()}-${idx}`,
      url:     buildUrl(enhanced, w, h, newSeed()),
      status:  'loading',
      retries: 0,
    } : s));
  }, [prompt, style, ratio]);

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
              placeholder="a red sports car on a mountain road at sunset"
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

        {slots.length > 0 && (
          <div style={{
            marginTop: 24, display: 'grid', gap: 16,
            gridTemplateColumns: slots.length === 1 ? '1fr' : '1fr 1fr',
          }}>
            {slots.map((slot, idx) => (
              <div key={slot.key} className="img-c" style={{ position: 'relative' }}>

                {/* The actual image — key forces remount on each retry */}
                {slot.status !== 'error' && (
                  <img
                    key={slot.key}
                    src={slot.url}
                    alt={`Generated ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onLoad={() => handleLoad(idx)}
                    onError={() => handleError(idx)}
                    style={{
                      width: '100%',
                      borderRadius: slot.status === 'done' ? '16px 16px 0 0' : 0,
                      display: slot.status === 'done' ? 'block' : 'none',
                    }}
                  />
                )}

                {/* Loading overlay */}
                {slot.status === 'loading' && (
                  <div style={{
                    padding: '64px 24px', textAlign: 'center',
                    background: 'var(--g1)', borderRadius: 16,
                    border: '1px solid var(--b1)',
                  }}>
                    <span className="spin spin-v" style={{ width: 40, height: 40, borderWidth: 3 }} />
                    <p style={{ marginTop: 16, fontSize: 13, color: 'var(--tx1)', fontWeight: 600 }}>
                      {slot.retries > 0
                        ? `Retrying… attempt ${slot.retries + 1} of 4`
                        : `Generating image ${idx + 1}…`}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--tx3)', marginTop: 6 }}>
                      Pollinations.ai takes 20–60 sec · do not close the tab
                    </p>
                    {/* Shimmer bar */}
                    <div style={{
                      marginTop: 18, height: 3, borderRadius: 4,
                      background: 'var(--g2)', overflow: 'hidden', position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', top: 0, height: '100%',
                        width: '40%', borderRadius: 4,
                        background: 'linear-gradient(90deg, transparent, var(--v), var(--v1), transparent)',
                        animation: 'shimmer 1.8s ease-in-out infinite',
                      }} />
                    </div>
                  </div>
                )}

                {/* Error state */}
                {slot.status === 'error' && (
                  <div style={{
                    padding: '48px 24px', textAlign: 'center',
                    background: 'var(--g1)', borderRadius: 16,
                    border: '1px solid rgba(244,63,94,0.25)',
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>😞</div>
                    <p style={{ fontSize: 14, color: 'var(--tx1)', fontWeight: 600, marginBottom: 6 }}>
                      Generation failed
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--tx3)', marginBottom: 20, lineHeight: 1.6 }}>
                      Pollinations may be busy.<br />Try a shorter prompt or different style.
                    </p>
                    <button className="btn btn-g" style={{ fontSize: 13 }} onClick={() => retrySlot(idx)}>
                      🔄 Try Again
                    </button>
                  </div>
                )}

                {/* Success footer */}
                {slot.status === 'done' && (
                  <div className="img-foot">
                    <span style={{ fontSize: 12, color: 'var(--tx2)' }}>Image {idx + 1}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn btn-g"
                        style={{ fontSize: 12, padding: '5px 12px' }}
                        onClick={() => retrySlot(idx)}
                      >🔄 Regenerate</button>
                      <a
                        href={slot.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-p"
                        style={{ fontSize: 12, padding: '5px 12px', textDecoration: 'none' }}
                      >⬇ Download</a>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes shimmer {
            0%   { left: -45%; }
            100% { left: 130%; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
