'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const TEMPLATES: Record<string, {
  label: string
  icon: string
  fields: { id: string; label: string; placeholder: string; type?: string }[]
  generate: (fields: Record<string, string>) => { subject: string; body: string }
}> = {
  formal: {
    label: 'Formal / Professional',
    icon: '💼',
    fields: [
      { id: 'to', label: 'Recipient Name', placeholder: 'e.g. Mr. Santos' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'topic', label: 'Topic / Purpose', placeholder: 'e.g. project update, meeting request' },
      { id: 'details', label: 'Key Details', placeholder: 'e.g. The project is on schedule and we need approval by Friday' },
    ],
    generate: (f) => ({
      subject: `Regarding: ${f.topic || 'Your Inquiry'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

I hope this email finds you well. I am writing to you regarding ${f.topic || 'an important matter'}.

${f.details || 'Please find the relevant details below for your reference and consideration.'}

I would appreciate your guidance and response at your earliest convenience. Should you require any additional information, please do not hesitate to reach out.

Thank you for your time and consideration.

Warm regards,
${f.from || 'Your Name'}`,
    }),
  },
  followup: {
    label: 'Follow-Up',
    icon: '📬',
    fields: [
      { id: 'to', label: 'Recipient Name', placeholder: 'e.g. Ms. Garcia' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'previous', label: 'Previous Conversation / Topic', placeholder: 'e.g. job application, proposal, meeting' },
      { id: 'date', label: 'When Did You Last Contact?', placeholder: 'e.g. last Monday, June 5' },
      { id: 'action', label: 'What Are You Following Up On?', placeholder: 'e.g. waiting for approval, interview schedule' },
    ],
    generate: (f) => ({
      subject: `Follow-Up: ${f.previous || 'Our Previous Conversation'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

I hope you are doing well. I am following up on ${f.previous || 'our previous conversation'} from ${f.date || 'a few days ago'}.

I wanted to check in regarding ${f.action || 'the status of our discussion'} and see if there are any updates or next steps I should be aware of.

I understand you may be busy, and I appreciate your patience. Please let me know if you need any additional information from my end.

Thank you for your time, and I look forward to hearing from you.

Best regards,
${f.from || 'Your Name'}`,
    }),
  },
  apology: {
    label: 'Apology',
    icon: '🙏',
    fields: [
      { id: 'to', label: 'Recipient Name', placeholder: 'e.g. Mr. Reyes' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'mistake', label: 'What Happened?', placeholder: 'e.g. I missed the deadline, I sent wrong information' },
      { id: 'impact', label: 'How Did It Affect Them?', placeholder: 'e.g. caused delay in the project' },
      { id: 'solution', label: 'How Will You Fix It?', placeholder: 'e.g. I will submit by tomorrow, I will double-check next time' },
    ],
    generate: (f) => ({
      subject: `Sincere Apology — ${f.mistake || 'Recent Incident'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

I am writing to sincerely apologize for ${f.mistake || 'the recent incident'}.

I fully understand that this has ${f.impact || 'caused inconvenience'}, and I take complete responsibility for my actions. There is no excuse for what happened, and I am truly sorry.

To make things right, I will ${f.solution || 'ensure this does not happen again'}. I am committed to doing better and regaining your trust.

Once again, I sincerely apologize for any trouble this has caused. Thank you for your understanding.

Sincerely,
${f.from || 'Your Name'}`,
    }),
  },
  jobapplication: {
    label: 'Job Application',
    icon: '📄',
    fields: [
      { id: 'to', label: 'Hiring Manager / Company', placeholder: 'e.g. HR Manager, ABC Company' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian dela Cruz' },
      { id: 'position', label: 'Position Applying For', placeholder: 'e.g. Computer Technician, Web Developer' },
      { id: 'experience', label: 'Your Experience / Skills', placeholder: 'e.g. 10 years board-level repair, web development' },
      { id: 'why', label: 'Why Do You Want This Job?', placeholder: 'e.g. passionate about electronics, want to grow' },
    ],
    generate: (f) => ({
      subject: `Job Application — ${f.position || 'Open Position'}`,
      body: `Dear ${f.to || 'Hiring Manager'},

I am writing to express my strong interest in the ${f.position || 'position'} at your company. I am confident that my background and skills make me an excellent candidate for this role.

I have ${f.experience || 'relevant experience and skills that align with your requirements'}. Throughout my career, I have developed strong problem-solving abilities and a commitment to delivering quality results.

${f.why ? `I am particularly drawn to this opportunity because ${f.why}.` : 'I am excited about the opportunity to contribute to your team.'}

I would welcome the chance to discuss how my skills and experience align with your needs. I have attached my resume for your review and am available for an interview at your convenience.

Thank you for considering my application. I look forward to hearing from you.

Respectfully,
${f.from || 'Your Name'}`,
    }),
  },
  resignation: {
    label: 'Resignation',
    icon: '🚪',
    fields: [
      { id: 'to', label: 'Manager / Supervisor Name', placeholder: 'e.g. Mr. Bautista' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'position', label: 'Your Position', placeholder: 'e.g. Computer Technician' },
      { id: 'date', label: 'Last Working Day', placeholder: 'e.g. June 30, 2025' },
      { id: 'reason', label: 'Reason (Optional)', placeholder: 'e.g. pursuing personal business, career change' },
    ],
    generate: (f) => ({
      subject: `Resignation Letter — ${f.from || 'Your Name'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

I am writing to formally notify you of my resignation from my position as ${f.position || 'my current role'}, effective ${f.date || 'two weeks from today'}.

${f.reason ? `This decision was not made lightly. I have decided to resign in order to ${f.reason}.` : 'This was a difficult decision, but I believe it is the right step for my personal and professional growth.'}

I am truly grateful for the opportunities, experiences, and support I have received during my time here. I will do everything I can to ensure a smooth transition, including completing pending tasks and assisting in training a replacement if needed.

Thank you sincerely for everything. I wish you and the entire team continued success.

Respectfully yours,
${f.from || 'Your Name'}`,
    }),
  },
  complaint: {
    label: 'Complaint',
    icon: '⚠️',
    fields: [
      { id: 'to', label: 'Recipient / Company Name', placeholder: 'e.g. Customer Service, ABC Shop' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'issue', label: 'What Is Your Complaint?', placeholder: 'e.g. defective product, poor service, wrong order' },
      { id: 'date', label: 'When Did It Happen?', placeholder: 'e.g. June 10, 2025' },
      { id: 'resolution', label: 'What Do You Want Done?', placeholder: 'e.g. full refund, replacement, apology' },
    ],
    generate: (f) => ({
      subject: `Formal Complaint — ${f.issue || 'Recent Issue'}`,
      body: `Dear ${f.to || 'Customer Service'},

I am writing to formally bring to your attention a serious concern I experienced on ${f.date || 'a recent date'}.

The issue is as follows: ${f.issue || 'I experienced a problem with your product or service that was not up to the expected standard.'}

This situation has caused me significant inconvenience and frustration. I believe that as a valued customer, I deserve better service and quality.

I am requesting the following resolution: ${f.resolution || 'a prompt response and appropriate action to resolve this matter'}.

I expect a response within 3-5 business days. If this matter is not resolved satisfactorily, I may be required to escalate further.

Thank you for your attention to this matter.

Sincerely,
${f.from || 'Your Name'}`,
    }),
  },
  thankyou: {
    label: 'Thank You',
    icon: '🙌',
    fields: [
      { id: 'to', label: 'Recipient Name', placeholder: 'e.g. Ms. Flores' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'reason', label: 'What Are You Thanking Them For?', placeholder: 'e.g. job interview, help with project, referral' },
      { id: 'impact', label: 'How Did It Help You?', placeholder: 'e.g. gave me confidence, helped complete the project' },
    ],
    generate: (f) => ({
      subject: `Thank You — ${f.reason || 'Your Kindness and Support'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

I wanted to take a moment to sincerely thank you for ${f.reason || 'everything you have done'}.

${f.impact ? `Your support truly made a difference — it ${f.impact}.` : 'Your kindness and generosity have meant a great deal to me.'}

It is not often that someone goes out of their way to help others, and I truly appreciate the time and effort you put in. I will not forget this gesture.

Thank you again from the bottom of my heart. I hope to have the opportunity to return the favor someday.

With sincere gratitude,
${f.from || 'Your Name'}`,
    }),
  },
  inquiry: {
    label: 'Inquiry',
    icon: '❓',
    fields: [
      { id: 'to', label: 'Recipient / Company', placeholder: 'e.g. Sales Team, ABC School' },
      { id: 'from', label: 'Your Name', placeholder: 'e.g. Christian' },
      { id: 'topic', label: 'What Are You Inquiring About?', placeholder: 'e.g. product pricing, enrollment, service details' },
      { id: 'questions', label: 'Your Specific Questions', placeholder: 'e.g. What is the price? Is it available? How long does it take?' },
    ],
    generate: (f) => ({
      subject: `Inquiry: ${f.topic || 'Request for Information'}`,
      body: `Dear ${f.to || 'Sir/Ma\'am'},

Good day! I am writing to request information regarding ${f.topic || 'your products or services'}.

${f.questions ? `Specifically, I would like to know the following:\n\n${f.questions}` : 'I would appreciate any information you can provide about your offerings, pricing, and availability.'}

I am genuinely interested and would appreciate a detailed response at your earliest convenience. Please feel free to contact me if you need any clarification.

Thank you very much for your time, and I look forward to hearing from you soon.

Best regards,
${f.from || 'Your Name'}`,
    }),
  },
}

export default function EmailGenerator() {
  const [type, setType] = useState('formal')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null)
  const [toast, setToast] = useState('')

  const template = TEMPLATES[type]

  const updateField = (id: string, value: string) => {
    setFields(f => ({ ...f, [id]: value }))
    setResult(null)
  }

  const generate = () => {
    setResult(template.generate(fields))
  }

  const copySubject = () => {
    if (!result) return
    navigator.clipboard.writeText(result.subject)
    setToast('subject')
    setTimeout(() => setToast(''), 2000)
  }

  const copyBody = () => {
    if (!result) return
    navigator.clipboard.writeText(result.body)
    setToast('body')
    setTimeout(() => setToast(''), 2000)
  }

  const copyAll = () => {
    if (!result) return
    navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`)
    setToast('all')
    setTimeout(() => setToast(''), 2000)
  }

  const reset = () => {
    setFields({})
    setResult(null)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Email <span>Generator</span></h1>
        <p>Generate professional emails instantly. Choose a template, fill in your details, and get a ready-to-send email in seconds. Free, no signup.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Email Type</label>
        <div className="options-row">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button key={key} className={`opt-btn ${type === key ? 'active' : ''}`}
              onClick={() => { setType(key); setFields({}); setResult(null) }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1.25rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
          {template.fields.map(f => (
            <div key={f.id}>
              <label className="tool-label">{f.label}</label>
              <input
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={fields[f.id] || ''}
                onChange={e => updateField(f.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="btn-row">
          <button className="btn" onClick={generate}>✉️ Generate Email</button>
          <button className="btn btn-ghost" onClick={reset}>Clear</button>
        </div>

        {result && (
          <div style={{marginTop:'1.5rem'}}>
            {/* Subject */}
            <div style={{marginBottom:'1rem'}}>
              <div className="output-label">
                <label className="tool-label" style={{margin:0}}>Subject Line</label>
                <button className="btn btn-ghost btn-sm" onClick={copySubject}>Copy</button>
              </div>
              <div style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.85rem 1rem', fontSize:'0.88rem', color:'var(--gold)', fontFamily:'Syne, sans-serif', fontWeight:'600'}}>
                {result.subject}
              </div>
            </div>

            {/* Body */}
            <div>
              <div className="output-label">
                <label className="tool-label" style={{margin:0}}>Email Body</label>
                <button className="btn btn-ghost btn-sm" onClick={copyBody}>Copy</button>
              </div>
              <div style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1rem', fontSize:'0.85rem', lineHeight:'1.9', whiteSpace:'pre-wrap', color:'var(--text)'}}>
                {result.body}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn" onClick={copyAll}>Copy Full Email</button>
              <button className="btn btn-ghost" onClick={generate}>Regenerate</button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Email Generator — 8 Professional Templates</h2>
        <p>Our email generator helps you write professional emails in seconds. Choose from 8 templates including formal, follow-up, apology, job application, resignation, complaint, thank you, and inquiry emails. Just fill in your details and get a polished, ready-to-send email instantly.</p>
        <h2>Who Uses an Email Generator?</h2>
        <p>Professionals use it to write formal business emails quickly. Students use it for school inquiries and follow-ups. Job seekers use it for application and thank-you emails after interviews. OFWs and Filipino workers use it to communicate professionally in English with employers and clients abroad.</p>
        <h2>Tips for Writing Good Emails</h2>
        <p>Always use a clear subject line that summarizes your purpose. Keep your email concise and focused on one main topic. Use a professional greeting and closing. Proofread before sending. For job applications and formal business emails, personalize the template with specific details to make it more impactful.</p>
      </div>

      <RelatedTools current="/email-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>
        {toast === 'subject' ? '✓ Subject copied!' : toast === 'body' ? '✓ Body copied!' : '✓ Full email copied!'}
      </div>
    </main>
  )
}
