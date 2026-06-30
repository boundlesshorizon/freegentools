'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const CASES = [
  { id: 'upper', label: 'UPPERCASE', fn: (t: string) => t.toUpperCase() },
  { id: 'lower', label: 'lowercase', fn: (t: string) => t.toLowerCase() },
  { id: 'title', label: 'Title Case', fn: (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) },
  { id: 'sentence', label: 'Sentence case', fn: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()) },
  { id: 'alternate', label: 'aLtErNaTiNg', fn: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'inverse', label: 'iNVERSE cASE', fn: (t: string) => t.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'camel', label: 'camelCase', fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { id: 'snake', label: 'snake_case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
  { id: 'kebab', label: 'kebab-case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [active, setActive] = useState('upper')
  const [toast, setToast] = useState(false)

  const activeCase = CASES.find(c => c.id === active)!
  const output = input ? activeCase.fn(input) : ''

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Case <span>Converter</span></h1>
        <p>Convert your text to any case instantly — uppercase, lowercase, title case, camelCase, snake_case, and more.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Your Text</label>
        <textarea placeholder="Paste or type your text here..." value={input} onChange={e => setInput(e.target.value)} rows={5} />
        {input && (
          <div className="stat-row">
            <div className="stat-chip"><span>{wordCount}</span> words</div>
            <div className="stat-chip"><span>{input.length}</span> characters</div>
          </div>
        )}
        <div style={{marginTop:'1.25rem'}}>
          <label className="tool-label">Select Case</label>
          <div className="options-row">
            {CASES.map(c => (
              <button key={c.id} className={`opt-btn ${active === c.id ? 'active' : ''}`} onClick={() => setActive(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>
        <div style={{marginTop:'1.25rem'}}>
          <div className="output-label">
            <label className="tool-label" style={{margin:0}}>Output — {activeCase.label}</label>
            <button className="btn btn-ghost btn-sm" onClick={copy}>Copy</button>
          </div>
          <div className="output-box">{output || <span style={{color:'var(--text-dim)'}}>Output will appear here...</span>}</div>
        </div>
        <div className="btn-row">
          <button className="btn" onClick={copy} disabled={!output}>Copy Result</button>
          <button className="btn btn-ghost" onClick={() => setInput('')}>Clear</button>
        </div>
      </div>
      <div className="seo-content fade-up-3">
        <h2>What is a Case Converter?</h2>
        <p>A case converter transforms text between different letter casing formats. Whether you accidentally left CAPS LOCK on, need text for programming, or want a specific style — our tool handles it instantly.</p>
        <h2>Available Formats</h2>
        <p>UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, plus alternating and inverse styles for social media.</p>
      </div>
      <RelatedTools current="/case-converter" />
      <div className={`toast ${toast?'show':''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
