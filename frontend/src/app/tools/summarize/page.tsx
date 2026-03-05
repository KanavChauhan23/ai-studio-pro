import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Text Summarizer"
    description="Get a concise, accurate summary of any text instantly"
    icon="📰"
    badge="Groq · Fast"
    apiEndpoint="/api/generate/summarize"
    fields={[
      { name: 'text', label: 'Text to summarize', type: 'textarea', placeholder: 'Paste any article, document, or content here…', rows: 8 },
      { name: 'length', label: 'Summary length', type: 'select', options: [{value:'short',label:'Short'}, {value:'medium',label:'Medium'}, {value:'long',label:'Long'}] },
    ]}
  />;
}
