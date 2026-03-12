'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

const NAV_TOP = [
  { ic: '🏠', lb: 'Dashboard', href: '/dashboard' },
  { ic: '✏️', lb: 'New Chat',  href: '/chat' },
];

const TOOLS = [
  { ic: '💬', lb: 'AI Chat',           href: '/chat' },
  { ic: '🖼️', lb: 'Image Generator',   href: '/generate/image' },
  { ic: '📝', lb: 'Text Generator',    href: '/generate/text' },
  { ic: '💻', lb: 'Code Generator',    href: '/generate/code' },
  { ic: '🐛', lb: 'Code Debugger',     href: '/tools/debug' },
  { ic: '🌐', lb: 'Website Builder',   href: '/tools/website' },
  { ic: '📄', lb: 'Doc Summarizer',    href: '/tools/summarize-doc' },
  { ic: '📋', lb: 'Resume Builder',    href: '/tools/resume' },
  { ic: '✨', lb: 'Prompt Improver',   href: '/tools/improve-prompt' },
  { ic: '🎬', lb: 'YouTube Script',    href: '/tools/youtube' },
  { ic: '✏️', lb: 'Content Rewriter',  href: '/tools/rewrite' },
  { ic: '🌍', lb: 'Translator',        href: '/tools/translate' },
  { ic: '📧', lb: 'Email Writer',      href: '/tools/email' },
  { ic: '🔍', lb: 'Web Search AI',     href: '/tools/web-search' },
  { ic: '📚', lb: 'Study Notes',       href: '/tools/study-notes' },
  { ic: '📱', lb: 'Social Posts',      href: '/tools/social' },
  { ic: '📰', lb: 'Text Summarizer',   href: '/tools/summarize' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();
  const [col, setCol]   = useState(false);
  const W = col ? 52 : 248;
  const initials = (user?.username || 'AI').slice(0, 2).toUpperCase();

  return (
    <aside className="sidebar" style={{ width: W }}>
      {/* Header */}
      <div className="sb-head">
        {!col && (
          <Link href="/dashboard" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}>
            <div className="sb-mark">⚡</div>
            <span className="sb-name">AI Studio Pro</span>
          </Link>
        )}
        {col && <div className="sb-mark" style={{ margin:'0 auto' }}>⚡</div>}
        {!col && (
          <button className="btn btn-i" onClick={() => setCol(true)} title="Collapse" style={{ width:26, height:26, fontSize:12, flexShrink:0 }}>‹</button>
        )}
        {col && (
          <button className="btn btn-i" onClick={() => setCol(false)} title="Expand"
            style={{ width:26, height:26, fontSize:12, position:'absolute', right:4, top:18 }}>›</button>
        )}
      </div>

      {/* Body */}
      <div className="sb-body">
        {NAV_TOP.map(n => (
          <Link key={n.href} href={n.href}
            className={`sbn ${pathname === n.href ? 'on' : ''}`}
            title={col ? n.lb : undefined}>
            <span className="sbn-ic">{n.ic}</span>
            <span className="sbn-lbl">{n.lb}</span>
          </Link>
        ))}

        <div className="sep" style={{ margin: '8px 0' }} />
        {!col && <div className="sb-group-label">Tools</div>}

        {TOOLS.map(t => (
          <Link key={t.href} href={t.href}
            className={`sbn ${pathname === t.href ? 'on' : ''}`}
            title={col ? t.lb : undefined}>
            <span className="sbn-ic">{t.ic}</span>
            <span className="sbn-lbl">{t.lb}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="sb-foot">
        <button className="sb-user" onClick={() => { logout(); router.push('/login'); }}>
          <div className="sb-av">{initials}</div>
          {!col && (
            <div style={{ minWidth: 0 }}>
              <div className="sb-uname">{user?.username || 'User'}</div>
              <div className="sb-uplan">Free plan · Sign out</div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
