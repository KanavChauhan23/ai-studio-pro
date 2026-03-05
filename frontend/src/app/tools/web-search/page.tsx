import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Web Search AI"
    description="Ask anything — AI will research and summarize the best answer"
    icon="🔍"
    badge="Groq · Research"
    apiEndpoint="/api/generate/web-search"
    fields={[
      { name: 'query', label: 'What do you want to know?', type: 'textarea', placeholder: 'Latest developments in quantum computing and what it means for cryptography…', rows: 3 },
    ]}
  />;
}
