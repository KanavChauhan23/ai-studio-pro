'use client';
import { useState } from 'react';
import Image from 'next/image';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="main">

        {/* ── Mobile-only top bar with hamburger ── */}
        <div className="mob-bar">
          <button className="mob-ham" onClick={() => setOpen(true)}>☰</button>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Image src="/logo.png" alt="AI Studio Pro" width={26} height={26} style={{ borderRadius: 6 }} />
            <span style={{ fontSize:14, fontWeight:700, color:'var(--tx1)' }}>AI Studio Pro</span>
          </div>
        </div>

        {/* Page content */}
        <div>{children}</div>

      </div>

      <style>{`
        /* Hide hamburger bar on desktop, show on mobile */
        .mob-bar {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(7,7,14,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--b0);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .mob-ham {
          background: var(--g1);
          border: 1px solid var(--b1);
          border-radius: 8px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--tx1); font-size: 18px;
        }
        @media (max-width: 767px) {
          .mob-bar { display: flex; }
        }
      `}</style>
    </div>
  );
}
