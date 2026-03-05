
import Link from 'next/link'

const items=[
 {icon:'🏠',label:'Dashboard',href:'/dashboard'},
 {icon:'💬',label:'AI Chat',href:'/chat'},
 {icon:'🖼️',label:'Image Generator',href:'/generate/image'},
 {icon:'💻',label:'Code Generator',href:'/generate/code'},
 {icon:'🌐',label:'Website Builder',href:'/tools/website'},
]

export default function Sidebar(){
 return(
  <div className="w-64 bg-[#0f0f0f] border-r border-[#222] min-h-screen p-5 text-white">
    <h1 className="text-xl font-bold mb-6">AI Studio</h1>
    <div className="space-y-3">
      {items.map((i,k)=>(
        <Link key={k} href={i.href}>
          <div className="flex gap-3 p-3 rounded-lg hover:bg-[#1a1a1a] transition">
            <span>{i.icon}</span>
            <span>{i.label}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
 )
}
