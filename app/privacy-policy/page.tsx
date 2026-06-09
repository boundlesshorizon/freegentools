import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — FreeGenTools',
  description: 'Privacy policy for FreeGenTools.com',
}

export default function PrivacyPolicy() {
  return (
    <main style={{maxWidth:'860px', margin:'0 auto', padding:'3rem 1.5rem 5rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <div style={{fontSize:'0.72rem', color:'var(--text-dim)', marginBottom:'1rem'}}>
          <a href="/" style={{color:'var(--gold)', textDecoration:'none'}}>← Back to Tools</a>
        </div>
        <h1 style={{fontFamily:'Syne, sans-serif', fontWeight:'800', fontSize:'2rem', letterSpacing:'-0.03em', marginBottom:'0.5rem'}}>
          Privacy <span style={{color:'var(--gold)'}}>Policy</span>
        </h1>
        <p style={{color:'var(--text-dim)', fontSize:'0.85rem'}}>Last updated: January 2025</p>
      </div>

      <div style={{background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'12px', padding:'2rem', lineHeight:'1.8'}}>
        {[
          {
            title: '1. Information We Collect',
            body: 'FreeGenTools.com does not require registration or account creation. We do not collect any personally identifiable information such as your name, email address, or phone number. When you use our tools, all text processing happens directly in your browser — your input text is never sent to our servers.'
          },
          {
            title: '2. Cookies and Analytics',
            body: 'We may use anonymous analytics tools such as Google Analytics to understand general traffic patterns, including which tools are most popular, what countries visitors come from, and how long sessions last. This data is aggregated and cannot be used to identify individual users. We may also use cookies for Google AdSense to display relevant advertisements.'
          },
          {
            title: '3. Google AdSense',
            body: 'We use Google AdSense to display advertisements on our site. Google uses cookies to serve ads based on your prior visits to this website and other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings at www.google.com/settings/ads. Google\'s use of advertising cookies enables it and its partners to serve ads based on visits to this and other websites.'
          },
          {
            title: '4. Data Security',
            body: 'Since we do not collect personal data, there is no personal data stored on our servers that could be compromised. All tool functionality is processed client-side in your browser. We recommend you do not enter sensitive personal information (like real passwords you use) into any web tool, including ours.'
          },
          {
            title: '5. Third-Party Services',
            body: 'Our QR Code Generator uses the QR Server API (api.qrserver.com) to generate QR codes. When you use this tool, your input text is sent to this third-party service to generate the QR image. Please review their privacy policy if you are concerned about data sent to their service.'
          },
          {
            title: '6. Children\'s Privacy',
            body: 'Our services are not directed at children under the age of 13. We do not knowingly collect any information from children under 13. If you believe a child has provided us with personal information, please contact us so we can delete it.'
          },
          {
            title: '7. Changes to This Policy',
            body: 'We may update this privacy policy from time to time. We will notify users of any significant changes by updating the date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.'
          },
          {
            title: '8. Contact Us',
            body: 'If you have any questions about this privacy policy or our data practices, please contact us through our website. We are operated by Boundless Horizon Holdings Corp.'
          },
        ].map((section, i) => (
          <div key={i} style={{marginBottom:'1.75rem'}}>
            <h2 style={{fontFamily:'Syne, sans-serif', fontWeight:'700', fontSize:'1rem', color:'var(--gold)', marginBottom:'0.5rem'}}>{section.title}</h2>
            <p style={{color:'var(--text-dim)', fontSize:'0.85rem'}}>{section.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
