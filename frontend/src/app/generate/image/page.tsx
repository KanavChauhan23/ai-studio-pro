'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';
import AppLayout from '@/components/AppLayout';
import toast from 'react-hot-toast';

const STYLES: Record<string,string> = {
  realistic:'photorealistic, 8k, professional photography, sharp focus, natural lighting',
  cinematic:'cinematic, dramatic lighting, film grain, anamorphic lens, movie still',
  artistic:'digital art, vibrant, trending on artstation, masterpiece, oil painting',
  anime:'anime style, studio quality, beautiful lighting, vibrant colors',
  '3d':'3d render, cinema4d, octane render, studio lighting, ultra realistic',
};
const DIMS: Record<string,[number,number]> = {'1:1':[1024,1024],'16:9':[1280,720],'9:16':[720,1280],'4:3':[1024,768]};

export default function ImagePage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle]   = useState('realistic');
  const [ratio, setRatio]   = useState('1:1');
  const [count, setCount]   = useState('1');
  const [images, setImages] = useState<{url:string;loaded:boolean;error:boolean}[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{if(!user) fetchUser().catch(()=>router.push('/login'));},[user]);

  const generate = () => {
    if(!prompt.trim()){toast.error('Enter a prompt');return;}
    setLoading(true);
    const enhanced=`${prompt.trim()}, ${STYLES[style]}`;
    const [w,h]=DIMS[ratio]; const n=parseInt(count);
    setImages(Array.from({length:n},(_,i)=>({url:`https://image.pollinations.ai/prompt/${encodeURIComponent(enhanced)}?width=${w}&height=${h}&seed=${Math.floor(Math.random()*99999)+i*1337}&nologo=true`,loaded:false,error:false})));
  };
  const onLoad=(i:number)=>{setImages(p=>p.map((x,j)=>j===i?{...x,loaded:true}:x));setLoading(false);};
  const onError=(i:number)=>{setImages(p=>p.map((x,j)=>j===i?{...x,loaded:true,error:true}:x));setLoading(false);toast.error('Failed — try another prompt');};

  return (
    <AppLayout>
      <div className="tp">
        <div className="tp-head au">
          <div className="tp-pill">⚡ Free · Pollinations.ai · No credits</div>
          <div className="tp-icon">🖼️</div>
          <h1 className="tp-title">Image Generator</h1>
          <p className="tp-desc">Generate stunning AI art and photos — completely free, no credits required</p>
        </div>
        <div className="tp-divider"/>
        <div className="form-card au au1">
          <div className="field">
            <label className="flabel">Describe your image</label>
            <textarea className="fi-ta" rows={3} placeholder="A futuristic city at sunset, flying cars, orange sky, neon signs, ultra-realistic photography…" value={prompt} onChange={e=>setPrompt(e.target.value)}/>
          </div>
          <div className="fgrid3">
            {[{l:'Style',v:style,s:setStyle,o:Object.keys(STYLES)},{l:'Ratio',v:ratio,s:setRatio,o:Object.keys(DIMS)},{l:'Count',v:count,s:setCount,o:['1','2','4']}].map(({l,v,s,o})=>(
              <div key={l} className="field">
                <label className="flabel">{l}</label>
                <select className="fi-sel" value={v} onChange={e=>s(e.target.value)}>
                  {o.map(x=><option key={x} value={x}>{x.charAt(0).toUpperCase()+x.slice(1)}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button className="btn btn-o" onClick={generate} disabled={loading}>
            {loading?<><span className="spin"/>Generating…</>:'🖼️ Generate Images'}
          </button>
        </div>
        {images.length>0&&(
          <div style={{display:'grid',gridTemplateColumns:images.length===1?'1fr':'1fr 1fr',gap:14,marginTop:24}}>
            {images.map((img,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.8)',border:'1.5px solid rgba(0,0,0,0.1)',borderRadius:14,overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
                {!img.loaded&&<div style={{height:300,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(229,90,0,0.04)'}}><span className="spin spin-o" style={{width:32,height:32,borderWidth:3}}/></div>}
                {!img.error&&<img src={img.url} alt={`Gen ${i+1}`} style={{width:'100%',display:img.loaded?'block':'none'}} onLoad={()=>onLoad(i)} onError={()=>onError(i)}/>}
                {img.error&&<div style={{padding:48,textAlign:'center',fontSize:13,color:'#999'}}>❌ Generation failed — try a different prompt</div>}
                {img.loaded&&!img.error&&<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',borderTop:'1px solid rgba(0,0,0,0.08)'}}>
                  <span style={{fontSize:12,color:'#999'}}>Image {i+1}</span>
                  <a href={img.url} target="_blank" rel="noreferrer" className="btn btn-gray" style={{fontSize:12,padding:'5px 12px',textDecoration:'none'}}>⬇ Download</a>
                </div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
