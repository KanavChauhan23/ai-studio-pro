
'use client';
import Link from 'next/link'

const TOOLS = [
  { icon:'💬',title:'AI Chat',desc:'Ask anything to AI',href:'/chat'},
  { icon:'🖼️',title:'Image Generator',desc:'Create AI images',href:'/generate/image'},
  { icon:'💻',title:'Code Generator',desc:'Generate or debug code',href:'/generate/code'},
  { icon:'🌐',title:'Website Builder',desc:'Generate full websites',href:'/tools/website'},
  { icon:'✏️',title:'Rewrite Content',desc:'Improve your text',href:'/tools/rewrite'},
  { icon:'🌍',title:'Translator',desc:'Translate any language',href:'/tools/translate'},
  { icon:'📧',title:'Email Writer',desc:'Generate professional emails',href:'/tools/email'},
  { icon:'📋',title:'Resume Builder',desc:'Create job ready resumes',href:'/tools/resume'},
]

export default function DashboardPage(){
  return (
    <div className="p-10 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Welcome to AI Studio Pro</h1>
        <p className="text-gray-400 mt-2">Your AI workspace</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TOOLS.map((tool,i)=>(
          <Link key={i} href={tool.href}>
            <div className="bg-[#1a1a1a] hover:bg-[#222] transition rounded-xl p-6 cursor-pointer border border-[#2a2a2a]">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="text-xl font-semibold">{tool.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
