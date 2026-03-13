import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage title="Code Generator" description="Generate, debug, explain or convert code in any programming language" icon="💻" badge="Groq · Llama 3.3 70B" apiEndpoint="/api/generate/code"
    fields={[
      {name:'prompt',label:'Describe what you need',type:'textarea',placeholder:'Build a FastAPI endpoint that accepts file uploads, validates the file type, and stores it in S3…',rows:5},
      {name:'language',label:'Language',type:'select',options:['python','javascript','typescript','react','html','java','go','rust','sql','bash'].map(l=>({value:l,label:l.charAt(0).toUpperCase()+l.slice(1)}))},
      {name:'task_type',label:'Task',type:'select',options:[{value:'generate',label:'Generate'},{value:'fix',label:'Fix / Debug'},{value:'explain',label:'Explain'},{value:'convert',label:'Convert'}]},
    ]}/>;
}
