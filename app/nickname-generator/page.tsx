'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const STYLES = [
  { id: 'cute', label: '🌸 Cute' },
  { id: 'cool', label: '😎 Cool' },
  { id: 'gamer', label: '🎮 Gamer' },
  { id: 'funny', label: '😂 Funny' },
  { id: 'baddie', label: '💅 Baddie' },
  { id: 'pinoy', label: '🇵🇭 Pinoy' },
]

const CUTE_PRE = ['baby','lil','tiny','soft','sweet','little','mini','precious','angel','sugar']
const CUTE_SUF = ['bear','bunny','pie','cake','star','moon','love','heart','boo','puff','kins','belle','babe','bug']
const COOL_PRE = ['dark','shadow','storm','night','ice','iron','steel','black','silent','ghost']
const COOL_SUF = ['blade','wolf','viper','hawk','rex','stone','fire','rage','lord','king','zero','edge']
const GAMER_PRE = ['x','xx','pro','epic','hyper','ultra','mega','god','noob','gg']
const GAMER_SUF = ['gg','pro','xd','420','999','777','360','pwn','snipe','rush']
const FUNNY_PRE = ['sir','captain','lord','master','professor','doctor','king','queen','chief','general']
const FUNNY_SUF = ['pants','face','brain','boots','nose','butt','nugget','pickle','potato','noodle','taco','waffle']
const BADDIE_PRE = ['boss','bad','savage','slay','queen','vibe','glam','rich','luxury','elite']
const BADDIE_SUF = ['babe','boss','queen','chic','diva','slay','luxe','glam','vibes','era']
const PINOY_PRE = ['pre','bro','kuya','ate','bes','mars','pare','chong','dong','tsup']
const PINOY_SUF = ['ko','mo','nyo','lang','daw','raw','ba','ha','oy','ay']

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

function generate(name: string, style: string, count = 12): string[] {
  const n = name.trim().toLowerCase().replace(/\s+/g, '')
  const nicknames: string[] = []
  const used = new Set<string>()

  const add = (nick: string) => {
    if (!used.has(nick) && nick.length >= 3) {
      used.add(nick)
      nicknames.push(nick)
    }
  }

  const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

  for (let i = 0; i < 60 && nicknames.length < count; i++) {
    let nick = ''
    const r = Math.random()

    if (style === 'cute') {
      const pre = rand(CUTE_PRE), suf = rand(CUTE_SUF)
      const patterns = n
        ? [`${pre}${capitalize(n)}`, `${capitalize(n)}${suf}`, `${pre}${capitalize(n)}${suf}`, `lil${capitalize(n)}`, `${capitalize(n)}bear`, `${capitalize(n)}boo`]
        : [`${pre}${capitalize(suf)}`, `${capitalize(pre)}${suf}`, `${capitalize(pre)}${capitalize(suf)}`]
      nick = rand(patterns)
    } else if (style === 'cool') {
      const pre = rand(COOL_PRE), suf = rand(COOL_SUF)
      const num = Math.floor(Math.random() * 999)
      const patterns = n
        ? [`${capitalize(pre)}${capitalize(n)}`, `${capitalize(n)}${capitalize(suf)}`, `${capitalize(pre)}${capitalize(n)}${num}`, `_${n}_`, `${n}${capitalize(suf)}`]
        : [`${capitalize(pre)}${capitalize(suf)}`, `${capitalize(pre)}${capitalize(suf)}${num}`]
      nick = rand(patterns)
    } else if (style === 'gamer') {
      const pre = rand(GAMER_PRE), suf = rand(GAMER_SUF)
      const num = Math.floor(Math.random() * 9999)
      const patterns = n
        ? [`${pre}${n}`, `${n}${suf}`, `x${n}x`, `${n}${num}`, `${pre}_${n}`, `${n}_${suf}`, `${pre}${capitalize(n)}`]
        : [`${pre}Player${num}`, `gamer${num}`, `xX${num}Xx`]
      nick = rand(patterns)
    } else if (style === 'funny') {
      const pre = rand(FUNNY_PRE), suf = rand(FUNNY_SUF)
      const patterns = n
        ? [`${capitalize(pre)} ${capitalize(n)}`, `${capitalize(n)} ${capitalize(suf)}`, `Captain ${capitalize(n)}`, `Professor ${capitalize(n)}`, `Lord ${capitalize(n)}${capitalize(suf)}`]
        : [`${capitalize(pre)} ${capitalize(suf)}`, `Captain ${capitalize(suf)}`, `Lord ${capitalize(pre)}${capitalize(suf)}`]
      nick = rand(patterns)
    } else if (style === 'baddie') {
      const pre = rand(BADDIE_PRE), suf = rand(BADDIE_SUF)
      const patterns = n
        ? [`${capitalize(pre)}${capitalize(n)}`, `${capitalize(n)}${capitalize(suf)}`, `The${capitalize(n)}`, `${capitalize(n)}Era`, `${capitalize(n)}Slay`]
        : [`${capitalize(pre)}${capitalize(suf)}`, `Boss${capitalize(suf)}`, `Slay${capitalize(pre)}`]
      nick = rand(patterns)
    } else if (style === 'pinoy') {
      const pre = rand(PINOY_PRE), suf = rand(PINOY_SUF)
      const patterns = n
        ? [`${capitalize(n)}${suf}`, `${pre}${capitalize(n)}`, `${capitalize(n)}Lang`, `Si${capitalize(n)}`, `${capitalize(n)}Kasi`, `Ate${capitalize(n)}`, `Kuya${capitalize(n)}`]
        : [`${capitalize(pre)}${capitalize(suf)}`, `${capitalize(pre)}Lang`, `SiGanito`]
      nick = rand(patterns)
    }

    add(nick)
  }

  return nicknames.slice(0, count)
}

export default function NicknameGenerator() {
  const [name, setName] = useState('')
  const [style, setStyle] = useState('cute')
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState('')

  const gen = () => setResults(generate(name, style))

  const copy = (n: string) => {
    navigator.clipboard.writeText(n)
    setToast(n)
    setTimeout(() => setToast(''), 1500)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Nickname <span>Generator</span></h1>
        <p>Generate fun, creative nicknames for social media, gaming, chat groups, and friends. Enter a name or leave blank for random results.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Your Name or Keyword (Optional)</label>
        <input
          type="text"
          placeholder="e.g. Christian, gamer, bestie..."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Nickname Style</label>
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
        </div>

        <div className="btn-row">
          <button className="btn" onClick={gen}>Generate Nicknames</button>
        </div>

        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <label className="tool-label">Generated Nicknames — Click to Copy</label>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'0.5rem'}}>
              {results.map((nick, i) => (
                <div key={i} className="fancy-item" onClick={() => copy(nick)} style={{cursor:'pointer'}}>
                  <span style={{fontSize:'0.9rem'}}>{nick}</span>
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
        <h2>Free Nickname Generator for Any Vibe</h2>
        <p>Whether you need a cute nickname for your best friend, a cool gamer tag, a funny group chat name, or a Pinoy-style banter nickname — our generator has you covered. Enter any name or keyword to personalize your results, or leave it blank for fully random nicknames.</p>
        <h2>Pinoy Nickname Culture</h2>
        <p>Filipinos are famous for creative, affectionate nicknames. From doubling syllables (e.g. "Nene", "Bobot") to adding "oy", "ay", and "ko" endings — Pinoy nicknames are unique. Our Pinoy style generates nicknames that feel natural in Filipino barkada culture and group chats.</p>
        <h2>Best Nicknames for Social Media</h2>
        <p>A good social media nickname should be short, easy to remember, and reflect your personality. Use our cute style for TikTok and Instagram, the cool or gamer style for Discord and gaming platforms, and the baddie style for confident, trendy vibes. Copy your favorite and start using it today.</p>
      </div>

      <RelatedTools current="/nickname-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied: {toast}</div>
    </main>
  )
}
