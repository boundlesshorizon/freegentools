'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const HASHTAG_DB: Record<string, string[]> = {
  food: ['#food','#foodie','#foodporn','#instafood','#foodphotography','#yummy','#delicious','#foodstagram','#homecooking','#foodlover','#eating','#tasty','#foodblogger','#meal','#recipe','#cooking','#chef','#restaurant','#lunch','#dinner','#breakfast','#snack','#healthy','#healthyfood','#vegan','#vegetarian','#streetfood','#asianfood','#pinoyFood','#pinoyfoodie'],
  travel: ['#travel','#travelphotography','#traveling','#wanderlust','#adventure','#explore','#tourism','#vacation','#trip','#travelgram','#instatravel','#travelblogger','#tourist','#backpacker','#bucketlist','#paradise','#beach','#mountains','#nature','#scenery','#roadtrip','#travelph','#philippinesbeach','#visayas','#mindanao','#luzon','#baguio','#palawan','#cebu','#siargao'],
  fitness: ['#fitness','#gym','#workout','#fitnessmotivation','#fit','#training','#exercise','#health','#bodybuilding','#muscle','#gains','#weightloss','#cardio','#crossfit','#running','#yoga','#motivation','#dedication','#fitspo','#athlete','#personaltrainer','#healthylifestyle','#fitnessjourney','#gymlife','#fitfam','#strengthtraining','#abs','#physique','#fitnessgoals','#gymrat'],
  fashion: ['#fashion','#style','#ootd','#outfit','#clothing','#fashionista','#streetstyle','#trendy','#lookbook','#fashionblogger','#outfitoftheday','#wiwt','#styleinspo','#fashionphotography','#model','#beauty','#makeup','#hair','#skincare','#accessories','#luxury','#designer','#vintage','#sustainable','#pinayootd','#filipinafashion','#manila','#bgcollecion','#lazada','#shopee'],
  gaming: ['#gaming','#gamer','#videogames','#game','#games','#twitch','#esports','#gamingcommunity','#pcgaming','#mobilegaming','#xbox','#playstation','#nintendo','#fps','#rpg','#moba','#mlbb','#mobilelegends','#freefire','#codmobile','#valorant','#minecraft','#roblox','#gamingph','#pinoyGamer','#esportsph','#streamer','#content','#youtube','#twitch'],
  business: ['#business','#entrepreneur','#success','#motivation','#startup','#marketing','#money','#finance','#investment','#hustle','#grind','#goals','#mindset','#leadership','#growth','#brand','#socialmedia','#digitalmarketing','#ecommerce','#smallbusiness','#shopee','#lazada','#onlineselling','#pinoyentrepreneur','#negosyo','#piso','#trabaho','#ofw','#freelancer','#sidehustle'],
  photography: ['#photography','#photo','#photographer','#photooftheday','#pic','#picture','#camera','#canon','#nikon','#sony','#portrait','#landscape','#streetphotography','#naturephotography','#lightroom','#photoshop','#editing','#colorgrading','#bokeh','#golden hour','#mobilephotography','#iphonephotography','#vsco','#presets','#photographylovers','#picoftheday','#snap','#shoot','#composition','#exposure'],
  tiktok: ['#fyp','#foryou','#foryoupage','#viral','#trending','#tiktok','#tiktokviral','#xyzbca','#fypシ','#viralvideo','#explore','#trend','#challenge','#duet','#stitch','#funny','#comedy','#entertainment','#content','#creator','#influencer','#philippines','#pinoy','#pilipino','#tiktokerph','#fypph','#viralph','#trendingph','#followme','#like'],
  beauty: ['#beauty','#makeup','#skincare','#beautyblogger','#cosmetics','#glam','#tutorial','#mua','#foundation','#lipstick','#eyeshadow','#contour','#highlight','#skincareroutine','#antiaging','#acne','#glowing','#natural','#organic','#crueltyFree','#beautyph','#pinaybeauty','#skincareRoutine','#spf','#moisturizer','#serum','#toner','#cleanser','#filipinobeauty','#glow'],
  nature: ['#nature','#naturephotography','#outdoor','#wildlife','#forest','#mountains','#beach','#ocean','#sunset','#sunrise','#sky','#clouds','#flowers','#plants','#green','#earth','#environment','#hiking','#camping','#adventure','#philippines','#philippinesnature','#pinoynature','#tropical','#island','#sea','#waterfall','#rice','#terraces','#banaue'],
}

const CATEGORIES = Object.keys(HASHTAG_DB)

function generateHashtags(topics: string[], keyword: string): string[] {
  const tags = new Set<string>()

  topics.forEach(t => {
    const pool = HASHTAG_DB[t] || []
    pool.forEach(h => tags.add(h))
  })

  if (keyword.trim()) {
    const kw = keyword.trim().toLowerCase().replace(/\s+/g, '')
    tags.add(`#${kw}`)
    tags.add(`#${kw}ph`)
    tags.add(`#${kw}philippines`)
    tags.add(`#${kw}lover`)
    tags.add(`#${kw}life`)
    tags.add(`#${kw}community`)
  }

  // Shuffle and return 30
  const arr = Array.from(tags)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, 30)
}

export default function HashtagGenerator() {
  const [selected, setSelected] = useState<string[]>(['tiktok'])
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState(false)

  const toggle = (cat: string) => setSelected(s => s.includes(cat) ? s.filter(x => x !== cat) : [...s, cat])

  const gen = () => setResults(generateHashtags(selected, keyword))

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(' '))
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const copyOne = (tag: string) => navigator.clipboard.writeText(tag)

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Hashtag <span>Generator</span></h1>
        <p>Generate relevant hashtags for TikTok, Instagram, Facebook, and Twitter. Includes trending Filipino and Philippine hashtags.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Select Categories (pick multiple)</label>
        <div className="options-row">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`opt-btn ${selected.includes(cat) ? 'active' : ''}`}
              onClick={() => toggle(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Add Your Keyword (Optional)</label>
          <input
            type="text"
            placeholder="e.g. your brand, topic, or niche..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <div className="btn-row">
          <button className="btn" onClick={gen} disabled={selected.length === 0}>Generate Hashtags</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>

        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>{results.length} Hashtags Generated</label>
              <button className="btn btn-ghost btn-sm" onClick={copyAll}>Copy All</button>
            </div>
            <div style={{
              background:'var(--bg)',
              border:'1px solid var(--border)',
              borderRadius:'8px',
              padding:'1rem',
              display:'flex',
              flexWrap:'wrap',
              gap:'0.4rem',
            }}>
              {results.map((tag, i) => (
                <span
                  key={i}
                  onClick={() => copyOne(tag)}
                  style={{
                    background:'var(--gold-glow)',
                    border:'1px solid var(--border)',
                    borderRadius:'6px',
                    padding:'0.3rem 0.6rem',
                    fontSize:'0.78rem',
                    color:'var(--gold)',
                    cursor:'pointer',
                    transition:'background 0.15s',
                  }}
                  title="Click to copy"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p style={{marginTop:'0.5rem', fontSize:'0.72rem', color:'var(--text-dim)'}}>Click individual hashtags to copy, or use Copy All to grab them all at once.</p>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Hashtag Generator for TikTok and Instagram</h2>
        <p>Our hashtag generator helps content creators, influencers, and small business owners find the right hashtags for their posts. Using relevant hashtags increases the visibility of your content on TikTok, Instagram, and Facebook, helping you reach more people organically.</p>
        <h2>Philippine and Filipino Hashtags</h2>
        <p>We include trending Philippine and Filipino community hashtags in every category — from Pinoy food hashtags to Filipino fashion, travel, and gaming tags. These regional hashtags help you connect with the Philippine online community and local audiences.</p>
        <h2>How Many Hashtags Should I Use?</h2>
        <p>On TikTok, 3 to 5 highly relevant hashtags typically perform better than 30 random ones. On Instagram, you can use up to 30 hashtags — a mix of popular, medium, and niche tags works best. On Facebook, 2 to 5 hashtags are sufficient. Always prioritize relevance over quantity.</p>
      </div>

      <RelatedTools current="/hashtag-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ All hashtags copied!</div>
    </main>
  )
}
