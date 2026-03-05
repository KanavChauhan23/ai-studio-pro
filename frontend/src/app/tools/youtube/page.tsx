import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="YouTube Script Generator"
    description="Write complete, engaging, viral-ready YouTube scripts"
    icon="🎬"
    badge="Groq · Content Creator"
    apiEndpoint="/api/generate/youtube-script"
    fields={[
      { name: 'topic', label: 'Video topic', type: 'textarea', placeholder: '10 productivity habits that completely changed my life', rows: 3 },
      { name: 'duration', label: 'Target duration', type: 'select', options: [{value:'3min',label:'3Min'}, {value:'5min',label:'5Min'}, {value:'10min',label:'10Min'}, {value:'15min',label:'15Min'}, {value:'20min',label:'20Min'}] },
    ]}
  />;
}
