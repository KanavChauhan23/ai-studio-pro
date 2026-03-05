"use client";

import Link from "next/link";

export default function Sidebar({ open, setOpen }: any) {

  const items = [
    { icon: "🏠", label: "Dashboard", href: "/dashboard" },
    { icon: "💬", label: "AI Chat", href: "/chat" },
    { icon: "🖼️", label: "Image Generator", href: "/generate/image" },
    { icon: "💻", label: "Code Generator", href: "/generate/code" },
    { icon: "🌐", label: "Website Builder", href: "/tools/website" },
    { icon: "✏️", label: "Rewrite Content", href: "/tools/rewrite" },
    { icon: "🌍", label: "Translator", href: "/tools/translate" },
    { icon: "📧", label: "Email Writer", href: "/tools/email" },
    { icon: "📄", label: "Resume Builder", href: "/tools/resume" },
    { icon: "📺", label: "YouTube Script", href: "/tools/youtube" },
    { icon: "🔎", label: "Web Search", href: "/tools/web-search" },
    { icon: "📚", label: "Study Notes", href: "/tools/study-notes" },
    { icon: "📝", label: "Summarize Text", href: "/tools/summarize" },
    { icon: "📑", label: "Summarize Document", href: "/tools/summarize-doc" },
    { icon: "✨", label: "Prompt Improver", href: "/tools/improve-prompt" },
    { icon: "📱", label: "Social Post", href: "/tools/social" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-[#0f0f0f] border-r border-[#222] p-5 text-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6">AI Studio</h1>

        <div className="space-y-2 overflow-y-auto h-[90%]">
          {items.map((item, i) => (
            <Link key={i} href={item.href}>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1a1a1a] transition cursor-pointer">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
