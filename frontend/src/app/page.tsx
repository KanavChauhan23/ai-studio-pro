import Link from 'next/link';

const TOOLS = [
  ['💬','AI Chat','Llama 3.3 · Mixtral'],
  ['🖼️','Image Generator','Free · No credits'],
  ['💻','Code Generator','Any language'],
  ['🌐','Website Builder','HTML & React'],
  ['📋','Resume Builder','+ Cover letter'],
  ['✨','Prompt Improver','Better AI results'],
  ['🎬','YouTube Script','Viral-ready'],
  ['✏️','Content Rewriter','Any tone'],
  ['🌍','Translator','100+ languages'],
  ['📧','Email Writer','Professional'],
  ['📱','Social Posts','IG · LinkedIn · X'],
  ['📚','Study Notes','Smart summaries'],
  ['📰','Text Summarizer','Instant'],
  ['🔍','Web Search AI','AI research'],
];

export default function LandingPage() {
  return (
    <div className="land">
      {/* ── Nav ── */}
      <nav className="land-nav">
        <Link href="/" className="land-logo">
          <div className="land-logo-ic">⚡</div>
          <span className="land-logo-t">AI Studio Pro</span>
        </Link>

        {/* Pill nav — exact match to photo */}
        <div className="land-pill-nav">
          <a href="/" className="active">Home</a>
          <a href="/dashboard">Tools</a>
          <a href="/register">Pricing</a>
          <a href="/dashboard">Dashboard</a>
        </div>

        <Link href="/login" className="btn btn-dark" style={{ fontSize: 13, padding: '9px 20px' }}>
          Login / Register
        </Link>
      </nav>

      {/* ── Hero ── */}
      <div className="land-hero">
        {/* counter like [1/8] */}
        <div className="land-counter">[1/17]</div>

        {/* WATERMARK — huge text behind everything */}
        <div className="land-watermark" aria-hidden="true">AI&nbsp;&nbsp;STUDIO</div>

        {/* Left column */}
        <div className="land-left">
          <h1 className="land-h1 au">
            BUILD WITH<br />
            <span>AI TOOLS</span><br />
            THAT WORK
          </h1>
          <p className="land-tagline au au1">
            17 powerful AI tools in one workspace. Chat, generate images,
            write code, build websites — all completely free.
          </p>
          <div className="land-cta-row au au2">
            <Link href="/register" className="btn btn-o" style={{ fontSize: 14, padding: '13px 28px' }}>
              Get Started
            </Link>
            <Link href="/dashboard" className="btn btn-gray" style={{ fontSize: 14, padding: '13px 28px' }}>
              View Tools
            </Link>
          </div>
        </div>

        {/* Right column — 3D floating objects */}
        <div className="land-right">
          {/* Stats — top right like photo */}
          <div className="land-stat au au1">
            <div className="land-stat-num">
              <span className="arrow">↑</span>
              <span>17</span>
            </div>
            <div className="land-stat-label">AI TOOLS</div>
            <div className="land-stat-desc">
              Everything you need to create, code and communicate — in one place.
            </div>
          </div>

          {/* 3D floating scene */}
          <div className="float-scene" style={{ position:'relative', width:380, height:400 }}>

            {/* Central orange "computer" box */}
            <div className="obj-main" style={{ position:'absolute', left:'50%', top:'50%' }}>
              <div className="obj-cam">📷</div>
              <div className="obj-screen">
                <div className="obj-screen-lines">
                  <span style={{width:'100%'}}/>
                  <span style={{width:'70%'}}/>
                  <span style={{width:'85%'}}/>
                  <span style={{width:'55%'}}/>
                  <span style={{width:'90%'}}/>
                  <span style={{width:'60%'}}/>
                </div>
              </div>
              <div className="obj-keys">
                {[...Array(20)].map((_,i) => <span key={i}/>)}
              </div>
            </div>

            {/* Floating emoji objects around it */}
            <div className="obj obj-email"  style={{animationDuration:'4s', animationDelay:'-1s'}}>📧</div>
            <div className="obj obj-smile"  style={{animationDuration:'5s', animationDelay:'-2s'}}>😊</div>
            <div className="obj obj-sticker"style={{animationDuration:'4.5s',animationDelay:'-0.5s'}}>⚡</div>
            <div className="obj obj-ring"   style={{animationDuration:'6s', animationDelay:'-3s'}}>🔵</div>
            <div className="obj obj-brush"  style={{animationDuration:'3.5s',animationDelay:'-1.5s'}}>✨</div>
            <div className="obj obj-star"   style={{animationDuration:'5.5s',animationDelay:'-2.5s'}}>🤖</div>
          </div>

          {/* Social icons sidebar (right side like photo) */}
          <div className="land-social">
            <a href="#" title="Twitter/X">𝕏</a>
            <a href="#" title="Instagram">📸</a>
            <a href="#" title="LinkedIn">in</a>
          </div>

          {/* Bottom right text */}
          <div className="land-bottom-right au au3">
            <p>From zero to production — your complete AI workspace is ready now</p>
          </div>
        </div>

        {/* Scroll indicator at bottom center */}
        <div className="scroll-hint">
          <div className="scroll-hint-circle">↓</div>
          <p>Scroll to<br/>explore more</p>
        </div>
      </div>

      {/* ── Tools section ── */}
      <div style={{ maxWidth:1200, margin:'0 auto 80px', padding:'0 32px', position:'relative', zIndex:1 }}>
        <p style={{ textAlign:'center', fontFamily:'Barlow Condensed, sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#999', marginBottom:24 }}>
          Everything included — 17 tools
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
          {TOOLS.map(([icon,name,desc]) => (
            <div key={name as string} style={{
              display:'flex', alignItems:'center', gap:12,
              background:'rgba(255,255,255,0.55)', border:'1.5px solid rgba(0,0,0,0.08)',
              borderRadius:14, padding:'14px 16px',
              transition:'all 0.22s ease', cursor:'pointer',
              boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.cssText+='transform:translateY(-3px);border-color:rgba(229,90,0,0.3);box-shadow:0 10px 28px rgba(229,90,0,0.12);background:rgba(255,255,255,0.9);'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.cssText='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.55);border:1.5px solid rgba(0,0,0,0.08);border-radius:14px;padding:14px 16px;transition:all 0.22s ease;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06);'}}
            >
              <span style={{fontSize:22,flexShrink:0}}>{icon}</span>
              <div>
                <div style={{fontFamily:'Barlow Condensed,sans-serif',fontSize:15,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.01em',color:'#151515'}}>{name}</div>
                <div style={{fontSize:12,color:'#999',marginTop:1}}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
