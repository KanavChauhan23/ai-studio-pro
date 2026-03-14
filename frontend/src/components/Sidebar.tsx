'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

const ITEMS = [
  { ic: '🏠', lb: 'Dashboard',         href: '/dashboard' },
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

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();
  const initials = (user?.username || 'AI').slice(0, 2).toUpperCase();

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Dark backdrop — mobile only, only when open ── */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
          className="mob-only"
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside className="sidebar sb-panel">

        {/* Logo row */}
        <div className="sb-head">
          <Link href="/dashboard"
            onClick={close}
            style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}>
            <Image src="/logo.png" alt="AI Studio Pro" width={34} height={34} style={{ borderRadius: 8, flexShrink: 0 }} />
            <span className="sb-name">AI Studio Pro</span>
          </Link>
          {/* ✕ only visible on mobile */}
          <button onClick={close} className="sb-x mob-only-flex">✕</button>
        </div>

        {/* Nav */}
        <div className="sb-body">
          <div className="sb-group-label">Menu</div>
          {ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`sbn ${pathname === item.href ? 'on' : ''}`}
            >
              <span className="sbn-ic">{item.ic}</span>
              <span className="sbn-lbl">{item.lb}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="sb-foot">
          <button className="sb-user" onClick={() => { logout(); router.push('/login'); close(); }}>
            <div className="sb-av">{initials}</div>
            <div style={{ minWidth:0 }}>
              <div className="sb-uname">{user?.username || 'User'}</div>
              <div className="sb-uplan">Free plan · Sign out</div>
            </div>
          </button>
        </div>
      </aside>

      <style>{`
        /* ── Desktop: sidebar is a normal flex child, always visible ── */
        .sb-panel {
          position: sticky;
          top: 0;
          width: 248px;
          flex-shrink: 0;
        }

        /* ── Mobile: sidebar is a fixed drawer that slides in ── */
        @media (max-width: 767px) {
          .sb-panel {
            position: fixed !important;
            top: 0; left: 0;
            width: 260px !important;
            z-index: 50;
            transform: ${open ? 'translateX(0)' : 'translateX(-100%)'};
            transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          }
          /* On mobile make sure labels are always shown inside the drawer */
          .sb-panel .sbn-lbl,
          .sb-panel .sb-name,
          .sb-panel .sb-group-label,
          .sb-panel .sb-uname,
          .sb-panel .sb-uplan {
            display: block !important;
          }
        }

        /* Helpers */
        .mob-only      { display: block; }
        .mob-only-flex { display: flex; }
        @media (min-width: 768px) {
          .mob-only      { display: none !important; }
          .mob-only-flex { display: none !important; }
        }

        /* ✕ close button style */
        .sb-x {
          background: var(--g1);
          border: 1px solid var(--b1);
          border-radius: 8px;
          width: 28px; height: 28px;
          align-items: center; justify-content: center;
          cursor: pointer; color: var(--tx2); font-size: 13px;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
