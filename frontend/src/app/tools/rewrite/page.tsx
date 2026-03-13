import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Content Rewriter" description="Rewrite content in any style or tone instantly" icon="✏️"
    badge="Groq · Editor" apiEndpoint="/api/generate/rewrite"
    fields={[
      {name:'text',label:'Text',type:'textarea',placeholder:'Paste your text here…',rows:6},
      {name:'style',label:'Style',type:'select',options:[{value:'professional',label:'Professional'},{value:'casual',label:'Casual'},{value:'formal',label:'Formal'},{value:'creative',label:'Creative'},{value:'concise',label:'Concise'},{value:'seo-optimized',label:'Seo Optimized'}]},
    ]}
  />;
}
