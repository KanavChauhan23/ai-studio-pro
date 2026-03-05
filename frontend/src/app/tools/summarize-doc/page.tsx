import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Document Summarizer"
    description="Deep analysis and structured summary of long documents"
    icon="📄"
    badge="Groq · Analysis"
    apiEndpoint="/api/generate/summarize-doc"
    fields={[
      { name: 'text', label: 'Paste document content', type: 'textarea', placeholder: 'Paste your PDF text, report, or document content here…', rows: 10 },
    ]}
  />;
}
