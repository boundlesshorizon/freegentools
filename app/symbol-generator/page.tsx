'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const CATEGORIES: Record<string, string[]> = {
  'Stars & Sparkles': ['★','☆','✦','✧','✨','✩','✪','✫','✬','✭','✮','✯','✰','⭐','🌟','💫','⋆','✺','✻','✼','❋','✽','✾','✿','❀','❁','❂','❃','❄','❅','❆'],
  'Arrows': ['→','←','↑','↓','↔','↕','➜','➝','➞','➟','➠','➡','⬅','⬆','⬇','⬈','⬉','⬊','⬋','⇒','⇐','⇑','⇓','⟶','⟵','↩','↪','↻','↺','⟳','⟲'],
  'Hearts': ['♥','♡','❤','❥','❣','💕','💞','💓','💗','💖','💘','💝','💟','❦','🖤','🤍','💛','💚','💙','💜','🧡','❤️‍🔥'],
  'Currency': ['$','€','£','¥','₹','₩','₪','₫','₭','₮','₯','₰','₱','₲','₳','₴','₵','₸','₺','₻','₼','₽','₾','¢','¤'],
  'Math': ['∞','±','×','÷','≠','≈','≤','≥','∑','∏','√','∛','∜','∂','∫','∮','∆','∇','⊕','⊗','⊙','∈','∉','⊂','⊃','∪','∩','∀','∃'],
  'Shapes': ['●','○','◉','◎','◯','■','□','▪','▫','▬','▲','△','▼','▽','◆','◇','◈','◊','⬟','⬡','⬢','⬣','⬤','⬥','⬦','⬧','⬨','⬩','⬪','⬫'],
  'Music': ['♩','♪','♫','♬','♭','♮','♯','𝄞','𝄢','🎵','🎶','🎸','🎹','🎺','🎻','🥁','🎷','🎼','🎤','🎧'],
  'Punctuation+': ['©','®','™','°','±','·','…','‹','›','«','»','‽','⁈','⁉','‼','¡','¿','§','¶','†','‡','※','⁂','⸮','⁀'],
  'Zodiac': ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎'],
  'Chess & Cards': ['♔','♕','♖','♗','♘','♙','♚','♛','♜','♝','♞','♟','♠','♣','♥','♦'],
  'Decorative': ['꧁','꧂','『','』','【','】','〖','〗','〔','〕','《','》','〈','〉','｛','｝','❮','❯','⟨','⟩','⦃','⦄'],
}

export default function SymbolGenerator() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('Stars & Sparkles')
  const [toast, setToast] = useState('')

  const copy = (sym: string) => {
    navigator.clipboard.writeText(sym)
    setToast(sym)
    setTimeout(() => setToast(''), 1500)
  }

  const filtered = search ? Object.values(CATEGORIES).flat().filter(s => s.includes(search)) : CATEGORIES[active] || []

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Symbol <span>Generator</span></h1>
        <p>Browse 500+ symbols, special characters, arrows, shapes, and Unicode art. Click any symbol to copy it instantly.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Search Symbols</label>
        <input type="text" placeholder="Search or browse categories below..." value={search} onChange={e => setSearch(e.target.value)} />
        {!search && (
          <div className="options-row" style={{marginTop:'1rem'}}>
            {Object.keys(CATEGORIES).map(cat => (
              <button key={cat} className={`opt-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>{cat}</button>
            ))}
          </div>
        )}
        <div className="symbol-grid" style={{marginTop:'1rem'}}>
          {filtered.map((sym, i) => (
            <div key={i} className="symbol-item" onClick={() => copy(sym)} title={`Copy ${sym}`}>{sym}</div>
          ))}
        </div>
        <p style={{marginTop:'1rem', fontSize:'0.75rem', color:'var(--text-dim)'}}>Click any symbol to copy it to your clipboard.</p>
      </div>
      <div className="seo-content fade-up-3">
        <h2>What is a Symbol Generator?</h2>
        <p>Our symbol generator lets you browse and copy hundreds of special Unicode characters and decorative text elements. These symbols work on all major platforms including Facebook, Instagram, TikTok, Discord, and WhatsApp.</p>
        <h2>How to Use</h2>
        <p>Click any symbol to copy it to your clipboard, then paste it anywhere — in your bio, posts, messages, or documents. No special software needed.</p>
      </div>
      <RelatedTools current="/symbol-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Copied: {toast}</div>
    </main>
  )
}
