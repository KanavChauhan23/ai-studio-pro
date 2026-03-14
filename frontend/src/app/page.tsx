import Link from 'next/link';
import Image from 'next/image';

const TOOLS = [
  ['💬','AI Chat','Llama 3.3 · Mixtral'],
  ['🖼️','Image Generator','Free · No credits'],
  ['💻','Code Generator','Any language'],
  ['🌐','Website Builder','HTML & React'],
  ['📋','Resume Builder','+ Cover letter'],
  ['✨','Prompt Improver','Better AI output'],
  ['🎬','YouTube Script','Viral-ready'],
  ['✏️','Content Rewriter','Any tone'],
  ['🌍','Translator','100+ languages'],
  ['📧','Email Writer','Professional'],
  ['📱','Social Posts','IG·LinkedIn·X'],
  ['📚','Study Notes','Smart summaries'],
  ['📰','Text Summarizer','Instant results'],
  ['🔍','Web Search AI','AI research'],
];

export default function LandingPage() {
  return (
    <div className="land">
      {/* Nav */}
      <nav className="land-nav">
        <Link href="/" className="land-logo">
          <Image src="/logo.png" alt="AI Studio Pro" width={32} height={32} style={{ borderRadius: 8 }} />
          <span className="land-logo-n">AI Studio Pro</span>
        </Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/login"    className="btn btn-g" style={{ padding: '8px 18px', fontSize: 13 }}>Log in</Link>
          <Link href="/register" className="btn btn-p" style={{ padding: '8px 18px', fontSize: 13 }}>Get started →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="land-hero">
        <div className="land-pill au">✦ 17 AI tools · 100% free · No credits</div>
        <h1 className="land-h1 au au1">
          Your complete<br />AI workspace
        </h1>
        <p className="land-p au au2">
          Chat, generate images, write code, build websites —
          all in one platform powered by the world's fastest AI models.
        </p>
        <div className="land-cta au au3">
          <Link href="/register" className="btn btn-p" style={{ padding: '13px 28px', fontSize: 15 }}>
            Start for free →
          </Link>
          <Link href="/login" className="btn btn-g" style={{ padding: '13px 28px', fontSize: 15 }}>
            Sign in
          </Link>
        </div>
      </div>

      {/* Tools */}
      <div className="land-tools">
        <p style={{ textAlign:'center', fontSize:10.5, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--tx3)', marginBottom:20 }}>
          Everything included
        </p>
        <div className="land-tg">
          {TOOLS.map(([icon, name, desc]) => (
            <div key={name as string} className="land-tc">
              <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
              <div>
                <div className="land-tn">{name}</div>
                <div className="land-td">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
