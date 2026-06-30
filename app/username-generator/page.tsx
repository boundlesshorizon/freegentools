'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const ADJECTIVES = ['Shadow','Neon','Cosmic','Digital','Savage','Silent','Blazing','Dark','Storm','Ghost','Iron','Cyber','Rogue','Wild','Arctic','Toxic','Hyper','Ultra','Mega','Epic']
const NOUNS = ['Wolf','Blade','Hunter','Dragon','Phoenix','Viper','Falcon','Titan','Storm','Ghost','Nova','Byte','Pixel','Cipher','Nexus','Pulse','Vector','Ninja','Shark','Eagle']
const SUFFIXES = ['X','Pro','GG','XD','420','99','777','0','1','HD','Official','YT','PH']

const STYLES = [{id:'gamer',label:'🎮 Gamer'},{id:'cool',label:'😎 Cool'},{id:'cute',label:'🌸 Cute'},{id:'random',label:'🎲 Random'}]
const CUTE_PREFIXES = ['tiny','lil','mini','sweet','soft','baby','cute','lovely']
const CUTE_NOUNS = ['bunny','kitty','star','moon','cloud','petal','bloom','cookie']

function generate(style: string, keyword: string, count = 12): string[] {
  const k = keyword.toLowerCase().replace(/\s+/g, '')
  const out: string[] = []
  const used = new Set<string>()
  const rand = <T,>(a: T[]) => a[Math.floor(Math.random()*a.length)]

  for (let i = 0; i < 60 && out.length < count; i++) {
    const adj = rand(ADJECTIVES), noun = rand(NOUNS), suf = rand(SUFFIXES), num = Math.floor(Math.random()*9999)
    const cpfx = rand(CUTE_PREFIXES), cnoun = rand(CUTE_NOUNS)
    let name = ''
    if (style === 'gamer') {
      const p = k ? [`${k}${adj}`,`${adj}${k}`,`x${k}x`,`${k}${num}`,`${k}${suf}`] : [`${adj}${noun}`,`${adj}${noun}${num}`,`x${adj}${noun}x`,`${noun}${suf}`]
      name = rand(p)
    } else if (style === 'cool') {
      const p = k ? [`${adj}${k}`,`${k}${noun}`,`_${k}_`,`${k}${num%999}`] : [`${adj}${noun}`,`${adj}${noun}${num%999}`]
      name = rand(p)
    } else if (style === 'cute') {
      const p = k ? [`${cpfx}_${k}`,`${k}_${cnoun}`,`${k}chan`] : [`${cpfx}_${cnoun}`,`${cnoun}${cpfx}`]
      name = rand(p)
    } else {
      const p = [`${adj}${noun}${num%1000}`,`${noun}${adj}`, k ? `${k}${num}` : `${adj}${num}`]
      name = rand(p)
    }
    name = name.toLowerCase()
    if (name.length >= 4 && name.length <= 20 && !used.has(name)) { used.add(name); out.push(name) }
  }
  return out.slice(0, count)
}

export default function UsernameGenerator() {
  const [style, setStyle] = useState('gamer')
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState('')

  const gen = () => setResults(generate(style, keyword))
  const copy = (u: string) => { navigator.clipboard.writeText(u); setToast(u); setTimeout(() => setToast(''), 1500) }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Username <span>Generator</span></h1>
        <p>Generate unique, creative usernames for gaming, social media, and online profiles. Add a keyword to personalize.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Username Style</label>
        <div className="options-row">{STYLES.map(s => <button key={s.id} className={`opt-btn ${style===s.id?'active':''}`} onClick={() => setStyle(s.id)}>{s.label}</button>)}</div>
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Keyword (Optional)</label>
          <input type="text" placeholder="e.g. your name, hobby..." value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
        <div className="btn-row"><button className="btn" onClick={gen}>Generate Usernames</button></div>
        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <label className="tool-label">Click to Copy</label>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'0.5rem'}}>
              {results.map((u, i) => (
                <div key={i} className="fancy-item" onClick={() => copy(u)}>
                  <span style={{fontFamily:'monospace', fontSize:'0.85rem'}}>@{u}</span>
                  <button className="copy-btn">COPY</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free Username Generator</h2>
        <p>Finding a unique username is harder than ever. Our generator creates available combinations for gaming, TikTok, Instagram, and more.</p>
      </div>
      <RelatedTools current="/username-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Copied: @{toast}</div>
    </main>
  )
}
