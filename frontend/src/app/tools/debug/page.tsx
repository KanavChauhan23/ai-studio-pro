import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Code Debugger"
    description="Instantly find every bug, understand why it breaks, and get the fixed version"
    icon="🐛"
    badge="Groq · Llama 3.3 70B"
    apiEndpoint="/api/generate/debug"
    fields={[
      { name:'code', label:'Paste your buggy code', type:'textarea', placeholder:'# Your code here…', rows:10 },
      { name:'language', label:'Language', type:'select', options:[{value:'python',label:'Python'}, {value:'javascript',label:'Javascript'}, {value:'typescript',label:'Typescript'}, {value:'java',label:'Java'}, {value:'go',label:'Go'}, {value:'rust',label:'Rust'}, {value:'cpp',label:'Cpp'}, {value:'csharp',label:'Csharp'}] },
    ]}
  />;
}
