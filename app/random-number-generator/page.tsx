'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [toast, setToast] = useState(false)

  const generate = () => {
    const lo = Math.min(min, max), hi = Math.max(min, max), range = hi - lo + 1
    const actualCount = Math.min(count, unique ? range : count)
    let nums: number[] = []
    if (unique) {
      const pool = Array.from({length: range}, (_, i) => lo + i)
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]] }
      nums = pool.slice(0, actualCount)
    } else {
      nums = Array.from({length: actualCount}, () => Math.floor(Math.random() * range) + lo)
    }
    setResults(nums)
  }

  const copy = () => { navigator.clipboard.writeText(results.join(', ')); setToast(true); setTimeout(() => setToast(false), 2000) }

  const PRESETS = [
    { label: 'Coin Flip', min: 0, max: 1, count: 1 }, { label: 'Dice (1-6)', min: 1, max: 6, count: 1 },
    { label: '2 Dice', min: 1, max: 6, count: 2 }, { label: '1-100', min: 1, max: 100, count: 1 },
    { label: '1-1000', min: 1, max: 1000, count: 1 }, { label: 'Pin Code', min: 1000, max: 9999, count: 1 },
    { label: 'Raffle 10', min: 1, max: 100, count: 10 }, { label: 'Top 3', min: 1, max: 50, count: 3 },
  ]

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Random Number <span>Generator</span></h1>
        <p>Generate truly random numbers in any range. Perfect for raffles, games, PIN codes, classroom activities, and decisions.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Quick Presets</label>
        <div className="options-row">
          {PRESETS.map(p => <button key={p.label} className="opt-btn" onClick={() => { setMin(p.min); setMax(p.max); setCount(p.count) }}>{p.label}</button>)}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem', marginTop:'1.25rem'}}>
          <div><label className="tool-label">Minimum</label><input type="number" value={min} onChange={e => setMin(Number(e.target.value))} /></div>
          <div><label className="tool-label">Maximum</label><input type="number" value={max} onChange={e => setMax(Number(e.target.value))} /></div>
          <div><label className="tool-label">How Many</label><input type="number" min={1} max={1000} value={count} onChange={e => setCount(Math.max(1, Number(e.target.value)))} /></div>
        </div>
        <div style={{marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}} onClick={() => setUnique(u => !u)}>
          <div style={{width:'16px', height:'16px', border:`1px solid ${unique?'var(--gold-dim)':'var(--border)'}`, borderRadius:'3px', background: unique?'var(--gold-glow)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', color:'var(--gold)'}}>{unique ? '✓' : ''}</div>
          <span style={{fontSize:'0.8rem', color:'var(--text-dim)'}}>No duplicates</span>
        </div>
        <div className="btn-row">
          <button className="btn" onClick={generate}>Generate</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copy}>Copy Numbers</button>}
        </div>
        {results.length > 0 && (
          <div style={{marginTop:'1.5rem', textAlign:'center'}}>
            <div style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'12px', padding:'2rem'}}>
              {results.length === 1 ? (
                <div style={{fontSize:'3.5rem', fontWeight:'800', color:'var(--gold)', lineHeight:1}}>{results[0]}</div>
              ) : (
                <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center'}}>
                  {results.map((n, i) => <span key={i} style={{background:'var(--gold-glow)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.5rem 1rem', fontWeight:'700', fontSize:'1.1rem', color:'var(--gold)'}}>{n}</span>)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free Random Number Generator</h2>
        <p>Generate truly random numbers for raffles, classroom picks, PIN codes, dice rolls, and decisions of any kind.</p>
      </div>
      <RelatedTools current="/random-number-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Numbers copied!</div>
    </main>
  )
}
