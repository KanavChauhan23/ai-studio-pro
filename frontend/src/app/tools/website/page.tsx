import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Website Builder"
    description="Generate complete, beautiful websites from a text description"
    icon="🌐"
    badge="Groq · HTML / React"
    apiEndpoint="/api/generate/website"
    fields={[
      { name: 'prompt', label: 'Describe your website', type: 'textarea', placeholder: 'A landing page for a SaaS startup called CloudSync. Modern dark design, hero section, features grid, pricing table, footer.', rows: 5 },
      { name: 'framework', label: 'Output Format', type: 'select', options: [{value:'html',label:'Html'}, {value:'react',label:'React'}] },
    ]}
  />;
}
