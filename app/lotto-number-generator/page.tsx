'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

interface LottoGame {
  name: string
  pick: number
  from: number
  bonusPick?: number
  bonusFrom?: number
  bonusLabel?: string
  jackpot?: string
  draw?: string
  note?: string
}

interface Country {
  flag: string
  label: string
  games: LottoGame[]
}

const COUNTRIES: Record<string, Country> = {
  ph: {
    flag: '🇵🇭',
    label: 'Philippines (PCSO)',
    games: [
      { name: 'Ultra Lotto 6/58', pick: 6, from: 58, jackpot: '₱49.5M+', draw: 'Tue, Fri, Sun' },
      { name: 'Grand Lotto 6/55', pick: 6, from: 55, jackpot: '₱29.7M+', draw: 'Mon, Wed, Sat' },
      { name: 'Superlotto 6/49', pick: 6, from: 49, jackpot: '₱15.84M+', draw: 'Tue, Thu, Sun' },
      { name: 'Megalotto 6/45', pick: 6, from: 45, jackpot: '₱8.91M+', draw: 'Mon, Wed, Fri' },
      { name: 'Lotto 6/42', pick: 6, from: 42, jackpot: '₱5.94M+', draw: 'Tue, Thu, Sat' },
      { name: '4D Lotto', pick: 4, from: 9, jackpot: '₱10,000', draw: 'Mon, Wed, Fri', note: 'Numbers 0-9' },
      { name: 'EZ2 / 2D', pick: 2, from: 31, jackpot: '₱4,000', draw: 'Daily' },
      { name: 'Swertres / 3D', pick: 3, from: 9, jackpot: '₱4,500', draw: 'Daily', note: 'Numbers 0-9' },
    ],
  },
  us: {
    flag: '🇺🇸',
    label: 'United States',
    games: [
      { name: 'Powerball', pick: 5, from: 69, bonusPick: 1, bonusFrom: 26, bonusLabel: 'Powerball', jackpot: '$20M+', draw: 'Mon, Wed, Sat' },
      { name: 'Mega Millions', pick: 5, from: 70, bonusPick: 1, bonusFrom: 25, bonusLabel: 'Mega Ball', jackpot: '$20M+', draw: 'Tue, Fri' },
      { name: 'Lucky for Life', pick: 5, from: 48, bonusPick: 1, bonusFrom: 18, bonusLabel: 'Lucky Ball', jackpot: '$1,000/day', draw: 'Daily' },
      { name: 'Pick 3', pick: 3, from: 9, jackpot: '$500', draw: 'Daily', note: 'Numbers 0-9' },
      { name: 'Pick 4', pick: 4, from: 9, jackpot: '$5,000', draw: 'Daily', note: 'Numbers 0-9' },
      { name: 'Pick 5', pick: 5, from: 9, jackpot: '$50,000', draw: 'Daily', note: 'Numbers 0-9' },
    ],
  },
  ca: {
    flag: '🇨🇦',
    label: 'Canada',
    games: [
      { name: 'Lotto 6/49', pick: 6, from: 49, bonusPick: 1, bonusFrom: 49, bonusLabel: 'Bonus', jackpot: 'CA$5M+', draw: 'Wed, Sat' },
      { name: 'Lotto Max', pick: 7, from: 50, jackpot: 'CA$10M+', draw: 'Tue, Fri' },
      { name: 'Daily Grand', pick: 5, from: 49, bonusPick: 1, bonusFrom: 7, bonusLabel: 'Grand Number', jackpot: 'CA$1,000/day', draw: 'Mon, Thu' },
      { name: 'BC/49', pick: 6, from: 49, jackpot: 'CA$2M+', draw: 'Wed, Sat' },
      { name: 'Pick 2', pick: 2, from: 9, jackpot: 'CA$100', draw: 'Daily', note: 'Numbers 0-9' },
      { name: 'Pick 3', pick: 3, from: 9, jackpot: 'CA$500', draw: 'Daily', note: 'Numbers 0-9' },
      { name: 'Pick 4', pick: 4, from: 9, jackpot: 'CA$5,000', draw: 'Daily', note: 'Numbers 0-9' },
    ],
  },
  uk: {
    flag: '🇬🇧',
    label: 'United Kingdom',
    games: [
      { name: 'National Lottery Lotto', pick: 6, from: 59, bonusPick: 1, bonusFrom: 59, bonusLabel: 'Bonus Ball', jackpot: '£4M+', draw: 'Wed, Sat' },
      { name: 'EuroMillions', pick: 5, from: 50, bonusPick: 2, bonusFrom: 12, bonusLabel: 'Lucky Stars', jackpot: '€17M+', draw: 'Tue, Fri' },
      { name: 'Thunderball', pick: 5, from: 39, bonusPick: 1, bonusFrom: 14, bonusLabel: 'Thunderball', jackpot: '£500,000', draw: 'Tue, Wed, Fri, Sat' },
      { name: 'Set For Life', pick: 5, from: 47, bonusPick: 1, bonusFrom: 10, bonusLabel: 'Life Ball', jackpot: '£10,000/month', draw: 'Mon, Thu' },
      { name: 'Health Lottery', pick: 5, from: 50, jackpot: '£100,000', draw: 'Sat' },
    ],
  },
  au: {
    flag: '🇦🇺',
    label: 'Australia',
    games: [
      { name: 'Saturday Lotto / Tattslotto', pick: 6, from: 45, bonusPick: 2, bonusFrom: 45, bonusLabel: 'Supplementary', jackpot: 'AU$5M+', draw: 'Sat' },
      { name: 'Oz Lotto', pick: 7, from: 47, bonusPick: 2, bonusFrom: 47, bonusLabel: 'Supplementary', jackpot: 'AU$2M+', draw: 'Tue' },
      { name: 'Powerball AU', pick: 7, from: 35, bonusPick: 1, bonusFrom: 20, bonusLabel: 'Powerball', jackpot: 'AU$3M+', draw: 'Thu' },
      { name: 'Monday & Wednesday Lotto', pick: 6, from: 45, bonusPick: 2, bonusFrom: 45, bonusLabel: 'Supplementary', jackpot: 'AU$1M', draw: 'Mon, Wed' },
      { name: 'Set for Life AU', pick: 8, from: 37, bonusPick: 1, bonusFrom: 37, bonusLabel: 'Bonus', jackpot: 'AU$20,000/month', draw: 'Daily' },
    ],
  },
}

function pickRandom(count: number, max: number, isDigit = false): number[] {
  if (isDigit) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max + 1)))
  }
  const pool = Array.from({ length: max }, (_, i) => i + 1)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count).sort((a, b) => a - b)
}

interface Result {
  main: number[]
  bonus?: number[]
}

export default function LottoNumberGenerator() {
  const [country, setCountry] = useState('ph')
  const [gameIndex, setGameIndex] = useState(0)
  const [sets, setSets] = useState(1)
  const [results, setResults] = useState<Result[]>([])
  const [toast, setToast] = useState(false)

  const countryData = COUNTRIES[country]
  const game = countryData.games[gameIndex]
  const isDigit = game.note?.includes('0-9')

  const generate = () => {
    const newResults: Result[] = []
    for (let i = 0; i < sets; i++) {
      const main = pickRandom(game.pick, game.from, isDigit)
      let bonus: number[] | undefined
      if (game.bonusPick && game.bonusFrom) {
        bonus = pickRandom(game.bonusPick, game.bonusFrom, isDigit)
      }
      newResults.push({ main, bonus })
    }
    setResults(newResults)
  }

  const copyAll = () => {
    const text = results.map((r, i) =>
      `Set ${i + 1}: ${r.main.join(' - ')}${r.bonus ? ` | ${game.bonusLabel}: ${r.bonus.join(' - ')}` : ''}`
    ).join('\n')
    navigator.clipboard.writeText(text)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const copyOne = (r: Result, i: number) => {
    const text = `${r.main.join(' - ')}${r.bonus ? ` | ${game.bonusLabel}: ${r.bonus.join(' - ')}` : ''}`
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Lotto Number <span>Generator</span></h1>
        <p>Generate random lucky lotto numbers for Philippines, USA, Canada, UK, and Australia. Covers all major lottery games. Free, instant, no signup.</p>
      </div>

      <div className="tool-box fade-up-2">
        {/* Country selector */}
        <label className="tool-label">Select Country</label>
        <div className="options-row">
          {Object.entries(COUNTRIES).map(([key, c]) => (
            <button
              key={key}
              className={`opt-btn ${country === key ? 'active' : ''}`}
              onClick={() => { setCountry(key); setGameIndex(0); setResults([]) }}
            >
              {c.flag} {key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Game selector */}
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Select Game — {countryData.label}</label>
          <div className="options-row">
            {countryData.games.map((g, i) => (
              <button
                key={i}
                className={`opt-btn ${gameIndex === i ? 'active' : ''}`}
                onClick={() => { setGameIndex(i); setResults([]) }}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Game info */}
        <div style={{
          marginTop:'1rem',
          padding:'0.85rem 1rem',
          background:'var(--bg)',
          border:'1px solid var(--border)',
          borderRadius:'8px',
          display:'flex', flexWrap:'wrap', gap:'0.75rem',
          fontSize:'0.78rem', color:'var(--text-dim)',
        }}>
          <span>🎯 Pick <strong style={{color:'var(--gold)'}}>{game.pick}</strong> from <strong style={{color:'var(--gold)'}}>{game.from}</strong>{isDigit ? ' (0-9)' : ''}</span>
          {game.bonusPick && <span>➕ {game.bonusLabel}: <strong style={{color:'var(--gold)'}}>{game.bonusPick}</strong> from <strong style={{color:'var(--gold)'}}>{game.bonusFrom}</strong></span>}
          {game.jackpot && <span>💰 Jackpot: <strong style={{color:'var(--gold)'}}>{game.jackpot}</strong></span>}
          {game.draw && <span>📅 Draw: <strong style={{color:'var(--gold)'}}>{game.draw}</strong></span>}
        </div>

        {/* Number of sets */}
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Number of Sets: <span style={{color:'var(--gold)'}}>{sets}</span></label>
          <input
            type="range" min={1} max={10} value={sets}
            onChange={e => setSets(Number(e.target.value))}
            style={{width:'100%', accentColor:'var(--gold)', cursor:'pointer', marginTop:'0.5rem'}}
          />
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'var(--text-dim)'}}>
            <span>1</span><span>10</span>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={generate}>🎰 Generate Numbers</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{marginTop:'1.5rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>{results.length} Set{results.length > 1 ? 's' : ''} — {game.name}</label>
              <button className="btn btn-ghost btn-sm" onClick={generate}>Regenerate</button>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
              {results.map((r, i) => (
                <div
                  key={i}
                  onClick={() => copyOne(r, i)}
                  style={{
                    background:'var(--bg)', border:'1px solid var(--border)',
                    borderRadius:'10px', padding:'1rem 1.25rem',
                    cursor:'pointer', transition:'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-dim)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: r.bonus ? '0.5rem' : '0'}}>
                    <span style={{fontSize:'0.7rem', color:'var(--text-dim)', letterSpacing:'0.08em', textTransform:'uppercase'}}>Set {i + 1}</span>
                    <span style={{fontSize:'0.65rem', color:'var(--text-dim)'}}>Click to copy</span>
                  </div>

                  {/* Main numbers */}
                  <div style={{display:'flex', flexWrap:'wrap', gap:'0.4rem'}}>
                    {r.main.map((n, j) => (
                      <span key={j} style={{
                        width:'42px', height:'42px',
                        background:'var(--gold-glow)',
                        border:'1px solid var(--gold-dim)',
                        borderRadius:'50%',
                        display:'inline-flex', alignItems:'center', justifyContent:'center',
                        fontFamily:'Syne, sans-serif', fontWeight:'800',
                        fontSize: n > 99 ? '0.7rem' : '0.9rem',
                        color:'var(--gold)',
                      }}>{n}</span>
                    ))}
                  </div>

                  {/* Bonus numbers */}
                  {r.bonus && (
                    <div style={{marginTop:'0.5rem', display:'flex', alignItems:'center', gap:'0.4rem'}}>
                      <span style={{fontSize:'0.7rem', color:'var(--text-dim)', whiteSpace:'nowrap'}}>{game.bonusLabel}:</span>
                      {r.bonus.map((n, j) => (
                        <span key={j} style={{
                          width:'36px', height:'36px',
                          background:'rgba(239,68,68,0.1)',
                          border:'1px solid rgba(239,68,68,0.4)',
                          borderRadius:'50%',
                          display:'inline-flex', alignItems:'center', justifyContent:'center',
                          fontFamily:'Syne, sans-serif', fontWeight:'800',
                          fontSize:'0.85rem', color:'#ef4444',
                        }}>{n}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADSENSE SLOT */}

      <div className="seo-content fade-up-3">
        <h2>Free Lotto Number Generator — All Countries</h2>
        <p>Our lotto number generator creates truly random lucky numbers for all major lottery games across the Philippines, United States, Canada, United Kingdom, and Australia. Whether you play PCSO 6/55, US Powerball, Canadian Lotto Max, UK National Lottery, or Australian Oz Lotto — we have you covered.</p>
        <h2>Philippines PCSO Lottery Numbers</h2>
        <p>We support all PCSO games including Ultra Lotto 6/58, Grand Lotto 6/55, Superlotto 6/49, Megalotto 6/45, Lotto 6/42, 4D Lotto, EZ2, and Swertres. Generate quick pick numbers for any draw day — Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday depending on the game.</p>
        <h2>Are Random Numbers Lucky?</h2>
        <p>Every lottery draw is completely random, so any combination of numbers has an equal chance of winning. Using a random number generator gives you the same odds as picking numbers manually — but saves you time and removes any personal bias. Many jackpot winners have used quick pick random numbers. Generate your lucky set now and good luck!</p>
      </div>

      <RelatedTools current="/lotto-number-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Numbers copied!</div>
    </main>
  )
}
