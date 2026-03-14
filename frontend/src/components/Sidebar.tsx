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

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: Props) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();

  // Desktop: collapsible. Mobile: always full-width when open
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const initials = (user?.username || 'AI').slice(0, 2).toUpperCase();

  // Close mobile sidebar when navigating
  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="sidebar desktop-sidebar"
        style={{ width: desktopCollapsed ? 52 : 248 }}
      >
        {/* Header */}
        <div className="sb-head">
          {!desktopCollapsed && (
            <Link href="/dashboard"
              style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}>
              <div className="sb-mark">⚡</div>
              <span className="sb-name">AI Studio Pro</span>
            </Link>
          )}
          {desktopCollapsed && (
            <div className="sb-mark" style={{ margin:'0 auto' }}>⚡</div>
          )}
          {!desktopCollapsed && (
            <button className="btn btn-i"
              onClick={() => setDesktopCollapsed(true)}
              title="Collapse"
              style={{ width:26, height:26, fontSize:12, flexShrink:0 }}>
              ‹
            </button>
          )}
          {desktopCollapsed && (
            <button className="btn btn-i"
              onClick={() => setDesktopCollapsed(false)}
              title="Expand"
              style={{ width:26, height:26, fontSize:12, position:'absolute', right:4, top:18 }}>
              ›
            </button>
          )}
        </div>

        {/* Nav */}
        <div className="sb-body">
          {NAV_TOP.map(n => (
            <Link key={n.href} href={n.href}
              className={`sbn ${pathname === n.href ? 'on' : ''}`}
              title={desktopCollapsed ? n.lb : undefined}>
              <span className="sbn-ic">{n.ic}</span>
              <span className="sbn-lbl">{n.lb}</span>
            </Link>
          ))}
          <div className="sep" style={{ margin: '8px 0' }} />
          {!desktopCollapsed && <div className="sb-group-label">Tools</div>}
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href}
              className={`sbn ${pathname === t.href ? 'on' : ''}`}
              title={desktopCollapsed ? t.lb : undefined}>
              <span className="sbn-ic">{t.ic}</span>
              <span className="sbn-lbl">{t.lb}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="sb-foot">
          <button className="sb-user" onClick={() => { logout(); router.push('/login'); }}>
            <div className="sb-av">{initials}</div>
            {!desktopCollapsed && (
              <div style={{ minWidth: 0 }}>
                <div className="sb-uname">{user?.username || 'User'}</div>
                <div className="sb-uplan">Free plan · Sign out</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar (drawer) ── */}
      <aside
        className="sidebar mobile-sidebar"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          height: '100vh',
          width: 260,
          zIndex: 50,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header with close button */}
        <div className="sb-head">
          <Link href="/dashboard"
            style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}
            onClick={handleNavClick}>
            <div className="sb-mark">⚡</div>
            <span className="sb-name">AI Studio Pro</span>
          </Link>
          <button className="btn btn-i"
            onClick={() => setMobileOpen(false)}
            title="Close"
            style={{ width:28, height:28, fontSize:14, flexShrink:0 }}>
            ✕
          </button>
        </div>

        {/* Nav */}
        <div className="sb-body">
          {NAV_TOP.map(n => (
            <Link key={n.href} href={n.href} onClick={handleNavClick}
              className={`sbn ${pathname === n.href ? 'on' : ''}`}>
              <span className="sbn-ic">{n.ic}</span>
              <span className="sbn-lbl">{n.lb}</span>
            </Link>
          ))}
          <div className="sep" style={{ margin: '8px 0' }} />
          <div className="sb-group-label">Tools</div>
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href} onClick={handleNavClick}
              className={`sbn ${pathname === t.href ? 'on' : ''}`}>
              <span className="sbn-ic">{t.ic}</span>
              <span className="sbn-lbl">{t.lb}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="sb-foot">
          <button className="sb-user" onClick={() => { logout(); router.push('/login'); setMobileOpen(false); }}>
            <div className="sb-av">{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div className="sb-uname">{user?.username || 'User'}</div>
              <div className="sb-uplan">Free plan · Sign out</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Show/hide via CSS */}
      <style>{`
        .desktop-sidebar { display: flex !important; }
        .mobile-sidebar   { display: flex !important; }
        @media (min-width: 768px) {
          .mobile-sidebar { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
          .sbn-lbl, .sb-name, .sb-group-label, .sb-uname, .sb-uplan { display: block !important; }
        }
      `}</style>
    </>
  );
}
