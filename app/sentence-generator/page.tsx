'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const TEMPLATES: Record<string, { subjects: string[], verbs: string[], objects: string[], adjectives: string[], adverbs: string[] }> = {
  story: {
    subjects: ['A brave warrior','The mysterious stranger','An old wizard','A young girl','The last dragon','A lonely traveler','The village elder','A cunning fox','The forgotten king','A wandering monk'],
    verbs: ['discovered','encountered','defeated','befriended','escaped from','searched for','protected','destroyed','revealed','awakened'],
    objects: ['an ancient treasure','a hidden kingdom','a dark secret','a powerful artifact','a lost civilization','a magical forest','a cursed village','a dying star','a forgotten prophecy','a forbidden realm'],
    adjectives: ['ancient','mysterious','powerful','forgotten','cursed','hidden','sacred','enchanted','legendary','forbidden'],
    adverbs: ['silently','bravely','desperately','secretly','reluctantly','fearlessly','slowly','suddenly','carefully','boldly'],
  },
  motivational: {
    subjects: ['Success','Greatness','Your dream','True strength','Real power','Every champion','Your future','A winner','The best version of you','Your potential'],
    verbs: ['begins with','comes from','requires','demands','starts with','is built on','depends on','grows through','is defined by','emerges from'],
    objects: ['a single decision','consistent action','unwavering belief','daily discipline','small steps forward','refusing to quit','embracing failure','relentless effort','a burning desire','focused commitment'],
    adjectives: ['unstoppable','extraordinary','limitless','powerful','remarkable','unbreakable','incredible','fearless','determined','relentless'],
    adverbs: ['always','never','consistently','daily','relentlessly','courageously','persistently','fiercely','endlessly','passionately'],
  },
  funny: {
    subjects: ['My cat','A confused penguin','The office printer','My alarm clock','A lazy sloth','The WiFi router','My Monday morning','A dramatic llama','The pizza delivery guy','A sleepy panda'],
    verbs: ['decided to','attempted to','accidentally','tried to','successfully managed to','completely failed to','somehow managed to','unexpectedly chose to','dramatically refused to','enthusiastically agreed to'],
    objects: ['take over the world','eat my homework','crash the party','ruin my plans','save the day','break the internet','start a revolution','win an argument','ignore all logic','defy the laws of physics'],
    adjectives: ['confused','sleepy','dramatic','ridiculous','absurd','bizarre','chaotic','absolutely unhinged','suspiciously calm','dangerously caffeinated'],
    adverbs: ['accidentally','dramatically','lazily','confusedly','enthusiastically','aggressively','suspiciously','clumsily','proudly','reluctantly'],
  },
  business: {
    subjects: ['Our team','The company','Innovative leaders','Forward-thinking businesses','Strategic partnerships','Our clients','The market','Digital transformation','Our solution','Industry pioneers'],
    verbs: ['leverage','optimize','drive','deliver','accelerate','transform','revolutionize','maximize','streamline','empower'],
    objects: ['sustainable growth','competitive advantage','customer success','operational efficiency','market leadership','digital innovation','long-term value','business outcomes','stakeholder confidence','industry disruption'],
    adjectives: ['scalable','data-driven','customer-centric','agile','innovative','strategic','impactful','results-oriented','forward-thinking','transformative'],
    adverbs: ['efficiently','strategically','proactively','consistently','rapidly','effectively','seamlessly','collaboratively','dynamically','sustainably'],
  },
  love: {
    subjects: ['Your smile','Every moment with you','Our love story','The way you laugh','Your kindness','Being with you','Your voice','This feeling','Our journey together','You'],
    verbs: ['makes me','reminds me of','fills my heart with','brings me','makes the world','turned my life into','gives me','makes everything','keeps me','shows me'],
    objects: ['pure happiness','endless joy','a beautiful dream','hope and light','something worth living for','a better person','the strength to carry on','feel complete','grateful every day','what love truly means'],
    adjectives: ['beautiful','wonderful','magical','breathtaking','unforgettable','precious','eternal','incredible','amazing','perfect'],
    adverbs: ['deeply','truly','endlessly','completely','unconditionally','forever','always','profoundly','genuinely','perfectly'],
  },
  random: {
    subjects: ['The flying toaster','A philosophical robot','Time itself','The color blue','An anonymous cloud','The last cookie','A retired superhero','The concept of Monday','An overworked meme','Reality'],
    verbs: ['questioned','embraced','misunderstood','accidentally deleted','redefined','politely ignored','aggressively reorganized','gently disputed','philosophically accepted','temporarily forgot'],
    objects: ['the meaning of existence','basic physics','social norms','common sense','the laws of time','breakfast','human expectations','the concept of fun','the rules of reality','everything simultaneously'],
    adjectives: ['existential','quantum','surprisingly normal','aggressively mediocre','cosmically confused','temporarily eternal','paradoxically simple','overwhelmingly ordinary','suspiciously neat','alarmingly casual'],
    adverbs: ['philosophically','accidentally','deliberately','paradoxically','surprisingly','cosmically','temporarily','inevitably','mysteriously','simultaneously'],
  },
}

function buildSentence(type: string): string {
  const t = TEMPLATES[type]
  const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
  const r = Math.random()

  if (r < 0.33) {
    return `${rand(t.subjects)} ${rand(t.verbs)} ${rand(t.objects)}.`
  } else if (r < 0.66) {
    return `${rand(t.adjectives).charAt(0).toUpperCase() + rand(t.adjectives).slice(1)} ${rand(t.subjects).toLowerCase()} ${rand(t.adverbs)} ${rand(t.verbs)} ${rand(t.objects)}.`
  } else {
    return `${rand(t.subjects)} ${rand(t.adverbs)} ${rand(t.verbs)} ${rand(t.objects)}.`
  }
}

function generate(type: string, count: number): string[] {
  const sentences: string[] = []
  const used = new Set<string>()
  for (let i = 0; i < count * 5 && sentences.length < count; i++) {
    const s = buildSentence(type)
    if (!used.has(s)) { used.add(s); sentences.push(s) }
  }
  return sentences
}

const TYPES = [
  { id: 'story', label: '📖 Story' },
  { id: 'motivational', label: '💪 Motivational' },
  { id: 'funny', label: '😂 Funny' },
  { id: 'business', label: '💼 Business' },
  { id: 'love', label: '❤️ Love' },
  { id: 'random', label: '🎲 Random' },
]

export default function SentenceGenerator() {
  const [type, setType] = useState('motivational')
  const [count, setCount] = useState(5)
  const [results, setResults] = useState<string[]>([])
  const [toast, setToast] = useState(false)

  const gen = () => setResults(generate(type, count))

  const copyAll = () => {
    navigator.clipboard.writeText(results.join('\n'))
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const copyOne = (s: string) => navigator.clipboard.writeText(s)

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Sentence <span>Generator</span></h1>
        <p>Generate creative sentences for stories, captions, motivation, business copy, and more. Pick a style and get instant results.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Sentence Style</label>
        <div className="options-row">
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

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">How Many Sentences: <span style={{color:'var(--gold)'}}>{count}</span></label>
          <input
            type="range"
            min={1} max={20}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            style={{width:'100%', accentColor:'var(--gold)', cursor:'pointer', marginTop:'0.5rem'}}
          />
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'var(--text-dim)'}}>
            <span>1</span><span>20</span>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={gen}>Generate Sentences</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>

        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>{results.length} Sentences Generated</label>
              <button className="btn btn-ghost btn-sm" onClick={gen}>Regenerate</button>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
              {results.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background:'var(--bg)',
                    border:'1px solid var(--border)',
                    borderRadius:'8px',
                    padding:'0.85rem 1rem',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'flex-start',
                    gap:'0.75rem',
                    cursor:'pointer',
                    transition:'border-color 0.15s',
                  }}
                  onClick={() => copyOne(s)}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-dim)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span style={{fontSize:'0.88rem', lineHeight:'1.6', color:'var(--text)', flex:1}}>{s}</span>
                  <button className="copy-btn" style={{whiteSpace:'nowrap', marginTop:'2px'}}>COPY</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Sentence Generator Tool</h2>
        <p>Our sentence generator creates unique, ready-to-use sentences across six different styles — perfect for social media captions, creative writing prompts, business copy, motivational posts, and more. Every click generates fresh, randomized combinations so you never get the same result twice.</p>
        <h2>Creative Writing and Story Prompts</h2>
        <p>Writers often face creative blocks when starting a new story or scene. Use our Story mode to generate interesting opening sentences or plot hooks. Each generated sentence can spark a new idea, a character concept, or a plot direction. Great for NaNoWriMo, fanfiction, school assignments, and creative writing exercises.</p>
        <h2>Social Media Captions and Business Copy</h2>
        <p>Content creators use our Motivational and Love modes to find caption ideas for Instagram and TikTok posts. Marketers and business owners use Business mode to draft taglines, presentation openers, and professional copy. The Funny mode is perfect for lighthearted posts, memes, and entertainment content that gets shares and reactions.</p>
      </div>

      <RelatedTools current="/sentence-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ All sentences copied!</div>
    </main>
  )
}
