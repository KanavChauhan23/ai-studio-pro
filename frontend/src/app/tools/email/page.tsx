import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Email Writer"
    description="Write clear, compelling, professional emails instantly"
    icon="📧"
    badge="Groq · Professional"
    apiEndpoint="/api/generate/email"
    fields={[
      { name: 'details', label: 'What the email should say', type: 'textarea', placeholder: 'Write a polite follow-up email to a potential client who hasn\'t replied to my proposal in 2 weeks. Friendly but professional.', rows: 5 },
      { name: 'email_type', label: 'Email type', type: 'select', options: [{value:'professional',label:'Professional'}, {value:'follow-up',label:'Follow Up'}, {value:'cold-outreach',label:'Cold Outreach'}, {value:'apology',label:'Apology'}, {value:'thank-you',label:'Thank You'}, {value:'complaint',label:'Complaint'}, {value:'introduction',label:'Introduction'}, {value:'negotiation',label:'Negotiation'}] },
    ]}
  />;
}
