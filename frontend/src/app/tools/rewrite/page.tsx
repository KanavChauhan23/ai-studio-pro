import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Content Rewriter"
    description="Rewrite any content in a different style, tone, or format"
    icon="✏️"
    badge="Groq · Editor"
    apiEndpoint="/api/generate/rewrite"
    fields={[
      { name: 'text', label: 'Content to rewrite', type: 'textarea', placeholder: 'Paste your text here…', rows: 6 },
      { name: 'style', label: 'Rewrite style', type: 'select', options: [{value:'professional',label:'Professional'}, {value:'casual',label:'Casual'}, {value:'formal',label:'Formal'}, {value:'creative',label:'Creative'}, {value:'concise',label:'Concise'}, {value:'seo-optimized',label:'Seo Optimized'}, {value:'academic',label:'Academic'}] },
    ]}
  />;
}
