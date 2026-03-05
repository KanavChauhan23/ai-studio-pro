import Link from "next/link";

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

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#0f0f0f] border-r border-[#222] min-h-screen p-5 text-white overflow-y-auto">

      <h1 className="text-xl font-bold mb-6">AI Studio</h1>

      <div className="space-y-2">
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1a1a1a] transition cursor-pointer">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
