'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

interface LTMatch {
  message: string
  offset: number
  length: number
  replacements: { value: string }[]
}

export default function SpellingGrammarChecker() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [matches, setMatches] = useState<LTMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [mode, setMode] = useState('fix')
  const [checked, setChecked] = useState(false)

  const MODES = [
    { id: 'fix', label: '🔧 Fix Errors' },
    { id: 'uppercase', label: '🔠 Fix Capitalization' },
    { id: 'punctuation', label: '✏️ Fix Punctuation' },
  ]

  const fixWithAPI = async () => {
    setLoading(true)
    setOutput('')
    setMatches([])
    setChecked(false)
    try {
      const formData = new URLSearchParams()
      formData.append('text', input)
      formData.append('language', 'en-US')
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
      const data = await response.json()
      const foundMatches: LTMatch[] = data.matches || []
      setMatches(foundMatches)
      let fixed = input
      let offset = 0
      const sorted = [...foundMatches].sort((a, b) => a.offset - b.offset)
      for (const match of sorted) {
        if (match.replacements.length > 0) {
          const before = fixed.slice(0, match.offset + offset)
          const after = fixed.slice(match.offset + offset + match.length)
          const replacement = match.replacements[0].value
          fixed = before + replacement + after
          offset += replacement.length - match.length
        }
      }
      setOutput(fixed)
      setChecked(true)
    } catch {
      setOutput('Could not connect. Please check your internet and try again.')
      setChecked(true)
    }
    setLoading(false)
  }

  const quickFix = () => {
    let text = input
    if (mode === 'uppercase') {
      text = text.toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
        .replace(/\bi\b/g, 'I')
        .replace(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi, w => w.charAt(0).toUpperCase() + w.slice(1))
        .replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi, w => w.charAt(0).toUpperCase() + w.slice(1))
    }
    if (mode === 'punctuation') {
      text = text
        .replace(/\s+([.,!?;:])/g, '$1')
        .replace(/([.,!?;:])([^\s"'\n])/g, '$1 $2')
        .replace(/\s+/g, ' ').trim()
      text = text.charAt(0).toUpperCase() + text.slice(1)
      if (text && !'.!?'.includes(text[text.length - 1])) text += '.'
    }
    setOutput(text)
    setChecked(true)
    setMatches([])
  }

  const handleCheck = () => mode === 'fix' ? fixWithAPI() : quickFix()

  const copy = () => {
    navigator.clipboard.writeText(output)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const errorCount = matches.filter(m => m.replacements.length > 0).length

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Spelling & Grammar <span>Fixer</span></h1>
        <p>Fix spelling mistakes, grammar errors, capitalization, and punctuation instantly. Free, no signup needed.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Mode</label>
        <div className="options-row">
          {MODES.map(m => (
            <button key={m.id} className={`opt-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => { setMode(m.id); setOutput(''); setChecked(false); setMatches([]) }}>
              {m.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Your Text</label>
          <textarea
            placeholder="Paste or type your text here..."
            value={input}
            onChange={e => { setInput(e.target.value); setOutput(''); setChecked(false); setMatches([]) }}
            rows={6} style={{minHeight:'140px'}}
          />
          {input.trim() && (
            <div className="stat-row">
              <div className="stat-chip"><span>{input.trim().split(/\s+/).length}</span> words</div>
              <div className="stat-chip"><span>{input.length}</span> chars</div>
            </div>
          )}
        </div>

        <div className="btn-row">
          <button className="btn" onClick={handleCheck} disabled={!input.trim() || loading}>
            {loading ? 'Checking...' : '🔍 Check & Fix'}
          </button>
          {(input || output) && (
            <button className="btn btn-ghost" onClick={() => { setInput(''); setOutput(''); setMatches([]); setChecked(false) }}>Clear</button>
          )}
        </div>

        {loading && (
          <div style={{marginTop:'1.25rem', padding:'2rem', textAlign:'center', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', color:'var(--text-dim)', fontSize:'0.85rem'}}>
            <div style={{width:'24px', height:'24px', border:'2px solid var(--border)', borderTop:'2px solid var(--gold)', borderRadius:'50%', margin:'0 auto 0.75rem', animation:'spin 0.8s linear infinite'}} />
            Checking your text...
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {checked && !loading && (
          <div style={{marginTop:'1.25rem'}}>
            <div style={{padding:'0.75rem 1rem', background: errorCount === 0 ? 'rgba(34,197,94,0.1)' : 'rgba(245,200,66,0.1)', border: `1px solid ${errorCount === 0 ? 'rgba(34,197,94,0.3)' : 'rgba(245,200,66,0.3)'}`, borderRadius:'8px', marginBottom:'1rem', fontSize:'0.82rem', color: errorCount === 0 ? '#22c55e' : 'var(--gold)'}}>
              {errorCount === 0 ? '✅ No errors found! Your text looks great.' : `⚠️ Found and fixed ${errorCount} issue${errorCount !== 1 ? 's' : ''}.`}
            </div>

            {output && (
              <>
                <div className="output-label">
                  <label className="tool-label" style={{margin:0}}>Fixed Text</label>
                  <button className="btn btn-ghost btn-sm" onClick={copy}>Copy</button>
                </div>
                <div className="output-box" style={{lineHeight:'1.8', fontSize:'0.88rem'}}>{output}</div>
                <div className="btn-row">
                  <button className="btn" onClick={copy}>Copy Fixed Text</button>
                  <button className="btn btn-ghost" onClick={() => { setInput(output); setOutput(''); setChecked(false); setMatches([]) }}>Use as New Input</button>
                </div>
              </>
            )}

            {matches.filter(m => m.replacements.length > 0).length > 0 && (
              <div style={{marginTop:'1rem'}}>
                <label className="tool-label">Issues Fixed</label>
                <div style={{display:'flex', flexDirection:'column', gap:'0.4rem', maxHeight:'200px', overflowY:'auto'}}>
                  {matches.filter(m => m.replacements.length > 0).map((m, i) => (
                    <div key={i} style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'6px', padding:'0.6rem 0.85rem', fontSize:'0.78rem'}}>
                      <span style={{color:'#ef4444'}}>"{input.slice(m.offset, m.offset + m.length)}"</span>
                      <span style={{color:'var(--text-dim)'}}> → </span>
                      <span style={{color:'#22c55e'}}>"{m.replacements[0]?.value}"</span>
                      <span style={{color:'var(--text-dim)', marginLeft:'0.5rem', fontSize:'0.7rem'}}>{m.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Spelling and Grammar Checker</h2>
        <p>Our spelling and grammar checker instantly detects and fixes spelling mistakes, grammar errors, punctuation problems, and capitalization issues in your text. Works on essays, emails, social media posts, and any written content — completely free with no account required.</p>
        <h2>More Than Just Spell Check</h2>
        <p>Unlike basic spell checkers, our tool understands context and catches grammar errors that are spelled correctly but used incorrectly. It also shows you exactly what was fixed and why, so you can learn from your mistakes over time.</p>
        <h2>Perfect for Students, Writers, and Professionals</h2>
        <p>Students use it to polish essays before submission. Professionals use it to clean up emails and reports. Filipino professionals use it to ensure their English writing is clear and correct when communicating with international clients or employers.</p>
      </div>

      <RelatedTools current="/spelling-grammar-checker" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
