'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!u || !p) { toast.error('Fill in all fields'); return; }
    setLoading(true);
    try { await login(u, p); router.push('/dashboard'); }
    catch { toast.error('Invalid username or password'); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo-wrap anim-in">
          <div className="auth-logo-icon">⚡</div>
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to AI Studio Pro</div>
        </div>
        <div className="ai-card anim-in anim-in-d1" style={{ gap: 0 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field-wrap">
              <label className="field-label">Username</label>
              <input className="ai-input" type="text" placeholder="Enter username" value={u} onChange={e => setU(e.target.value)} autoFocus />
            </div>
            <div className="field-wrap">
              <label className="field-label">Password</label>
              <input className="ai-input" type="password" placeholder="••••••••" value={p} onChange={e => setP(e.target.value)} />
            </div>
            <button className="ai-btn ai-btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 4 }}>
              {loading ? <><span className="spinner" /> Signing in…</> : 'Continue →'}
            </button>
          </form>
        </div>
        <p className="anim-in anim-in-d2" style={{ textAlign: 'center', fontSize: 13, color: 'var(--c-t2)', marginTop: 16 }}>
          No account? <Link href="/register" style={{ color: 'var(--c-accent2)' }}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
