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
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(v => ({ ...v, [k]: e.target.value }));

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
    { k:'full_name', l:'Full Name', p:'John Doe',          t:'text' },
    { k:'username',  l:'Username',  p:'johndoe',            t:'text' },
    { k:'email',     l:'Email',     p:'john@example.com',   t:'email' },
    { k:'password',  l:'Password',  p:'••••••••',           t:'password' },
  ];

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo au">
          <div className="auth-lmark">⚡</div>
          <div className="auth-h">Create account</div>
          <div className="auth-s">AI Studio Pro is 100% free</div>
        </div>

        <div className="auth-glass au au1">
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FIELDS.map(({ k, l, p, t }) => (
              <div key={k} className="field">
                <label className="flabel">{l}</label>
                <input className="fi" type={t} placeholder={p}
                  value={(f as any)[k]} onChange={set(k)} />
              </div>
            ))}
            <button className="btn btn-p" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 4 }}>
              {loading ? <><span className="spin" /> Creating account…</> : 'Create account →'}
            </button>
          </form>
        </div>

        <div className="auth-link-row au au2">
          Already have an account?{' '}
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
