import Link from 'next/link';

const TOOLS = [
  ['💬','AI Chat','Llama 3 & Mixtral'],['🖼️','Image Generator','Free, no credits'],
  ['💻','Code Generator','Any language'],['🌐','Website Builder','HTML & React'],
  ['📋','Resume Builder','+ Cover letter'],['✨','Prompt Improver','Better AI results'],
  ['🎬','YouTube Script','Viral scripts'],['✏️','Content Rewriter','Any style'],
  ['🌍','Translator','100+ languages'],['📧','Email Writer','Professional tone'],
  ['📱','Social Posts','IG/LinkedIn/X'],['📚','Study Notes','Smart summaries'],
  ['📰','Text Summarizer','Instant summary'],['🔍','Web Search AI','AI research'],
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', backgroundImage: 'radial-gradient(ellipse 70% 40% at 50% -10%, rgba(124,106,245,0.1), transparent)' }}>
      <nav className="land-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#7c6af5,#5b4fcf)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--c-t1)', letterSpacing: '-0.3px' }}>AI Studio Pro</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/login" className="ai-btn ai-btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>Log in</Link>
          <Link href="/register" className="ai-btn ai-btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Get started →</Link>
        </div>
      </nav>

      <div className="land-hero">
        <div className="land-tag">✦ 17 AI tools · 100% free</div>
        <h1 className="land-h1">Your complete<br />AI workspace</h1>
        <p className="land-p">Chat, generate images, write code, build websites — all in one platform, powered by the fastest AI models available.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="ai-btn ai-btn-primary" style={{ padding: '12px 26px', fontSize: 15 }}>Start for free →</Link>
          <Link href="/login" className="ai-btn ai-btn-ghost" style={{ padding: '12px 26px', fontSize: 15 }}>Sign in</Link>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 28px' }}>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--c-t3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 20 }}>Everything included</p>
        <div className="land-tools-grid">
          {TOOLS.map(([icon, name, desc]) => (
            <div key={name as string} className="land-tool">
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <div>
                <div className="land-tool-name">{name}</div>
                <div className="land-tool-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
