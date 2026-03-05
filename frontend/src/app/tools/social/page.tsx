import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Social Media Post Generator"
    description="Create scroll-stopping posts optimized for each platform"
    icon="📱"
    badge="Groq · Marketing"
    apiEndpoint="/api/generate/social-post"
    fields={[
      { name: 'topic', label: 'Topic or idea', type: 'textarea', placeholder: 'My 2-year journey learning to code from zero — to landing my first $80k developer job', rows: 4 },
      { name: 'platform', label: 'Platform', type: 'select', options: [{value:'instagram',label:'Instagram'}, {value:'linkedin',label:'Linkedin'}, {value:'twitter',label:'Twitter'}, {value:'facebook',label:'Facebook'}, {value:'tiktok',label:'Tiktok'}] },
    ]}
  />;
}
