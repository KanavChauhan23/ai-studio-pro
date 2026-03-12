import ToolPage from '@/components/ToolPage';
export default function Page() {
  return <ToolPage
    title="Email Writer"
    description="Write clear, compelling, professional emails for any situation instantly"
    icon="📧"
    badge="Groq · Professional"
    apiEndpoint="/api/generate/email"
    fields={[
      { name:'details', label:'What the email should say', type:'textarea', placeholder:'Write a polite but firm follow-up email to a client who hasn\'t paid their invoice in 30 days. Friendly tone, one final reminder before escalating.', rows:5 },
      { name:'email_type', label:'Email Type', type:'select', options:[{value:'professional',label:'Professional'}, {value:'follow-up',label:'Follow Up'}, {value:'cold-outreach',label:'Cold Outreach'}, {value:'apology',label:'Apology'}, {value:'thank-you',label:'Thank You'}, {value:'complaint',label:'Complaint'}, {value:'introduction',label:'Introduction'}, {value:'negotiation',label:'Negotiation'}] },
    ]}
  />;
}
