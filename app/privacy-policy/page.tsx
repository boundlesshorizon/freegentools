import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy — FreeGenTools', description: 'Privacy policy for FreeGenTools.com' }

export default function PrivacyPolicy() {
  const sections = [
    { title: '1. Information We Collect', body: 'FreeGenTools.com does not require registration. We do not collect personally identifiable information. Text processing happens directly in your browser — your input is never sent to our servers.' },
    { title: '2. Cookies and Analytics', body: 'We may use anonymous analytics to understand traffic patterns. This data is aggregated and cannot identify individual users. We may use cookies for Google AdSense.' },
    { title: '3. Google AdSense', body: 'We use Google AdSense to display ads. Google uses cookies to serve relevant ads based on prior visits. You can opt out at www.google.com/settings/ads.' },
    { title: '4. Data Security', body: 'Since we do not collect personal data, there is no personal data stored that could be compromised. All tools process client-side in your browser.' },
    { title: '5. Third-Party Services', body: 'Our QR Code Generator uses the QR Server API to generate QR codes. Your input is sent to this service to generate the image.' },
    { title: '6. Contact Us', body: 'For questions about this policy, please contact us through our website. Operated by Boundless Horizon Holdings Corp.' },
  ]
  return (
    <main style={{maxWidth:'820px', margin:'0 auto', padding:'2.5rem 1.5rem 5rem'}}>
      <div style={{fontSize:'0.72rem', marginBottom:'1rem'}}><a href="/" style={{color:'var(--gold)', textDecoration:'none'}}>← Back to Tools</a></div>
      <h1 style={{fontWeight:'800', fontSize:'1.8rem', marginBottom:'1.5rem'}}>Privacy <span style={{color:'var(--gold)'}}>Policy</span></h1>
      <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'1.75rem'}}>
        {sections.map((s, i) => (
          <div key={i} style={{marginBottom:'1.5rem'}}>
            <h2 style={{fontWeight:'700', fontSize:'0.95rem', color:'var(--gold)', marginBottom:'0.5rem'}}>{s.title}</h2>
            <p style={{color:'var(--text-dim)', fontSize:'0.82rem', lineHeight:1.7}}>{s.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
