import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Language Translator"
    description="Translate any text accurately into 100+ languages"
    icon="🌍"
    badge="Groq · Translation"
    apiEndpoint="/api/generate/translate"
    fields={[
      { name: 'text', label: 'Text to translate', type: 'textarea', placeholder: 'Enter text to translate…', rows: 5 },
      { name: 'target_language', label: 'Target language', type: 'select', options: [{value:'Spanish',label:'Spanish'}, {value:'French',label:'French'}, {value:'German',label:'German'}, {value:'Hindi',label:'Hindi'}, {value:'Chinese',label:'Chinese'}, {value:'Japanese',label:'Japanese'}, {value:'Arabic',label:'Arabic'}, {value:'Portuguese',label:'Portuguese'}, {value:'Italian',label:'Italian'}, {value:'Korean',label:'Korean'}, {value:'Russian',label:'Russian'}, {value:'Turkish',label:'Turkish'}, {value:'Dutch',label:'Dutch'}, {value:'Polish',label:'Polish'}] },
    ]}
  />;
}
