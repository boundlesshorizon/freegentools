'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

export default function SpellingGrammarChecker() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [mode, setMode] = useState('fix')

  const MODES = [
    { id: 'fix', label: '🔧 Fix Errors' },
    { id: 'improve', label: '✨ Improve Writing' },
    { id: 'formal', label: '💼 Make Formal' },
    { id: 'casual', label: '😊 Make Casual' },
    { id: 'shorter', label: '✂️ Make Shorter' },
  ]

  const PROMPTS: Record<string, string> = {
    fix: 'Fix all spelling mistakes and grammar errors in the following text. Return only the corrected text with no explanation, no preamble, and no extra commentary.',
    improve: 'Improve the writing quality of the following text while keeping the original meaning. Make it clearer and more engaging. Return only the improved text with no explanation.',
    formal: 'Rewrite the following text in a formal, professional tone. Return only the rewritten text with no explanation.',
    casual: 'Rewrite the following text in a casual, friendly, conversational tone. Return only the rewritten text with no explanation.',
    shorter: 'Make the following text shorter and more concise while keeping all key points. Return only the shortened text with no explanation.',
  }

  const fix = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `${PROMPTS[mode]}\n\nText:\n${input}`
          }]
        })
      })

      const data = await response.json()
      const result = data?.content?.[0]?.text || ''
      setOutput(result)
    } catch (err) {
      setOutput('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const wordsBefore = input.trim() ? input.trim().split(/\s+/).length : 0
  const wordsAfter = output.trim() ? output.trim().split(/\s+/).length : 0

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Spelling & Grammar <span>Fixer</span></h1>
        <p>Fix spelling mistakes, grammar errors, and improve your writing instantly. Powered by AI. Free, no signup needed.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Mode</label>
        <div className="options-row">
          {MODES.map(m => (
            <button
              key={m.id}
              className={`opt-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Your Text</label>
          <textarea
            placeholder="Paste or type your text here..."
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={6}
            style={{minHeight:'140px'}}
          />
          {input.trim() && (
            <div className="stat-row">
              <div className="stat-chip"><span>{wordsBefore}</span> words</div>
              <div className="stat-chip"><span>{input.length}</span> characters</div>
            </div>
          )}
        </div>

        <div className="btn-row">
          <button className="btn" onClick={fix} disabled={!input.trim() || loading}>
            {loading ? 'Processing...' : MODES.find(m => m.id === mode)?.label || 'Fix Text'}
          </button>
          {output && <button className="btn btn-ghost" onClick={() => { setInput(''); setOutput('') }}>Clear</button>}
        </div>

        {loading && (
          <div style={{
            marginTop:'1.25rem',
            padding:'2rem',
            textAlign:'center',
            background:'var(--bg)',
            border:'1px solid var(--border)',
            borderRadius:'8px',
            color:'var(--text-dim)',
            fontSize:'0.85rem',
          }}>
            <div style={{
              width:'24px', height:'24px',
              border:'2px solid var(--border)',
              borderTop:'2px solid var(--gold)',
              borderRadius:'50%',
              margin:'0 auto 0.75rem',
              animation:'spin 0.8s linear infinite',
            }} />
            AI is fixing your text...
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {output && !loading && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>Fixed Text</label>
              <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                {wordsAfter !== wordsBefore && (
                  <span style={{fontSize:'0.7rem', color:'var(--text-dim)'}}>
                    {wordsAfter < wordsBefore ? `−${wordsBefore - wordsAfter}` : `+${wordsAfter - wordsBefore}`} words
                  </span>
                )}
                <button className="btn btn-ghost btn-sm" onClick={copy}>Copy</button>
              </div>
            </div>
            <div className="output-box" style={{lineHeight:'1.8', fontSize:'0.88rem'}}>
              {output}
            </div>
            <div className="btn-row">
              <button className="btn" onClick={copy}>Copy Fixed Text</button>
              <button className="btn btn-ghost" onClick={() => { setInput(output); setOutput('') }}>Use as New Input</button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free AI Spelling and Grammar Fixer</h2>
        <p>Our spelling and grammar fixer uses advanced AI to instantly correct spelling mistakes, grammar errors, punctuation issues, and awkward sentence structure. It works on essays, emails, social media posts, business documents, and any type of written text — completely free with no account required.</p>
        <h2>More Than Just Spell Check</h2>
        <p>Unlike basic spell checkers, our tool understands context. It can fix grammar that is technically spelled correctly but grammatically wrong, such as wrong verb tenses, subject-verb disagreement, and misused words. Use the Improve Writing mode to get cleaner, more professional text, or the Formal mode to convert casual writing into business-ready copy.</p>
        <h2>Perfect for Students, Writers, and Professionals</h2>
        <p>Students use it to polish essays and assignments before submission. Professionals use it to clean up emails and reports. Content creators use it to fix captions and blog posts. OFWs and Filipino professionals use it to ensure their English writing is clear and correct when communicating with international clients or employers.</p>
      </div>

      <RelatedTools current="/spelling-grammar-checker" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
