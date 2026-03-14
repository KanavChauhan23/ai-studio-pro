'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="main">
        {/* Mobile top bar — hidden on md+ */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 16px',
            background: 'rgba(7,7,14,0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--b0)',
            position: 'sticky', top: 0, zIndex: 30,
          }}
          className="mobile-topbar"
        >
          <button
            onClick={() => setOpen(true)}
            style={{
              background: 'var(--g1)', border: '1px solid var(--b1)',
              borderRadius: 8, width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--tx1)', fontSize: 18,
            }}
          >
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--v), #5238c5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, boxShadow: '0 2px 10px rgba(124,92,252,0.5)',
            }}>⚡</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx1)' }}>
              AI Studio Pro
            </span>
          </div>
        </div>

        <div>{children}</div>
      </div>

      <style>{`
        .mobile-topbar { display: none; }
        @media (max-width: 767px) { .mobile-topbar { display: flex; } }
      `}</style>
    </div>
  );
}
