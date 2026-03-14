'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="shell">

      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* ── Main area ── */}
      <div className="main" style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Mobile top bar — only visible on small screens */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px',
          background: 'rgba(7,7,14,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--b0)',
          position: 'sticky', top: 0, zIndex: 30,
        }}
          className="mobile-topbar"
        >
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'var(--g1)', border: '1px solid var(--b1)',
              borderRadius: 8, width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--tx1)', fontSize: 16,
            }}
          >
            ☰
          </button>

          {/* Logo inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--v), #5238c5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, boxShadow: '0 2px 10px rgba(124,92,252,0.5)',
            }}>⚡</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx1)', letterSpacing: '-0.2px' }}>
              AI Studio Pro
            </span>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>

      {/* Hide mobile topbar on desktop via inline media workaround */}
      <style>{`
        .mobile-topbar { display: flex !important; }
        @media (min-width: 768px) {
          .mobile-topbar { display: none !important; }
        }
      `}</style>
    </div>
  );
}
