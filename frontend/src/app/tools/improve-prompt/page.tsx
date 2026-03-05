import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Prompt Improver"
    description="Turn a weak prompt into a powerful, detailed one that gets far better AI results"
    icon="✨"
    badge="Groq · Prompt Engineering"
    apiEndpoint="/api/generate/improve-prompt"
    fields={[
      { name: 'prompt', label: 'Your prompt to improve', type: 'textarea', placeholder: 'Make a website', rows: 4 },
      { name: 'target', label: 'Target AI', type: 'select', options: [{value:'image',label:'Image'}, {value:'text',label:'Text'}, {value:'code',label:'Code'}, {value:'chatgpt',label:'Chatgpt'}, {value:'midjourney',label:'Midjourney'}] },
    ]}
  />;
}
