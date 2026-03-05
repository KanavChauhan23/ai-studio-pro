import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Study Notes Generator"
    description="Convert lectures, textbooks, or any content into structured smart notes"
    icon="📚"
    badge="Groq · Education"
    apiEndpoint="/api/generate/study-notes"
    fields={[
      { name: 'text', label: 'Paste content to study', type: 'textarea', placeholder: 'Paste your lecture notes, chapter text, or any content…', rows: 10 },
    ]}
  />;
}
