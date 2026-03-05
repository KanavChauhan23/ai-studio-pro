import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Code Debugger"
    description="Find every bug, get full explanation + fixed code"
    icon="🐛"
    badge="Groq · Llama 3.3"
    apiEndpoint="/api/generate/debug"
    fields={[
      { name: 'code', label: 'Paste your code', type: 'textarea', placeholder: '// Your buggy code here…', rows: 10 },
      { name: 'language', label: 'Language', type: 'select', options: [{value:'python',label:'Python'}, {value:'javascript',label:'Javascript'}, {value:'typescript',label:'Typescript'}, {value:'java',label:'Java'}, {value:'go',label:'Go'}, {value:'rust',label:'Rust'}, {value:'cpp',label:'Cpp'}, {value:'csharp',label:'Csharp'}] },
    ]}
  />;
}
