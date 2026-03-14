'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

const ITEMS = [
  { ic: '🏠', lb: 'Dashboard',        href: '/dashboard' },
  { ic: '💬', lb: 'AI Chat',          href: '/chat' },
  { ic: '🖼️', lb: 'Image Generator',  href: '/generate/image' },
  { ic: '📝', lb: 'Text Generator',   href: '/generate/text' },
  { ic: '💻', lb: 'Code Generator',   href: '/generate/code' },
  { ic: '🐛', lb: 'Code Debugger',    href: '/tools/debug' },
  { ic: '🌐', lb: 'Website Builder',  href: '/tools/website' },
  { ic: '📄', lb: 'Doc Summarizer',   href: '/tools/summarize-doc' },
  { ic: '📋', lb: 'Resume Builder',   href: '/tools/resume' },
  { ic: '✨', lb: 'Prompt Improver',  href: '/tools/improve-prompt' },
  { ic: '🎬', lb: 'YouTube Script',   href: '/tools/youtube' },
  { ic: '✏️', lb: 'Content Rewriter', href: '/tools/rewrite' },
  { ic: '🌍', lb: 'Translator',       href: '/tools/translate' },
  { ic: '📧', lb: 'Email Writer',     href: '/tools/email' },
  { ic: '🔍', lb: 'Web Search AI',    href: '/tools/web-search' },
  { ic: '📚', lb: 'Study Notes',      href: '/tools/study-notes' },
  { ic: '📱', lb: 'Social Posts',     href: '/tools/social' },
  { ic: '📰', lb: 'Text Summarizer',  href: '/tools/summarize' },
];

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();
  const initials = (user?.username || 'AI').slice(0, 2).toUpperCase();

  return (
    <>
      {/* Dark overlay — mobile only, shown when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
          }}
          className="md-hide"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className="sidebar"
        style={{
          width: 248,
          /* Mobile: fixed + slide in/out. Desktop: static, always visible */
        }}
      >
        {/* Logo header */}
        <div className="sb-head">
          <Link href="/dashboard"
            style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}
            onClick={() => setOpen(false)}>
            <div className="sb-mark">⚡</div>
            <span className="sb-name">AI Studio Pro</span>
          </Link>
          {/* ✕ close button — mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="sb-close-btn"
            style={{
              background: 'var(--g1)', border: '1px solid var(--b1)',
              borderRadius: 8, width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--tx2)', fontSize: 13, flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="sb-body">
          {ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`sbn ${pathname === item.href ? 'on' : ''}`}
            >
              <span className="sbn-ic">{item.ic}</span>
              <span className="sbn-lbl">{item.lb}</span>
            </Link>
          ))}
        </div>

        {/* User footer */}
        <div className="sb-foot">
          <button className="sb-user" onClick={() => { logout(); router.push('/login'); setOpen(false); }}>
            <div className="sb-av">{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div className="sb-uname">{user?.username || 'User'}</div>
              <div className="sb-uplan">Free plan · Sign out</div>
            </div>
          </button>
        </div>
      </aside>

      <style>{`
        /* Desktop: always visible, static in flow */
        .sidebar {
          position: sticky;
          transform: none !important;
        }

        /* Mobile: fixed drawer, slides in from left */
        @media (max-width: 767px) {
          .sidebar {
            position: fixed !important;
            top: 0; left: 0;
            z-index: 50;
            transform: ${open ? 'translateX(0)' : 'translateX(-100%)'} !important;
            transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .md-hide { display: block; }
          .sb-close-btn { display: flex !important; }
        }

        @media (min-width: 768px) {
          .md-hide { display: none !important; }
          .sb-close-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
