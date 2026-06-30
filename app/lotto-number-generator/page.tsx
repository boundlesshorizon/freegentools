'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

interface LottoGame { name: string; pick: number; from: number; bonusPick?: number; bonusFrom?: number; bonusLabel?: string; jackpot?: string; draw?: string; note?: string }
interface Country { flag: string; label: string; games: LottoGame[] }

const COUNTRIES: Record<string, Country> = {
  ph: { flag:'🇵🇭', label:'Philippines (PCSO)', games: [
    { name:'Ultra Lotto 6/58', pick:6, from:58, jackpot:'₱49.5M+', draw:'Tue, Fri, Sun' },
    { name:'Grand Lotto 6/55', pick:6, from:55, jackpot:'₱29.7M+', draw:'Mon, Wed, Sat' },
    { name:'Superlotto 6/49', pick:6, from:49, jackpot:'₱15.84M+', draw:'Tue, Thu, Sun' },
    { name:'Megalotto 6/45', pick:6, from:45, jackpot:'₱8.91M+', draw:'Mon, Wed, Fri' },
    { name:'Lotto 6/42', pick:6, from:42, jackpot:'₱5.94M+', draw:'Tue, Thu, Sat' },
    { name:'EZ2 / 2D', pick:2, from:31, jackpot:'₱4,000', draw:'Daily' },
    { name:'Swertres / 3D', pick:3, from:9, jackpot:'₱4,500', draw:'Daily', note:'0-9' },
  ]},
  us: { flag:'🇺🇸', label:'United States', games: [
    { name:'Powerball', pick:5, from:69, bonusPick:1, bonusFrom:26, bonusLabel:'Powerball', jackpot:'$20M+', draw:'Mon, Wed, Sat' },
    { name:'Mega Millions', pick:5, from:70, bonusPick:1, bonusFrom:25, bonusLabel:'Mega Ball', jackpot:'$20M+', draw:'Tue, Fri' },
    { name:'Pick 3', pick:3, from:9, jackpot:'$500', draw:'Daily', note:'0-9' },
    { name:'Pick 4', pick:4, from:9, jackpot:'$5,000', draw:'Daily', note:'0-9' },
  ]},
  ca: { flag:'🇨🇦', label:'Canada', games: [
    { name:'Lotto 6/49', pick:6, from:49, bonusPick:1, bonusFrom:49, bonusLabel:'Bonus', jackpot:'CA$5M+', draw:'Wed, Sat' },
    { name:'Lotto Max', pick:7, from:50, jackpot:'CA$10M+', draw:'Tue, Fri' },
    { name:'Daily Grand', pick:5, from:49, bonusPick:1, bonusFrom:7, bonusLabel:'Grand Number', jackpot:'CA$1,000/day', draw:'Mon, Thu' },
  ]},
  uk: { flag:'🇬🇧', label:'United Kingdom', games: [
    { name:'National Lottery Lotto', pick:6, from:59, bonusPick:1, bonusFrom:59, bonusLabel:'Bonus Ball', jackpot:'£4M+', draw:'Wed, Sat' },
    { name:'EuroMillions', pick:5, from:50, bonusPick:2, bonusFrom:12, bonusLabel:'Lucky Stars', jackpot:'€17M+', draw:'Tue, Fri' },
    { name:'Thunderball', pick:5, from:39, bonusPick:1, bonusFrom:14, bonusLabel:'Thunderball', jackpot:'£500,000', draw:'Tue, Wed, Fri, Sat' },
  ]},
  au: { flag:'🇦🇺', label:'Australia', games: [
    { name:'Saturday Lotto', pick:6, from:45, bonusPick:2, bonusFrom:45, bonusLabel:'Supplementary', jackpot:'AU$5M+', draw:'Sat' },
    { name:'Oz Lotto', pick:7, from:47, bonusPick:2, bonusFrom:47, bonusLabel:'Supplementary', jackpot:'AU$2M+', draw:'Tue' },
    { name:'Powerball AU', pick:7, from:35, bonusPick:1, bonusFrom:20, bonusLabel:'Powerball', jackpot:'AU$3M+', draw:'Thu' },
  ]},
}

function pickRandom(count: number, max: number, isDigit = false): number[] {
  if (isDigit) return Array.from({length: count}, () => Math.floor(Math.random() * (max + 1)))
  const pool = Array.from({length: max}, (_, i) => i + 1)
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]] }
  return pool.slice(0, count).sort((a,b) => a-b)
}

interface Result { main: number[]; bonus?: number[] }

export default function LottoNumberGenerator() {
  const [country, setCountry] = useState('ph')
  const [gameIndex, setGameIndex] = useState(0)
  const [sets, setSets] = useState(1)
  const [results, setResults] = useState<Result[]>([])
  const [toast, setToast] = useState(false)

  const countryData = COUNTRIES[country]
  const game = countryData.games[gameIndex]
  const isDigit = game.note === '0-9'

  const generate = () => {
    const newResults: Result[] = []
    for (let i = 0; i < sets; i++) {
      const main = pickRandom(game.pick, game.from, isDigit)
      const bonus = game.bonusPick && game.bonusFrom ? pickRandom(game.bonusPick, game.bonusFrom, isDigit) : undefined
      newResults.push({ main, bonus })
    }
    setResults(newResults)
  }

  const copyAll = () => {
    const text = results.map((r, i) => `Set ${i+1}: ${r.main.join(' - ')}${r.bonus ? ` | ${game.bonusLabel}: ${r.bonus.join(' - ')}` : ''}`).join('\n')
    navigator.clipboard.writeText(text)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Lotto Number <span>Generator</span></h1>
        <p>Generate random lucky lotto numbers for Philippines, USA, Canada, UK, and Australia. Free, instant, no signup.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Select Country</label>
        <div className="options-row">{Object.entries(COUNTRIES).map(([key, c]) => <button key={key} className={`opt-btn ${country===key?'active':''}`} onClick={() => { setCountry(key); setGameIndex(0); setResults([]) }}>{c.flag} {key.toUpperCase()}</button>)}</div>
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Select Game — {countryData.label}</label>
          <div className="options-row">{countryData.games.map((g, i) => <button key={i} className={`opt-btn ${gameIndex===i?'active':''}`} onClick={() => { setGameIndex(i); setResults([]) }}>{g.name}</button>)}</div>
        </div>
        <div style={{marginTop:'1rem', padding:'0.85rem 1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', display:'flex', flexWrap:'wrap', gap:'0.75rem', fontSize:'0.78rem', color:'var(--text-dim)'}}>
          <span>🎯 Pick <strong style={{color:'var(--gold)'}}>{game.pick}</strong> from <strong style={{color:'var(--gold)'}}>{game.from}</strong></span>
          {game.bonusPick && <span>➕ {game.bonusLabel}: <strong style={{color:'var(--gold)'}}>{game.bonusPick}</strong> from <strong style={{color:'var(--gold)'}}>{game.bonusFrom}</strong></span>}
          {game.jackpot && <span>💰 <strong style={{color:'var(--gold)'}}>{game.jackpot}</strong></span>}
          {game.draw && <span>📅 <strong style={{color:'var(--gold)'}}>{game.draw}</strong></span>}
        </div>
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Number of Sets: <span style={{color:'var(--gold)'}}>{sets}</span></label>
          <input type="range" min={1} max={10} value={sets} onChange={e => setSets(Number(e.target.value))} style={{width:'100%', accentColor:'var(--gold)'}} />
        </div>
        <div className="btn-row">
          <button className="btn" onClick={generate}>🎰 Generate Numbers</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>
        {results.length > 0 && (
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
            {results.map((r, i) => (
              <div key={i} style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'10px', padding:'1rem 1.25rem'}}>
                <div style={{fontSize:'0.7rem', color:'var(--text-dim)', marginBottom:'0.5rem'}}>Set {i+1}</div>
                <div style={{display:'flex', flexWrap:'wrap', gap:'0.4rem'}}>
                  {r.main.map((n, j) => <span key={j} style={{width:'40px', height:'40px', background:'var(--gold-glow)', border:'1px solid var(--gold-dim)', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize: n>99?'0.7rem':'0.88rem', color:'var(--gold)'}}>{n}</span>)}
                </div>
                {r.bonus && (
                  <div style={{marginTop:'0.5rem', display:'flex', alignItems:'center', gap:'0.4rem'}}>
                    <span style={{fontSize:'0.7rem', color:'var(--text-dim)'}}>{game.bonusLabel}:</span>
                    {r.bonus.map((n, j) => <span key={j} style={{width:'34px', height:'34px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.4)', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'0.8rem', color:'#ef4444'}}>{n}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free Lotto Number Generator — All Countries</h2>
        <p>Generate random lucky numbers for major lottery games across the Philippines (PCSO), United States, Canada, United Kingdom, and Australia.</p>
        <h2>Are Random Numbers Lucky?</h2>
        <p>Every lottery draw is completely random, so any combination has equal chance of winning. Using a generator removes personal bias and saves time.</p>
      </div>
      <RelatedTools current="/lotto-number-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Numbers copied!</div>
    </main>
  )
}
