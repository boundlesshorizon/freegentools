'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const HASHTAG_DB: Record<string, string[]> = {
  food: ['#food','#foodie','#foodporn','#instafood','#yummy','#delicious','#foodstagram','#pinoyfoodie','#streetfood','#asianfood'],
  travel: ['#travel','#travelphotography','#wanderlust','#adventure','#explore','#travelph','#palawan','#cebu','#siargao','#baguio'],
  fitness: ['#fitness','#gym','#workout','#fitnessmotivation','#health','#gymlife','#fitfam','#fitnessgoals','#cardio','#crossfit'],
  fashion: ['#fashion','#style','#ootd','#outfit','#fashionista','#streetstyle','#pinayootd','#filipinafashion','#manila','#lazada'],
  gaming: ['#gaming','#gamer','#mobilelegends','#freefire','#esportsph','#pinoygamer','#valorant','#codmobile','#streamer','#twitch'],
  business: ['#business','#entrepreneur','#negosyo','#ofw','#sidehustle','#onlineselling','#shopee','#pinoyentrepreneur','#hustle','#freelancer'],
  tiktok: ['#fyp','#foryou','#foryoupage','#viral','#trending','#tiktokph','#fypph','#viralph','#pinoy','#trendingph'],
  beauty: ['#beauty','#makeup','#skincare','#glowup','#pinaybeauty','#skincareroutine','#mua','#filipinobeauty','#glow','#beautyph'],
}

const CATEGORIES = Object.keys(HASHTAG_DB)

function generateHashtags(topics: string[], keyword: string): string[] {
  const tags = new Set<string>()
  topics.forEach(t => (HASHTAG_DB[t] || []).forEach(h => tags.add(h)))
  if (keyword.trim()) {
    const kw = keyword.trim().toLowerCase().replace(/\s+/g, '')
    tags.add(`#${kw}`); tags.add(`#${kw}ph`); tags.add(`#${kw}philippines`); tags.add(`#${kw}lover`); tags.add(`#${kw}community`)
  }
  const arr = Array.from(tags)
  for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]] }
  return arr.slice(0, 30)
}

export default function HashtagGenerator() {
  const [selected, setSelected] = useState<string[]>(['tiktok'])
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState(false)

  const toggle = (cat: string) => setSelected(s => s.includes(cat) ? s.filter(x => x !== cat) : [...s, cat])
  const gen = () => setResults(generateHashtags(selected, keyword))
  const copyAll = () => { navigator.clipboard.writeText(results.join(' ')); setToast(true); setTimeout(() => setToast(false), 2000) }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Hashtag <span>Generator</span></h1>
        <p>Generate relevant hashtags for TikTok, Instagram, Facebook, and Twitter. Includes trending Filipino hashtags.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Select Categories</label>
        <div className="options-row">{CATEGORIES.map(c => <button key={c} className={`opt-btn ${selected.includes(c)?'active':''}`} onClick={() => toggle(c)}>{c.charAt(0).toUpperCase()+c.slice(1)}</button>)}</div>
        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Add Keyword (Optional)</label>
          <input type="text" placeholder="e.g. your brand or niche..." value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
        <div className="btn-row">
          <button className="btn" onClick={gen} disabled={selected.length===0}>Generate Hashtags</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>
        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <label className="tool-label">{results.length} Hashtags</label>
            <div style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1rem', display:'flex', flexWrap:'wrap', gap:'0.4rem'}}>
              {results.map((tag, i) => <span key={i} onClick={() => navigator.clipboard.writeText(tag)} style={{background:'var(--gold-glow)', border:'1px solid var(--border)', borderRadius:'6px', padding:'0.3rem 0.6rem', fontSize:'0.78rem', color:'var(--gold)', cursor:'pointer'}}>{tag}</span>)}
            </div>
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free Hashtag Generator for TikTok and Instagram</h2>
        <p>Find the right hashtags for your posts including trending Filipino and Philippine hashtags to increase your reach.</p>
      </div>
      <RelatedTools current="/hashtag-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ All hashtags copied!</div>
    </main>
  )
}
