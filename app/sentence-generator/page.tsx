'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const BANK = {
  story: [
    "The old lighthouse keeper had not spoken to anyone in three years.",
    "She found a letter hidden inside the walls of her grandmother's house.",
    "The map led them to a door that had no keyhole.",
    "He walked into the forest at midnight and never came back the same.",
    "The last train out of the city was always empty, except for one passenger.",
    "They said the painting changed every time you looked away.",
    "She inherited a shop that sold things people had lost and never expected to find.",
    "The town had no shadows, and nobody talked about why.",
    "He opened the book and recognized his own handwriting, but had never written it.",
    "The garden only bloomed when no one was watching.",
    "Every clock in the house stopped at the same time every night.",
    "She had been hired to find a missing person who turned out to be herself.",
    "The stranger knew her name before she introduced herself.",
    "The door at the end of the hallway was always warm to the touch.",
    "He had been leaving the same voicemail for ten years and someone finally called back.",
    "The village appeared on no map, but everyone seemed to know where it was.",
    "She woke up with sand in her shoes and no memory of the night before.",
    "The child drew the same house every day, and one day they found it.",
    "He could hear the ocean from his bedroom, but the nearest beach was a hundred miles away.",
    "The diary had entries written after the author had died.",
  ],
  motivational: [
    "Every expert was once a beginner who refused to give up.",
    "The only way to fail is to stop trying.",
    "Small steps taken every day lead to massive results over time.",
    "Your current situation is not your final destination.",
    "Success is built in the moments when you want to quit but choose to continue.",
    "The difference between ordinary and extraordinary is that little extra effort.",
    "You do not need to be perfect to make progress.",
    "Every morning is a new opportunity to become a better version of yourself.",
    "Discipline is choosing what you want most over what you want right now.",
    "The hardest part of any journey is taking the first step.",
    "Consistency beats talent when talent is not consistent.",
    "Your mindset determines your direction.",
    "Challenges are just opportunities wearing a disguise.",
    "Great things never come from comfort zones.",
    "Believe in yourself even when no one else does.",
    "One year from now you will wish you had started today.",
    "Stop waiting for the right moment and start creating it.",
    "The only limits that exist are the ones you place on yourself.",
    "Progress, not perfection, is the goal.",
    "Work in silence and let your results do the talking.",
  ],
  funny: [
    "My alarm clock has more confidence in me than I do in myself.",
    "I told myself I would be productive today, and we both laughed.",
    "My attention span is fine, I just have a very fast boredom reflex.",
    "I am not lazy, I am in energy-saving mode.",
    "My motivation called in sick again today.",
    "I put the pro in procrastination.",
    "My brain has too many tabs open and no idea which one is playing music.",
    "I do not have a bad memory, I just have selective attention.",
    "I was going to do something productive, but then I sat down.",
    "My coffee needs a coffee before it can function.",
    "I have big plans, a small follow-through, and a great excuse.",
    "Sleep is my superpower, and I train daily.",
    "I am a morning person if morning starts at noon.",
    "My phone battery lasts longer than my motivation.",
    "I tried to be a responsible adult but the wifi kept cutting out.",
    "My to-do list is just a list of things I will do tomorrow.",
    "I run on caffeine, sarcasm, and questionable life choices.",
    "I am not arguing, I am just explaining why I am right.",
    "I followed my dreams and they led me back to bed.",
    "My inner child is chaotic and my outer adult is barely keeping up.",
  ],
  business: [
    "A clear strategy turns vision into measurable results.",
    "Customer trust is the most valuable asset a business can build.",
    "Consistent quality beats occasional excellence.",
    "Every problem your business solves is revenue waiting to happen.",
    "The best marketing is a product that speaks for itself.",
    "Speed and execution separate successful businesses from great ideas.",
    "Know your numbers, know your business.",
    "Your reputation is built one customer interaction at a time.",
    "A strong team multiplies the impact of every individual.",
    "Adapt quickly or risk becoming irrelevant.",
    "The best investment a business can make is in its people.",
    "Focus on solving real problems and the money will follow.",
    "Growth requires getting comfortable with discomfort.",
    "Data tells you what happened, but understanding tells you why.",
    "Build systems that work even when you are not watching.",
    "The customer does not care about your process, only your results.",
    "Every great business started with a problem someone refused to ignore.",
    "Clarity of purpose drives clarity of action.",
    "Scale what works, kill what does not, and test everything in between.",
    "Your brand is what people say about you when you are not in the room.",
  ],
  love: [
    "Loving you is the easiest thing I have ever done.",
    "You make ordinary moments feel like something worth remembering.",
    "I never knew what home felt like until I met you.",
    "You are the reason I look forward to tomorrow.",
    "Being with you feels like finally finding something I did not know I was missing.",
    "You make the hard days softer and the good days even better.",
    "I fall in love with you a little more every single day.",
    "You are my favorite hello and my hardest goodbye.",
    "Thank you for loving me on the days when I forget to love myself.",
    "You are the calm I always come back to.",
    "Every love song started making sense the moment I met you.",
    "I choose you every day, not just once.",
    "You turned my world into somewhere I actually want to be.",
    "With you, even silence feels comfortable.",
    "You are proof that some things are worth the wait.",
    "I love who I become when I am around you.",
    "You are my favorite distraction and my greatest motivation.",
    "The best decision I ever made was letting you in.",
    "You make love feel simple, which is the most beautiful thing in the world.",
    "I did not believe in forever until you.",
  ],
  random: [
    "A rubber duck has never lied to anyone.",
    "Somewhere out there, a pigeon is making a very confident decision.",
    "The last cookie in the jar deserves more respect than it gets.",
    "Monday mornings are just Sundays that made a bad turn.",
    "Every elevator has at least one person doing a silent countdown.",
    "Fog is just clouds that gave up on flying.",
    "A forgotten password is just a mystery your past self left behind.",
    "Somewhere a spreadsheet contains the meaning of life and nobody has noticed.",
    "The WiFi router is the most important family member and nobody admits it.",
    "Socks disappear in the wash because the universe needs balance.",
    "Every shopping cart with a bad wheel is a lesson in patience.",
    "A loading screen is just the internet asking you to calm down.",
    "The snooze button is proof that humans negotiate with themselves.",
    "Every group chat has one person who reads everything but never responds.",
    "A blinking cursor is just technology asking you what you actually want.",
    "The universe is mostly empty space, which explains a lot about Mondays.",
    "Autocorrect is just your phone having opinions.",
    "Every parking lot is a tiny social experiment.",
    "Somewhere a to-do list is living its best life completely ignored.",
    "A fully charged battery is a small but real form of happiness.",
  ],
}

const TYPES = [
  { id: 'story', label: '📖 Story' },
  { id: 'motivational', label: '💪 Motivational' },
  { id: 'funny', label: '😂 Funny' },
  { id: 'business', label: '💼 Business' },
  { id: 'love', label: '❤️ Love' },
  { id: 'random', label: '🎲 Random' },
]

function generate(type: string, count: number): string[] {
  const pool = [...BANK[type as keyof typeof BANK]]
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}

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
          <label className="tool-label">How Many: <span style={{color:'var(--gold)'}}>{count}</span></label>
          <input
            type="range" min={1} max={10} value={count}
            onChange={e => setCount(Number(e.target.value))}
            style={{width:'100%', accentColor:'var(--gold)', cursor:'pointer', marginTop:'0.5rem'}}
          />
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'var(--text-dim)'}}>
            <span>1</span><span>10</span>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={gen}>Generate Sentences</button>
          {results.length > 0 && <button className="btn btn-ghost" onClick={copyAll}>Copy All</button>}
        </div>

        {results.length > 0 && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>{results.length} Sentences</label>
              <button className="btn btn-ghost btn-sm" onClick={gen}>Regenerate</button>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
              {results.map((s, i) => (
                <div
                  key={i}
                  onClick={() => copyOne(s)}
                  style={{
                    background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px',
                    padding:'0.85rem 1rem', display:'flex', justifyContent:'space-between',
                    alignItems:'flex-start', gap:'0.75rem', cursor:'pointer', transition:'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-dim)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span style={{fontSize:'0.88rem', lineHeight:'1.7', color:'var(--text)', flex:1}}>{s}</span>
                  <button className="copy-btn" style={{whiteSpace:'nowrap', marginTop:'2px'}}>COPY</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Sentence Generator Tool</h2>
        <p>Our sentence generator creates unique, well-written sentences across six different styles — perfect for social media captions, creative writing prompts, business copy, motivational posts, and more. Every click produces fresh results from our curated sentence library.</p>
        <h2>Creative Writing and Story Prompts</h2>
        <p>Writers often face creative blocks when starting a new story or scene. Use our Story mode to generate interesting opening sentences or plot hooks. Each generated sentence can spark a new idea, a character concept, or a plot direction. Great for school assignments and creative writing exercises.</p>
        <h2>Social Media Captions and Business Copy</h2>
        <p>Content creators use our Motivational and Love modes to find caption ideas for Instagram and TikTok posts. Marketers use Business mode to draft taglines and presentation openers. The Funny mode is perfect for lighthearted posts and entertainment content that gets shares and reactions.</p>
      </div>

      <RelatedTools current="/sentence-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied!</div>
    </main>
  )
}
