'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const ADJECTIVES = ['Shadow','Neon','Cosmic','Digital','Savage','Silent','Blazing','Dark','Storm','Ghost','Iron','Cyber','Rogue','Wild','Arctic','Toxic','Hyper','Ultra','Mega','Epic','Stellar','Void','Eternal','Rapid','Turbo','Phantom','Chaos','Apex','Prime','Zero']
const NOUNS = ['Wolf','Blade','Hunter','Dragon','Phoenix','Viper','Falcon','Titan','Storm','Ghost','Nova','Byte','Pixel','Cipher','Nexus','Pulse','Vector','Specter','Wraith','Ninja','Shark','Eagle','Hawk','Fox','Lion','Bear','Crow','Raven','Cobra','Mantis']
const SUFFIXES = ['X','Pro','GG','XD','420','69','777','99','0','1','2','3','404','999','HD','Official','Real','YT','TV','PH']

const STYLES = [
  { id: 'gamer', label: '🎮 Gamer' },
  { id: 'professional', label: '💼 Professional' },
  { id: 'cute', label: '🌸 Cute' },
  { id: 'random', label: '🎲 Random' },
]

const CUTE_PREFIXES = ['tiny','lil','mini','sweet','soft','fluffy','baby','cute','lovely','pretty']
const CUTE_NOUNS = ['bunny','kitty','star','moon','cloud','petal','bloom','cookie','mochi','boba','sakura','honey','sugar','angel','rose']

function generateUsernames(style: string, keyword: string, count: number = 10): string[] {
  const usernames: string[] = []
  const kw = keyword.toLowerCase().replace(/\s+/g, '')

  for (let i = 0; i < count * 3 && usernames.length < count; i++) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
    const suf = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]
    const num = Math.floor(Math.random() * 9999)
    const cutePfx = CUTE_PREFIXES[Math.floor(Math.random() * CUTE_PREFIXES.length)]
    const cuteNoun = CUTE_NOUNS[Math.floor(Math.random() * CUTE_NOUNS.length)]

    let name = ''
    const r = Math.random()

    if (style === 'gamer') {
      if (kw) {
        const patterns = [`${kw}${adj}`, `${adj}${kw}`, `${kw}_${noun}`, `x${kw}x`, `${kw}${num}`, `${kw}${suf}`, `${adj}${kw}${num}`]
        name = patterns[Math.floor(Math.random() * patterns.length)]
      } else {
        const patterns = [
          `${adj}${noun}`, `${adj}${noun}${num}`, `${adj}${noun}${suf}`,
          `x${adj}${noun}x`, `${adj}_${noun}`, `${noun}${suf}`, `${adj}${noun}GG`
        ]
        name = patterns[Math.floor(Math.random() * patterns.length)]
      }
    } else if (style === 'professional') {
      const first = ['Alex','Sam','Jordan','Casey','Morgan','Riley','Taylor','Jamie']
      const last = ['Smith','Jones','Lee','Park','Cruz','Kim','Chen','Santos']
      const fn = first[Math.floor(Math.random() * first.length)]
      const ln = last[Math.floor(Math.random() * last.length)]
      const patterns = kw
        ? [`${kw}.official`, `${kw}pro`, `the.${kw}`, `${kw}.${ln.toLowerCase()}`]
        : [`${fn}${ln}`, `${fn}.${ln}`, `${fn}${ln}${num % 100}`, `${fn}_${ln}`]
      name = patterns[Math.floor(Math.random() * patterns.length)]
    } else if (style === 'cute') {
      const patterns = kw
        ? [`${cutePfx}_${kw}`, `${kw}_${cuteNoun}`, `${kw}chan`, `${kw}${cuteNoun}`]
        : [`${cutePfx}_${cuteNoun}`, `${cuteNoun}${cutePfx}`, `${cutePfx}${cuteNoun}${num % 100}`, `_${cuteNoun}_`]
      name = patterns[Math.floor(Math.random() * patterns.length)]
    } else {
      const patterns = [
        `${adj}${noun}${num % 1000}`,
        `${noun}${adj}`,
        kw ? `${kw}${num}` : `${adj}${num}`,
        `${noun}_${num % 100}`,
      ]
      name = patterns[Math.floor(Math.random() * patterns.length)]
    }

    name = name.toLowerCase()
    if (name.length >= 4 && name.length <= 20 && !usernames.includes(name)) {
      usernames.push(name)
    }
  }
  return usernames
}

export default function UsernameGenerator() {
  const [style, setStyle] = useState('gamer')
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState('')

  const gen = () => setResults(generateUsernames(style, keyword))

  const copy = (u: string) => {
    navigator.clipboard.writeText(u)
    setToast(u)
    setTimeout(() => setToast(''), 1500)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Username <span>Generator</span></h1>
        <p>Generate unique, creative usernames for gaming, social media, TikTok, Instagram, and online profiles. Add a keyword to personalize.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Username Style</label>
        <div className="options-row">
          {STYLES.map(s => (
            <button
              key={s.id}
              className={`opt-btn ${style === s.id ? 'active' : ''}`}
              onClick={() => setStyle(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Keyword (Optional)</label>
          <input
            type="text"
            placeholder="e.g. your name, hobby, favorite word..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <div className="btn-row">
          <button className="btn" onClick={gen}>Generate Usernames</button>
        </div>

        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <label className="tool-label">Generated Usernames — Click to Copy</label>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'0.5rem'}}>
              {results.map((u, i) => (
                <div
                  key={i}
                  className="fancy-item"
                  onClick={() => copy(u)}
                  style={{cursor:'pointer'}}
                >
                  <span style={{fontFamily:'DM Mono, monospace', fontSize:'0.85rem'}}>@{u}</span>
                  <button className="copy-btn">COPY</button>
                </div>
              ))}
            </div>
            <div className="btn-row" style={{marginTop:'1rem'}}>
              <button className="btn btn-ghost btn-sm" onClick={gen}>Regenerate</button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Username Generator for Any Platform</h2>
        <p>Finding a good username that isn't already taken is harder than ever. Our username generator creates unique combinations that are available on most platforms. Whether you play Mobile Legends, Free Fire, Roblox, Valorant, or use TikTok and Instagram, we have a style that works.</p>
        <h2>How to Pick a Good Username</h2>
        <p>A good username is short, memorable, and reflects your personality or brand. Keep it under 15 characters when possible. Avoid random numbers at the end if you can — they look generic. Using a keyword you care about makes the username more personal and easier to remember.</p>
        <h2>Username Tips for Filipino Gamers and Content Creators</h2>
        <p>Filipino gamers often combine English words with Filipino flair. Try adding your favorite Filipino word as the keyword for a unique combination. For content creators, a consistent username across TikTok, Facebook, and Instagram helps your audience find you easily.</p>
      </div>

      <RelatedTools current="/username-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied: @{toast}</div>
    </main>
  )
}
