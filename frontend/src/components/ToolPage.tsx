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
  fields: FieldConfig[]; apiEndpoint: string; resultKey?: string;
  badge?: string;
}

export default function ToolPage({ title, description, icon, fields, apiEndpoint, resultKey = 'result', badge }: Props) {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [vals, setVals] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) fetchUser().catch(() => router.push('/login'));
    const defs: Record<string, string> = {};
    fields.forEach(f => { if (f.options?.[0]) defs[f.name] = f.options[0].value; });
    setVals(defs);
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<any>) => setVals(v => ({ ...v, [k]: e.target.value }));

  const run = async () => {
    const missing = fields.find(f => f.type === 'textarea' && !vals[f.name]?.trim());
    if (missing) { toast.error(`Please fill in: ${missing.label}`); return; }
    setLoading(true); setResult('');
    try {
      const r = await api.post(apiEndpoint, vals);
      setResult(r.data[resultKey] ?? JSON.stringify(r.data, null, 2));
    } catch (e: any) {
      const d = e.response?.data?.detail;
      toast.error(typeof d === 'string' ? d.slice(0, 120) : 'Something went wrong — try again');
    } finally { setLoading(false); }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true); toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Separate fields by type for layout
  const textareas = fields.filter(f => f.type === 'textarea');
  const selects   = fields.filter(f => f.type !== 'textarea');

  return (
    <AppLayout>
      <div className="tool-page">
        {/* Header */}
        <div className="tool-header anim-in">
          {badge && <div className="tool-badge">✦ {badge}</div>}
          <div className="tool-icon-wrap">{icon}</div>
          <h1 className="tool-title">{title}</h1>
          <p className="tool-desc">{description}</p>
        </div>

        <div className="tool-divider" />

        {/* Form */}
        <div className="ai-card anim-in anim-in-d1" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Textareas first */}
          {textareas.map(f => (
            <div key={f.name} className="field-wrap">
              <label className="field-label">{f.label}</label>
              <textarea
                className="ai-textarea"
                rows={f.rows ?? 5}
                placeholder={f.placeholder}
                value={vals[f.name] ?? ''}
                onChange={set(f.name)}
              />
              {f.hint && <span className="field-hint">{f.hint}</span>}
            </div>
          ))}

          {/* Select/input row */}
          {selects.length > 0 && (
            <div className={selects.length >= 3 ? 'fields-grid-3' : selects.length === 2 ? 'fields-grid-2' : ''}>
              {selects.map(f => (
                <div key={f.name} className="field-wrap">
                  <label className="field-label">{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="ai-select" value={vals[f.name] ?? ''} onChange={set(f.name)}>
                      {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <input className="ai-input" type="text" placeholder={f.placeholder}
                      value={vals[f.name] ?? ''} onChange={set(f.name)} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <button className="ai-btn ai-btn-primary" onClick={run} disabled={loading}>
              {loading
                ? <><span className="spinner" /> Generating…</>
                : <><span>{icon}</span> Generate</>
              }
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="result-wrap anim-in">
            <div className="result-topbar">
              <div className="result-label">
                <div className="result-dot" />
                Response
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="ai-btn ai-btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={copy}>
                  {copied ? '✓ Copied' : '⎘ Copy'}
                </button>
                <button className="ai-btn-icon" onClick={() => setResult('')} title="Clear">✕</button>
              </div>
            </div>
            <div className="result-body">{result}</div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
