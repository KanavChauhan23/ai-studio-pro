'use client';
import Sidebar from './Sidebar';
export default function AppLayout({ children }: { children: React.ReactNode }) {
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: any) {

  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">{children}</main>
    <div className="flex">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1">

        {/* Top bar */}
        <div className="p-4 border-b border-[#222] flex items-center gap-4">

          {/* Hamburger button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <span className="font-semibold">AI Studio</span>

        </div>

        <div className="p-4">{children}</div>

      </div>
    </div>
  );
}
