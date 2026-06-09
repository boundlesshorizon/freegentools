'use client'
import { useState, useRef, useEffect } from 'react'
import RelatedTools from '../../components/RelatedTools'

// Simple QR code generator using an external API for rendering
export default function QRCodeGenerator() {
  const [input, setInput] = useState('')
  const [type, setType] = useState('url')
  const [qrUrl, setQrUrl] = useState('')
  const [toast, setToast] = useState(false)

  const TYPES = [
    { id: 'url', label: 'URL / Website' },
    { id: 'text', label: 'Plain Text' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'wifi', label: 'WiFi Password' },
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
    const encoded = encodeURIComponent(content)
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&bgcolor=0A0A0A&color=F5C842&margin=10`)
  }

  const download = async () => {
    if (!qrUrl) return
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = 'qrcode-freegentools.png'
    a.click()
  }

  const placeholders: Record<string, string> = {
    url: 'https://example.com',
    text: 'Type any text here...',
    email: 'hello@example.com',
    phone: '+63 912 345 6789',
    wifi: 'SSID:NetworkName;T:WPA;P:password;;',
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>QR Code <span>Generator</span></h1>
        <p>Create free QR codes for URLs, text, email, phone numbers, and more. Download as PNG instantly — no signup needed.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">QR Code Type</label>
        <div className="options-row">
          {TYPES.map(t => (
            <button
              key={t.id}
              className={`opt-btn ${type === t.id ? 'active' : ''}`}
              onClick={() => { setType(t.id); setQrUrl('') }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">{TYPES.find(t => t.id === type)?.label}</label>
          <input
            type="text"
            placeholder={placeholders[type]}
            value={input}
            onChange={e => { setInput(e.target.value); setQrUrl('') }}
          />
        </div>

        <div className="btn-row">
          <button className="btn" onClick={generate} disabled={!input.trim()}>Generate QR Code</button>
          {qrUrl && <button className="btn btn-ghost" onClick={download}>Download PNG</button>}
        </div>

        {qrUrl && (
          <div style={{marginTop:'1.5rem', textAlign:'center'}}>
            <div style={{
              display:'inline-block',
              background:'var(--bg)',
              border:'1px solid var(--border)',
              borderRadius:'12px',
              padding:'1.5rem',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="Generated QR Code" width={240} height={240} style={{display:'block', borderRadius:'4px'}} />
            </div>
            <p style={{marginTop:'0.75rem', fontSize:'0.75rem', color:'var(--text-dim)'}}>
              Click Download PNG to save your QR code
            </p>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free QR Code Generator — No Signup</h2>
        <p>Our QR code generator creates high-quality QR codes for any purpose — websites, business cards, menus, social media profiles, and more. All QR codes are generated instantly and available to download for free. No account or registration required.</p>
        <h2>QR Codes for Philippine Small Businesses</h2>
        <p>Small businesses in the Philippines widely use QR codes for GCash and Maya payments, product menus, loyalty programs, and social media links. Generate a QR code for your Facebook page, GCash number, or website and print it on your packaging, signage, or receipts.</p>
        <h2>How Long Do QR Codes Last?</h2>
        <p>QR codes generated with static content — like a URL or phone number — last forever as long as the destination stays the same. Download and save your QR code as a PNG file, then use it in print or digital materials without any expiry.</p>
      </div>

      <RelatedTools current="/qr-code-generator" />
    </main>
  )
}
