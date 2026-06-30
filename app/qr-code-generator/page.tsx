'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

export default function QRCodeGenerator() {
  const [input, setInput] = useState('')
  const [type, setType] = useState('url')
  const [qrUrl, setQrUrl] = useState('')

  const TYPES = [
    { id: 'url', label: 'URL / Website' }, { id: 'text', label: 'Plain Text' },
    { id: 'email', label: 'Email' }, { id: 'phone', label: 'Phone Number' },
  ]

  const buildContent = () => {
    if (!input.trim()) return ''
    switch (type) {
      case 'url': return input.startsWith('http') ? input : `https://${input}`
      case 'email': return `mailto:${input}`
      case 'phone': return `tel:${input}`
      default: return input
    }
  }

  const generate = () => {
    const content = buildContent()
    if (!content) return
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(content)}&bgcolor=0A0A0A&color=F5C842&margin=10`)
  }

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = 'qrcode-freegentools.png'
    a.click()
  }

  const placeholders: Record<string, string> = { url: 'https://example.com', text: 'Type any text here...', email: 'hello@example.com', phone: '+63 912 345 6789' }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>QR Code <span>Generator</span></h1>
        <p>Create free QR codes for URLs, text, email, and phone numbers. Download as PNG instantly — no signup needed.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">QR Code Type</label>
        <div className="options-row">
          {TYPES.map(t => <button key={t.id} className={`opt-btn ${type===t.id?'active':''}`} onClick={() => { setType(t.id); setQrUrl('') }}>{t.label}</button>)}
        </div>
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">{TYPES.find(t => t.id === type)?.label}</label>
          <input type="text" placeholder={placeholders[type]} value={input} onChange={e => { setInput(e.target.value); setQrUrl('') }} />
        </div>
        <div className="btn-row">
          <button className="btn" onClick={generate} disabled={!input.trim()}>Generate QR Code</button>
          {qrUrl && <button className="btn btn-ghost" onClick={download}>Download PNG</button>}
        </div>
        {qrUrl && (
          <div style={{marginTop:'1.5rem', textAlign:'center'}}>
            <div style={{display:'inline-block', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'12px', padding:'1.5rem'}}>
              <img src={qrUrl} alt="Generated QR Code" width={240} height={240} style={{display:'block', borderRadius:'4px'}} />
            </div>
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free QR Code Generator</h2>
        <p>Create high-quality QR codes for websites, business cards, menus, social media profiles, and more — instantly, free, no signup needed.</p>
      </div>
      <RelatedTools current="/qr-code-generator" />
    </main>
  )
}
