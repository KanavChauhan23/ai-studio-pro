'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
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
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo au">
          <div className="auth-lmark">
            <Image src="/logo.png" alt="AI Studio Pro" width={56} height={56} style={{ borderRadius: 14 }} />
          </div>
          <div className="auth-h">Welcome back</div>
          <div className="auth-s">Sign in to AI Studio Pro</div>
        </div>

        <div className="auth-glass au au1">
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="field">
              <label className="flabel">Username</label>
              <input className="fi" type="text" placeholder="Enter your username"
                value={u} onChange={e => setU(e.target.value)} autoFocus />
            </div>
            <div className="field">
              <label className="flabel">Password</label>
              <input className="fi" type="password" placeholder="••••••••"
                value={p} onChange={e => setP(e.target.value)} />
            </div>
            <button className="btn btn-p" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 4 }}>
              {loading ? <><span className="spin" /> Signing in…</> : 'Continue'}
            </button>
          </form>
        </div>

        <div className="auth-link-row au au2">
          No account?{' '}
          <Link href="/register">Create one free</Link>
        </div>
      </div>
    </div>
  );
}
