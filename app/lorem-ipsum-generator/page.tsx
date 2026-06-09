'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','est','laborum','vestibulum','ante','dictum','primis','faucibus','orci','luctus','ultrices','posuere','cubilia','curae','proin','vel','ante','volutpat','convallis','viverra','metus','laoreet','curabitur','pulvinar','ligula','condimentum','accumsan','cursus','purus','nullam','quis','risus']

function makeSentence() {
  const len = 8 + Math.floor(Math.random() * 12)
  const words = Array.from({length: len}, () => WORDS[Math.floor(Math.random() * WORDS.length)])
  words[0] = words[0][0].toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function makeParagraph(sentences: number) {
  return Array.from({length: sentences}, makeSentence).join(' ')
}

function generate(type: string, count: number) {
  switch (type) {
    case 'paragraphs':
      return Array.from({length: count}, () => makeParagraph(4 + Math.floor(Math.random() * 4))).join('\n\n')
    case 'sentences':
      return Array.from({length: count}, makeSentence).join(' ')
    case 'words':
      return Array.from({length: count}, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ')
    default:
      return ''
  }
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [toast, setToast] = useState(false)

  const gen = () => {
    let text = generate(type, count)
    if (startWithLorem && type === 'paragraphs') {
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n' + text.split('\n\n').slice(1).join('\n\n')
    }
    setOutput(text)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const TYPES = [
    { id: 'paragraphs', label: 'Paragraphs' },
    { id: 'sentences', label: 'Sentences' },
    { id: 'words', label: 'Words' },
  ]

  const maxCount = type === 'paragraphs' ? 20 : type === 'sentences' ? 50 : 200

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Lorem Ipsum <span>Generator</span></h1>
        <p>Generate placeholder text for your design mockups, website layouts, and development projects. Instantly customizable.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Generate</label>
        <div style={{display:'flex', gap:'0.75rem', alignItems:'center', flexWrap:'wrap'}}>
          <input
            type="number"
            min={1} max={maxCount}
            value={count}
            onChange={e => setCount(Math.min(maxCount, Math.max(1, Number(e.target.value))))}
            style={{width:'80px'}}
          />
          <div className="options-row" style={{margin:0}}>
            {TYPES.map(t => (
              <button
                key={t.id}
                className={`opt-btn ${type === t.id ? 'active' : ''}`}
                onClick={() => setType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {type === 'paragraphs' && (
          <div style={{marginTop:'0.75rem', display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer'}} onClick={() => setStartWithLorem(s => !s)}>
            <div style={{
              width:'16px', height:'16px',
              border:`1px solid ${startWithLorem ? 'var(--gold-dim)' : 'var(--border)'}`,
              borderRadius:'3px',
              background: startWithLorem ? 'var(--gold-glow)' : 'transparent',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'0.7rem', color:'var(--gold)',
            }}>
              {startWithLorem ? '✓' : ''}
            </div>
            <span style={{fontSize:'0.8rem', color:'var(--text-dim)'}}>Start with "Lorem ipsum dolor sit amet..."</span>
          </div>
        )}

        <div className="btn-row">
          <button className="btn" onClick={gen}>Generate</button>
          {output && <button className="btn btn-ghost" onClick={copy}>Copy All</button>}
        </div>

        {output && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>Generated Text</label>
              <span style={{fontSize:'0.72rem', color:'var(--text-dim)'}}>
                {output.trim().split(/\s+/).length} words
              </span>
            </div>
            <div className="output-box" style={{maxHeight:'300px', overflowY:'auto', lineHeight:'1.8', fontSize:'0.82rem', color:'var(--text-dim)'}}>
              {output}
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>What is Lorem Ipsum?</h2>
        <p>Lorem ipsum is placeholder text commonly used in the graphic design, web design, and publishing industries. It allows designers and developers to create visual mockups with realistic-looking text before the actual content is ready. The text is derived from a work by Cicero, scrambled to make it unreadable as actual Latin.</p>
        <h2>When Do You Use Lorem Ipsum?</h2>
        <p>Web designers use lorem ipsum when building website layouts to show how text will look without being distracted by the actual content. Graphic designers use it in presentations, brochures, and mockups. Developers use it to populate database fields and test text rendering in applications.</p>
        <h2>How to Use This Generator</h2>
        <p>Select whether you want paragraphs, sentences, or words, then enter how many you need. Click Generate to instantly produce your placeholder text, then click Copy All to copy it to your clipboard. Paste it directly into Figma, Photoshop, WordPress, or any other tool.</p>
      </div>

      <RelatedTools current="/lorem-ipsum-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
