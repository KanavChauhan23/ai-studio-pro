import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Resume Builder"
    description="Create a polished, ATS-optimized resume and matching cover letter"
    icon="📋"
    badge="Groq · Professional"
    apiEndpoint="/api/generate/resume"
    fields={[
      { name: 'details', label: 'Your details', type: 'textarea', placeholder: 'Name: John Doe\nRole applying for: Senior Software Engineer\nExperience: 5 years — React, Node.js, Python\nEducation: B.Tech Computer Science, 2020\nKey achievements: Led team of 8, improved app performance by 40%', rows: 10 },
    ]}
  />;
}
