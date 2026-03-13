'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from './AppLayout';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface FieldConfig {
  name: string; label: string;
  type: 'textarea' | 'select' | 'input';
  placeholder?: string; options?: { value: string; label: string }[];
  rows?: number; hint?: string;
}

interface Props {
  title: string; description: string; icon: string;
  fields: FieldConfig[]; apiEndpoint: string; resultKey?: string; badge?: string;
}

export default function ToolPage({ title, description, icon, fields, apiEndpoint, resultKey='result', badge }: Props) {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [vals, setVals]   = useState<Record<string,string>>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  useEffect(() => {
    if (!user) fetchUser().catch(() => router.push('/login'));
    const d: Record<string,string> = {};
    fields.forEach(f => { if (f.options?.[0]) d[f.name] = f.options[0].value; });
    setVals(d);
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<any>) => setVals(v => ({...v, [k]: e.target.value}));

  const run = async () => {
    const miss = fields.find(f => f.type==='textarea' && !vals[f.name]?.trim());
    if (miss) { toast.error(`Fill in: ${miss.label}`); return; }
    setLoading(true); setResult('');
    try {
      const r = await api.post(apiEndpoint, vals);
      setResult(r.data[resultKey] ?? JSON.stringify(r.data, null, 2));
    } catch (e: any) {
      const d = e.response?.data?.detail;
      toast.error(typeof d==='string' ? d.slice(0,120) : 'Something went wrong');
    } finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); toast.success('Copied!'); setTimeout(()=>setCopied(false),2000); };

  const textareas = fields.filter(f => f.type==='textarea');
  const others    = fields.filter(f => f.type!=='textarea');

  return (
    <AppLayout>
      <div className="tp">
        <div className="tp-head au">
          {badge && <div className="tp-pill">⚡ {badge}</div>}
          <div className="tp-icon">{icon}</div>
          <h1 className="tp-title">{title}</h1>
          <p className="tp-desc">{description}</p>
        </div>

        <div className="tp-divider" />

        <div className="form-card au au1">
          {textareas.map(f => (
            <div key={f.name} className="field">
              <label className="flabel">{f.label}</label>
              <textarea className="fi-ta" rows={f.rows??5} placeholder={f.placeholder}
                value={vals[f.name]??''} onChange={set(f.name)} />
              {f.hint && <span style={{fontSize:11.5,color:'var(--light)',marginTop:2}}>{f.hint}</span>}
            </div>
          ))}
          {others.length > 0 && (
            <div className={others.length>=3?'fgrid3':others.length===2?'fgrid2':''}>
              {others.map(f => (
                <div key={f.name} className="field">
                  <label className="flabel">{f.label}</label>
                  {f.type==='select'
                    ? <select className="fi-sel" value={vals[f.name]??''} onChange={set(f.name)}>
                        {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    : <input className="fi" type="text" placeholder={f.placeholder} value={vals[f.name]??''} onChange={set(f.name)} />
                  }
                </div>
              ))}
            </div>
          )}
          <div>
            <button className="btn btn-o" onClick={run} disabled={loading}>
              {loading ? <><span className="spin"/>Generating…</> : <><span style={{fontSize:16}}>{icon}</span>Generate</>}
            </button>
          </div>
        </div>

        {result && (
          <div className="result-box">
            <div className="result-top">
              <div className="result-lbl"><div className="rdot"/>AI Response</div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-gray" style={{fontSize:12,padding:'5px 12px'}} onClick={copy}>
                  {copied?'✓ Copied':'⎘ Copy'}
                </button>
                <button className="btn-ic" onClick={()=>setResult('')} title="Clear" style={{borderRadius:8,fontSize:13}}>✕</button>
              </div>
            </div>
            <div className="result-body">{result}</div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
