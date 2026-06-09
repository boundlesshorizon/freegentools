'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

export default function WordCounter() {
  const [input, setInput] = useState('')

  const words = input.trim() ? input.trim().split(/\s+/).length : 0
  const chars = input.length
  const charsNoSpace = input.replace(/\s/g, '').length
  const sentences = input.trim() ? input.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const paragraphs = input.trim() ? input.split(/\n\s*\n/).filter(p => p.trim()).length : 0
  const readTime = Math.max(1, Math.ceil(words / 200))
  const uniqueWords = new Set(input.toLowerCase().match(/\b\w+\b/g) || []).size

  const topWords = () => {
    const freq: Record<string, number> = {}
    const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','is','are','was','were','be','been','it','this','that','i','you','he','she','we','they'])
    ;(input.toLowerCase().match(/\b[a-z]{3,}\b/g) || []).forEach(w => {
      if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1
    })
    return Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,5)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Word <span>Counter</span></h1>
        <p>Count words, characters, sentences, and paragraphs in real time. Perfect for essays, blog posts, and SEO content.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Your Text</label>
        <textarea
          placeholder="Paste or type your text here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          style={{minHeight:'180px'}}
        />

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',
          gap:'0.75rem',
          marginTop:'1.25rem',
        }}>
          {[
            { label: 'Words', value: words },
            { label: 'Characters', value: chars },
            { label: 'Chars (no spaces)', value: charsNoSpace },
            { label: 'Sentences', value: sentences },
            { label: 'Paragraphs', value: paragraphs },
            { label: 'Unique Words', value: uniqueWords },
          ].map(s => (
            <div key={s.label} style={{
              background:'var(--bg)',
              border:'1px solid var(--border)',
              borderRadius:'8px',
              padding:'1rem',
              textAlign:'center',
            }}>
              <div style={{fontSize:'1.5rem', fontFamily:'Syne, sans-serif', fontWeight:'800', color:'var(--gold)'}}>{s.value}</div>
              <div style={{fontSize:'0.72rem', color:'var(--text-dim)', marginTop:'0.25rem', letterSpacing:'0.05em'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {words > 0 && (
          <div style={{marginTop:'1rem', padding:'1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px'}}>
            <div style={{fontSize:'0.72rem', color:'var(--text-dim)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.5rem'}}>Reading Time</div>
            <div style={{color:'var(--gold)', fontFamily:'Syne, sans-serif', fontWeight:'700'}}>~{readTime} min read</div>
          </div>
        )}

        {topWords().length > 0 && (
          <div style={{marginTop:'1rem'}}>
            <label className="tool-label">Top Keywords</label>
            <div className="stat-row">
              {topWords().map(([word, count]) => (
                <div key={word} className="stat-chip">{word} (<span>{count}</span>)</div>
              ))}
            </div>
          </div>
        )}

        <div className="btn-row">
          <button className="btn btn-ghost" onClick={() => setInput('')}>Clear</button>
        </div>
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Online Word Counter Tool</h2>
        <p>Our word counter gives you instant, accurate statistics about your text. Unlike basic counters, it also tracks unique word count, reading time, and your most-used keywords — making it a useful tool for SEO writers and content creators.</p>
        <h2>Word Count for Essays and Assignments</h2>
        <p>Students and writers can use this tool to ensure their essays, assignments, and articles meet required word count minimums or maximums. Paste your text and instantly see your word count, character count with and without spaces, and estimated reading time at an average reading pace of 200 words per minute.</p>
        <h2>SEO Content Writing</h2>
        <p>For SEO content, tracking keyword density and total word count helps you optimize your articles for search engines. Blog posts of 1,000 to 2,000 words tend to rank better in Google search results. Use this tool to keep your content within optimal ranges.</p>
      </div>

      <RelatedTools current="/word-counter" />
    </main>
  )
}
