import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage title="Text Generator" description="Generate blogs, emails, social posts and more with AI" icon="📝"
    badge="Powered by Llama 3.3 70B"
    apiEndpoint="/api/generate/text"
    fields={[
      { name:'prompt', label:'What to write', type:'textarea', placeholder:'Write a blog post about the future of AI in healthcare…', rows:5 },
      { name:'content_type', label:'Content Type', type:'select', options:[{value:'blog',label:'Blog Post'},{value:'social',label:'Social Media'},{value:'email',label:'Email'},{value:'description',label:'Product Description'}] },
      { name:'tone', label:'Tone', type:'select', options:[{value:'professional',label:'Professional'},{value:'casual',label:'Casual'},{value:'friendly',label:'Friendly'},{value:'formal',label:'Formal'}] },
      { name:'length', label:'Length', type:'select', options:[{value:'short',label:'Short'},{value:'medium',label:'Medium'},{value:'long',label:'Long'}] },
    ]} />;
}
