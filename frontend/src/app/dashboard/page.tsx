'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import api from '@/lib/api';
import Link from 'next/link';
import toast from 'react-hot-toast';

const TOOLS = [
  { ic:'💬', t:'AI Chat',           d:'Chat with Llama 3.3 70B',   href:'/chat' },
  { ic:'🖼️', t:'Image Generator',  d:'Free AI images, unlimited', href:'/generate/image' },
  { ic:'📝', t:'Text Generator',   d:'Blogs, posts, copy',        href:'/generate/text' },
  { ic:'💻', t:'Code Generator',   d:'Any language, any task',    href:'/generate/code' },
  { ic:'🐛', t:'Code Debugger',    d:'Find & fix bugs instantly', href:'/tools/debug' },
  { ic:'🌐', t:'Website Builder',  d:'Full HTML & React sites',   href:'/tools/website' },
  { ic:'📄', t:'Doc Summarizer',   d:'Deep document analysis',    href:'/tools/summarize-doc' },
  { ic:'📋', t:'Resume Builder',   d:'ATS-optimized resumes',     href:'/tools/resume' },
  { ic:'✨', t:'Prompt Improver',  d:'10x better AI results',     href:'/tools/improve-prompt' },
  { ic:'🎬', t:'YouTube Script',   d:'Viral-ready scripts',       href:'/tools/youtube' },
  { ic:'✏️', t:'Content Rewriter', d:'Any style, any tone',      href:'/tools/rewrite' },
  { ic:'🌍', t:'Translator',       d:'100+ languages instantly',  href:'/tools/translate' },
  { ic:'📧', t:'Email Writer',     d:'Professional emails fast',  href:'/tools/email' },
  { ic:'🔍', t:'Web Search AI',    d:'AI-powered research',       href:'/tools/web-search' },
  { ic:'📚', t:'Study Notes',      d:'Smart learning notes',      href:'/tools/study-notes' },
  { ic:'📱', t:'Social Posts',     d:'IG · LinkedIn · Twitter',   href:'/tools/social' },
  { ic:'📰', t:'Text Summarizer',  d:'Instant concise summaries', href:'/tools/summarize' },
];

const QUICK = [
  { ic:'💬', l:'Start chatting',   href:'/chat' },
  { ic:'🖼️', l:'Generate image',   href:'/generate/image' },
  { ic:'💻', l:'Write code',       href:'/generate/code' },
  { ic:'🌐', l:'Build website',    href:'/tools/website' },
  { ic:'📧', l:'Write email',      href:'/tools/email' },
  { ic:'✨', l:'Improve prompt',   href:'/tools/improve-prompt' },
];

const TICONS: Record<string, string> = { text:'📝', image:'🖼️', code:'💻', voice:'🎙️' };

export default function DashboardPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) fetchUser().catch(() => router.push('/login'));
    else loadHistory();
  }, [user]);

  const loadHistory = async () => {
    try { const r = await api.get('/api/generate/history?limit=20'); setHistory(r.data); }
    catch { /* silent */ }
    finally { setLoading(false); }
  };

  const del = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try { await api.delete(`/api/generate/content/${id}`); setHistory(h => h.filter(x => x.id !== id)); }
    catch { toast.error('Delete failed'); }
  };

  const first = user?.full_name?.split(' ')[0] || user?.username || '';

  return (
    <AppLayout>
      <div style={{ overflowY: 'auto', height: '100vh' }}>
        <div className="dash">
          {/* Hero */}
          <div className="dash-hero">
            <div className="dash-eyebrow au">AI Studio Pro</div>
            <h1 className="dash-h au au1">
              {first ? `Hey, ${first} 👋` : 'What will you create?'}
            </h1>
            <p className="dash-sub au au2">
              {first
                ? 'Your AI workspace is ready. 17 tools, zero limits.'
                : 'Pick a tool below and start creating with AI.'}
            </p>

            {/* Quick actions */}
            <div className="qrow au au3">
              {QUICK.map(q => (
                <Link key={q.href} href={q.href} className="qchip">
                  <span>{q.ic}</span>
                  <span>{q.l}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tool grid */}
          <div className="sep" style={{ marginBottom: 32 }} />
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tx3)', marginBottom: 16 }}>
            All 17 tools
          </p>
          <div className="tgrid au au2">
            {TOOLS.map(t => (
              <Link key={t.href} href={t.href} className="tcard">
                <div className="tcard-em">{t.ic}</div>
                <div>
                  <div className="tcard-h">{t.t}</div>
                  <div className="tcard-d">{t.d}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* History */}
          {!loading && history.length > 0 && (
            <div className="hist-sec au au3">
              <div className="sep" style={{ margin: '40px 0 20px' }} />
              <div className="hist-hd">Recent activity</div>
              {history.map(item => (
                <div key={item.id} className="hrow">
                  <div className="hic">{TICONS[item.content_type] || '📄'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="htitle">{item.title}</div>
                    <div className="hmeta">{new Date(item.created_at).toLocaleDateString()} · {item.content_type}</div>
                  </div>
                  <button className="hdel" onClick={e => del(item.id, e)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
