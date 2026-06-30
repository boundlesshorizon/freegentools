'use client'
import { useState, useCallback } from 'react'
import RelatedTools from '../../components/RelatedTools'

const CHARS = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', numbers: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' }

function generate(length: number, opts: Record<string, boolean>) {
  let pool = ''
  if (opts.upper) pool += CHARS.upper
  if (opts.lower) pool += CHARS.lower
  if (opts.numbers) pool += CHARS.numbers
  if (opts.symbols) pool += CHARS.symbols
  if (!pool) pool = CHARS.lower + CHARS.numbers
  let pw = ''
  for (let i = 0; i < length; i++) pw += pool[Math.floor(Math.random() * pool.length)]
  return pw
}

function strength(pw: string) {
  let s = 0
  if (pw.length >= 8) s++
  if (pw.length >= 12) s++
  if (pw.length >= 16) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  if (s <= 2) return { label: 'Weak', color: '#ef4444', pct: 25 }
  if (s <= 4) return { label: 'Fair', color: '#f97316', pct: 50 }
  if (s <= 5) return { label: 'Good', color: '#eab308', pct: 75 }
  return { label: 'Strong', color: '#22c55e', pct: 100 }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [passwords, setPasswords] = useState<string[]>(() => Array(5).fill(null).map(() => generate(16, { upper: true, lower: true, numbers: true, symbols: true })))
  const [toast, setToast] = useState(false)

  const gen = useCallback(() => setPasswords(Array(5).fill(null).map(() => generate(length, opts))), [length, opts])
  const copy = (pw: string) => { navigator.clipboard.writeText(pw); setToast(true); setTimeout(() => setToast(false), 2000) }
  const toggle = (key: string) => setOpts(o => ({ ...o, [key]: !o[key as keyof typeof o] }))
  const str = strength(passwords[0])

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Password <span>Generator</span></h1>
        <p>Generate strong, secure, random passwords instantly. Customize length and character types to match any requirement.</p>
      </div>
      <div className="tool-box fade-up-2">
        <div style={{marginBottom:'1.25rem'}}>
          <label className="tool-label">Password Length: <span style={{color:'var(--gold)'}}>{length}</span></label>
          <input type="range" min={6} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{width:'100%', accentColor:'var(--gold)', cursor:'pointer'}} />
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'var(--text-dim)', marginTop:'0.25rem'}}><span>6</span><span>64</span></div>
        </div>
        <label className="tool-label">Character Types</label>
        <div className="options-row">
          {[{key:'upper',label:'A-Z'},{key:'lower',label:'a-z'},{key:'numbers',label:'0-9'},{key:'symbols',label:'!@#'}].map(o => (
            <button key={o.key} className={`opt-btn ${opts[o.key as keyof typeof opts] ? 'active' : ''}`} onClick={() => toggle(o.key)}>{o.label}</button>
          ))}
        </div>
        <div className="btn-row"><button className="btn" onClick={gen}>Generate Passwords</button></div>
        <div style={{marginTop:'1.25rem'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem'}}>
            <label className="tool-label" style={{margin:0}}>Generated</label>
            <span style={{fontSize:'0.75rem', color: str.color, fontWeight:'700'}}>{str.label}</span>
          </div>
          <div style={{height:'4px', background:'var(--bg)', borderRadius:'2px', marginBottom:'0.75rem', overflow:'hidden'}}>
            <div style={{height:'100%', width:`${str.pct}%`, background: str.color, borderRadius:'2px'}} />
          </div>
          {passwords.map((pw, i) => (
            <div key={i} className="fancy-item" style={{marginBottom:'0.5rem'}} onClick={() => copy(pw)}>
              <span style={{flex:1, wordBreak:'break-all', fontFamily:'monospace'}}>{pw}</span>
              <button className="copy-btn">COPY</button>
            </div>
          ))}
        </div>
      </div>
      <div className="seo-content fade-up-3">
        <h2>Why Use a Password Generator?</h2>
        <p>A strong randomly generated password is one of the most important steps for online security. For most accounts, use at least 12 characters mixing uppercase, lowercase, numbers, and symbols.</p>
      </div>
      <RelatedTools current="/password-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Password copied!</div>
    </main>
  )
}
