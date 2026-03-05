'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [f, setF] = useState({ email:'', username:'', full_name:'', password:'' });
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF(v => ({ ...v, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.email || !f.username || !f.password) { toast.error('Fill in required fields'); return; }
    setLoading(true);
    try {
      await api.post('/api/auth/register', f);
      await login(f.username, f.password);
      router.push('/dashboard');
    } catch (err: any) { toast.error(err.response?.data?.detail || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const FIELDS = [
    { k: 'full_name', l: 'Full Name', p: 'John Doe', t: 'text' },
    { k: 'username',  l: 'Username',  p: 'johndoe',  t: 'text' },
    { k: 'email',     l: 'Email',     p: 'john@example.com', t: 'email' },
    { k: 'password',  l: 'Password',  p: '••••••••', t: 'password' },
  ];

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo-wrap anim-in">
          <div className="auth-logo-icon">⚡</div>
          <div className="auth-title">Create account</div>
          <div className="auth-sub">AI Studio Pro is free to use</div>
        </div>
        <div className="ai-card anim-in anim-in-d1">
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FIELDS.map(({ k, l, p, t }) => (
              <div key={k} className="field-wrap">
                <label className="field-label">{l}</label>
                <input className="ai-input" type={t} placeholder={p} value={(f as any)[k]} onChange={set(k)} />
              </div>
            ))}
            <button className="ai-btn ai-btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 4 }}>
              {loading ? <><span className="spinner" /> Creating account…</> : 'Create account →'}
            </button>
          </form>
        </div>
        <p className="anim-in anim-in-d2" style={{ textAlign: 'center', fontSize: 13, color: 'var(--c-t2)', marginTop: 16 }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--c-accent2)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
