'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import api from '@/lib/api';
import Link from 'next/link';
import toast from 'react-hot-toast';

const TOOLS = [
  {ic:'💬',t:'AI Chat',          d:'Llama 3.3 70B · Mixtral',    href:'/chat'},
  {ic:'🖼️',t:'Image Generator', d:'Free · Unlimited',           href:'/generate/image'},
  {ic:'📝',t:'Text Generator',  d:'Blogs · Posts · Copy',       href:'/generate/text'},
  {ic:'💻',t:'Code Generator',  d:'Any language',               href:'/generate/code'},
  {ic:'🐛',t:'Code Debugger',   d:'Find & fix bugs',            href:'/tools/debug'},
  {ic:'🌐',t:'Website Builder', d:'HTML & React sites',         href:'/tools/website'},
  {ic:'📄',t:'Doc Summarizer',  d:'Deep document analysis',     href:'/tools/summarize-doc'},
  {ic:'📋',t:'Resume Builder',  d:'ATS-optimized',              href:'/tools/resume'},
  {ic:'✨',t:'Prompt Improver', d:'10x better AI results',      href:'/tools/improve-prompt'},
  {ic:'🎬',t:'YouTube Script',  d:'Viral-ready scripts',        href:'/tools/youtube'},
  {ic:'✏️',t:'Content Rewriter',d:'Any style · Any tone',      href:'/tools/rewrite'},
  {ic:'🌍',t:'Translator',      d:'100+ languages',             href:'/tools/translate'},
  {ic:'📧',t:'Email Writer',    d:'Professional emails',        href:'/tools/email'},
  {ic:'🔍',t:'Web Search AI',   d:'AI-powered research',        href:'/tools/web-search'},
  {ic:'📚',t:'Study Notes',     d:'Smart summaries',            href:'/tools/study-notes'},
  {ic:'📱',t:'Social Posts',    d:'IG · LinkedIn · X',          href:'/tools/social'},
  {ic:'📰',t:'Text Summarizer', d:'Instant summaries',         href:'/tools/summarize'},
];
const QUICK = [
  {ic:'💬',l:'Start chatting',  href:'/chat'},
  {ic:'🖼️',l:'Generate image',  href:'/generate/image'},
  {ic:'💻',l:'Write code',      href:'/generate/code'},
  {ic:'🌐',l:'Build a website', href:'/tools/website'},
  {ic:'📧',l:'Write an email',  href:'/tools/email'},
  {ic:'✨',l:'Improve prompt',  href:'/tools/improve-prompt'},
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) fetchUser().catch(() => router.push('/login'));
    else api.get('/api/generate/history?limit=20').then(r => setHistory(r.data)).catch(()=>{});
  }, [user]);

  const del = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try { await api.delete(`/api/generate/content/${id}`); setHistory(h => h.filter(x=>x.id!==id)); }
    catch { toast.error('Delete failed'); }
  };

  const name = user?.full_name?.split(' ')[0] || user?.username || '';

  return (
    <AppLayout>
      <div style={{ overflowY:'auto', height:'100vh' }}>
        <div className="dash">
          <div className="dash-hero">
            <div className="dash-eyebrow au">AI Studio Pro</div>
            <h1 className="dash-h au au1">{name ? <>Hey, <span>{name}</span></> : <>CREATE WITH <span>AI</span></>}</h1>
            <p className="dash-s au au2">Your workspace. 17 tools. Zero limits.</p>
            <div className="qrow au au3">
              {QUICK.map(q => (
                <Link key={q.href} href={q.href} className="qchip">
                  <span>{q.ic}</span><span>{q.l}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="sep" style={{ marginBottom:28 }} />
          <p style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#999', marginBottom:16 }}>
            All 17 tools
          </p>
          <div className="tgrid au au2">
            {TOOLS.map(t => (
              <Link key={t.href} href={t.href} className="tcard">
                <span className="tcard-em">{t.ic}</span>
                <div><div className="tcard-h">{t.t}</div><div className="tcard-d">{t.d}</div></div>
              </Link>
            ))}
          </div>

          {history.length > 0 && (
            <div style={{ marginTop:40 }}>
              <div className="sep" style={{ marginBottom:20 }} />
              <div className="hist-hd">Recent activity</div>
              {history.map(item => (
                <div key={item.id} className="hrow">
                  <div className="hic">{item.content_type==='image'?'🖼️':item.content_type==='code'?'💻':'📝'}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="htitle">{item.title}</div>
                    <div className="hmeta">{new Date(item.created_at).toLocaleDateString()} · {item.content_type}</div>
                  </div>
                  <button className="hdel" onClick={e=>del(item.id,e)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
