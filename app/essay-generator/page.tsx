'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

const ESSAY_TYPES = [
  { id: 'argumentative', label: '⚔️ Argumentative' },
  { id: 'descriptive', label: '🎨 Descriptive' },
  { id: 'expository', label: '📚 Expository' },
  { id: 'narrative', label: '📖 Narrative' },
  { id: 'persuasive', label: '💬 Persuasive' },
  { id: 'compare', label: '⚖️ Compare & Contrast' },
]

const LENGTHS = [
  { id: 'short', label: 'Short (3 paragraphs)', paragraphs: 3 },
  { id: 'medium', label: 'Medium (5 paragraphs)', paragraphs: 5 },
  { id: 'long', label: 'Long (7 paragraphs)', paragraphs: 7 },
]

function generateEssay(type: string, topic: string, thesis: string, points: string, audience: string, length: string): string {
  const pts = points.split(',').map(p => p.trim()).filter(Boolean)
  const para = LENGTHS.find(l => l.id === length)?.paragraphs || 5
  const bodyCount = para - 2

  const INTROS: Record<string, string> = {
    argumentative: `The topic of ${topic} has been widely debated in recent years. Many people hold strong opinions on both sides, making it a subject worth examining carefully. This essay will argue that ${thesis || `${topic} is a matter that deserves serious attention and action`}. By exploring the key evidence and reasoning, this essay will demonstrate why this position is well-supported.`,
    descriptive: `Few subjects capture the imagination quite like ${topic}. Whether encountered for the first time or revisited after years of familiarity, ${topic} offers a wealth of detail, texture, and meaning worth exploring. This essay aims to paint a vivid picture of ${thesis || topic}, drawing on specific details and observations that bring the subject to life.`,
    expository: `Understanding ${topic} is essential in today's world. As knowledge continues to evolve, it is important to examine what ${topic} truly means, how it works, and why it matters. This essay will explain ${thesis || `the key aspects of ${topic}`} in a clear and organized manner, providing readers with a thorough understanding of the subject.`,
    narrative: `It began with ${topic}. Like most meaningful experiences, the story of ${thesis || topic} is one that unfolds gradually, shaped by decisions, moments, and the people involved. This narrative essay will walk through the key events and reflections that make this story worth telling, offering both context and personal insight along the way.`,
    persuasive: `Consider this: ${topic} affects more people than most of us realize. Despite the evidence available, many still overlook its significance. This essay will make a compelling case for why ${thesis || `we must take ${topic} seriously`}. Through logic, evidence, and real-world examples, readers will see why this position is not just reasonable — it is necessary.`,
    compare: `When examining ${topic}, it quickly becomes clear that not all perspectives are equal. Comparing and contrasting the key aspects of this subject reveals important differences and surprising similarities. This essay will analyze ${thesis || `the main dimensions of ${topic}`}, helping readers develop a more nuanced and complete understanding.`,
  }

  const BODY_TEMPLATES = [
    (topic: string, point: string, i: number) => `The ${i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : 'next'} key aspect to consider is ${point || `an important dimension of ${topic}`}. This point is particularly significant because it directly impacts how we understand the broader subject. Evidence and observation consistently support this view, and experts in the field have noted its importance repeatedly. When we look closely at ${topic} through this lens, the implications become clear and hard to ignore. This is not a minor detail — it is central to the entire discussion.`,
    (topic: string, point: string, i: number) => `Another critical dimension of ${topic} involves ${point || 'a further consideration worth examining'}. To fully grasp this, we must look beyond surface-level observations and consider the underlying factors at play. Research and real-world examples demonstrate that this aspect has a measurable and meaningful effect. Without addressing ${point || 'this point'}, any analysis of ${topic} would be incomplete. It is precisely this kind of careful examination that leads to genuine understanding.`,
    (topic: string, point: string, i: number) => `Perhaps the most compelling point in this discussion is ${point || `the broader significance of ${topic}`}. While the previous points laid important groundwork, this consideration ties everything together. It bridges theory and practice, showing how ideas connect to real outcomes. Those who have studied ${topic} in depth consistently return to this point as foundational. Ignoring it would mean missing the heart of the matter entirely.`,
    (topic: string, point: string, i: number) => `It is also worth examining how ${point || topic} interacts with other related factors. No topic exists in isolation, and ${topic} is no exception. The connections between this subject and the wider context around it reveal a more complete picture. By considering these relationships, we gain insight that would otherwise remain hidden. This interconnected view is essential for anyone seeking a thorough understanding.`,
    (topic: string, point: string, i: number) => `Finally, considering ${point || `the practical implications of ${topic}`} brings the discussion full circle. Theory is valuable, but it must ultimately connect to practice. In the case of ${topic}, this connection is both direct and significant. Real-world applications demonstrate the value of understanding this subject deeply, and they remind us why this conversation matters beyond the academic setting.`,
  ]

  const CONCLUSIONS: Record<string, string> = {
    argumentative: `In conclusion, the evidence presented throughout this essay firmly supports the position that ${thesis || topic}. The arguments made in the body paragraphs reinforce one another, creating a coherent and compelling case. While opposing views exist, they do not undermine the strength of the position outlined here. Moving forward, it is important that we continue to engage with this topic critically and take informed action based on what the evidence shows.`,
    descriptive: `In conclusion, ${topic} is a subject rich in detail, meaning, and complexity. The descriptions and observations offered in this essay only scratch the surface of what makes it truly remarkable. Whether encountering ${topic} for the first time or with fresh eyes after reading this essay, one thing is clear — it rewards careful attention. The more closely we look, the more there is to discover and appreciate.`,
    expository: `In conclusion, this essay has provided a comprehensive overview of ${topic}. By examining its key components and explaining how they relate to one another, a clearer picture has emerged. Understanding ${thesis || topic} is not just an academic exercise — it has real implications for how we think and act. With this foundation in place, readers are better equipped to explore the subject further and apply this knowledge meaningfully.`,
    narrative: `In conclusion, the story of ${topic} is one that leaves a lasting impression. The events and reflections explored in this essay reveal something deeper than the surface details — they speak to universal themes of growth, challenge, and discovery. Every narrative teaches us something if we are willing to listen. This one is no different. The lessons carried forward from ${topic} will continue to resonate long after the story ends.`,
    persuasive: `In conclusion, the case for ${thesis || topic} is clear, strong, and well-supported. The evidence, examples, and reasoning presented throughout this essay leave little room for doubt. Now is the time to move from awareness to action. Every reader has the ability to make a difference on this issue, whether through personal choices, conversations, or advocacy. The question is not whether change is needed — it is whether we are willing to be the ones who bring it about.`,
    compare: `In conclusion, comparing and contrasting the key aspects of ${topic} has revealed both important differences and meaningful connections. This kind of analysis deepens our understanding and prevents oversimplification. Rather than seeing ${topic} as one-dimensional, we can now appreciate its complexity and nuance. The insights gained from this comparison provide a stronger foundation for future thinking, discussion, and decision-making on this subject.`,
  }

  const intro = INTROS[type] || INTROS.expository
  const conclusion = CONCLUSIONS[type] || CONCLUSIONS.expository

  const bodyParagraphs = []
  for (let i = 0; i < bodyCount; i++) {
    const point = pts[i] || ''
    const templateFn = BODY_TEMPLATES[i % BODY_TEMPLATES.length]
    bodyParagraphs.push(templateFn(topic, point, i))
  }

  const essayType = ESSAY_TYPES.find(t => t.id === type)?.label.replace(/[^a-zA-Z ]/g, '').trim() || 'Essay'
  const header = `${essayType}: ${topic}\n${'─'.repeat(50)}\n\n`

  return header + intro + '\n\n' + bodyParagraphs.join('\n\n') + '\n\n' + conclusion
}

export default function EssayGenerator() {
  const [essayType, setEssayType] = useState('argumentative')
  const [topic, setTopic] = useState('')
  const [thesis, setThesis] = useState('')
  const [points, setPoints] = useState('')
  const [audience, setAudience] = useState('general')
  const [length, setLength] = useState('medium')
  const [result, setResult] = useState('')
  const [toast, setToast] = useState(false)

  const generate = () => {
    if (!topic.trim()) return
    setResult(generateEssay(essayType, topic, thesis, points, audience, length))
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const wordCount = result.trim() ? result.trim().split(/\s+/).length : 0

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Essay <span>Generator</span></h1>
        <p>Generate a complete essay instantly. Choose your essay type, enter your topic and key points, and get a full structured essay ready to use. Free, no signup.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Essay Type</label>
        <div className="options-row">
          {ESSAY_TYPES.map(t => (
            <button key={t.id} className={`opt-btn ${essayType === t.id ? 'active' : ''}`} onClick={() => { setEssayType(t.id); setResult('') }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{marginTop:'1rem'}}>
          <label className="tool-label">Essay Topic <span style={{color:'#ef4444'}}>*</span></label>
          <input type="text" placeholder="e.g. Climate Change, Social Media, Education in the Philippines" value={topic} onChange={e => { setTopic(e.target.value); setResult('') }} />
        </div>

        <div style={{marginTop:'0.75rem'}}>
          <label className="tool-label">Your Thesis / Main Argument (Optional)</label>
          <input type="text" placeholder="e.g. Social media does more harm than good to teenagers" value={thesis} onChange={e => { setThesis(e.target.value); setResult('') }} />
        </div>

        <div style={{marginTop:'0.75rem'}}>
          <label className="tool-label">Key Points (Optional — separate with commas)</label>
          <input type="text" placeholder="e.g. mental health effects, misinformation, addiction, social comparison" value={points} onChange={e => { setPoints(e.target.value); setResult('') }} />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'0.75rem'}}>
          <div>
            <label className="tool-label">Target Audience</label>
            <select value={audience} onChange={e => setAudience(e.target.value)}>
              <option value="general">General Public</option>
              <option value="academic">Academic / School</option>
              <option value="professional">Professional</option>
              <option value="student">High School Student</option>
              <option value="college">College Student</option>
            </select>
          </div>
          <div>
            <label className="tool-label">Essay Length</label>
            <select value={length} onChange={e => setLength(e.target.value)}>
              {LENGTHS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={generate} disabled={!topic.trim()}>✍️ Generate Essay</button>
          {result && <button className="btn btn-ghost" onClick={() => { setTopic(''); setThesis(''); setPoints(''); setResult('') }}>Clear</button>}
        </div>

        {result && (
          <div style={{marginTop:'1.5rem'}}>
            <div className="output-label">
              <label className="tool-label" style={{margin:0}}>Generated Essay</label>
              <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                <span style={{fontSize:'0.7rem', color:'var(--text-dim)'}}>{wordCount} words</span>
                <button className="btn btn-ghost btn-sm" onClick={copy}>Copy</button>
              </div>
            </div>
            <div style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.25rem', fontSize:'0.85rem', lineHeight:'1.9', whiteSpace:'pre-wrap', color:'var(--text)', maxHeight:'500px', overflowY:'auto'}}>
              {result}
            </div>
            <div className="btn-row">
              <button className="btn" onClick={copy}>Copy Full Essay</button>
              <button className="btn btn-ghost" onClick={generate}>Regenerate</button>
            </div>
            <p style={{marginTop:'0.75rem', fontSize:'0.72rem', color:'var(--text-dim)', lineHeight:1.6}}>
              💡 Tip: Use this as a starting point and personalize it with your own examples, data, and voice for best results.
            </p>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free Essay Generator Tool</h2>
        <p>Our essay generator creates complete, structured essays instantly. Choose from six essay types — argumentative, descriptive, expository, narrative, persuasive, and compare and contrast. Enter your topic and optional key points, select your preferred length, and get a full essay in seconds. Free to use, no account required.</p>
        <h2>Essay Types Explained</h2>
        <p>An argumentative essay takes a clear position and defends it with evidence. A descriptive essay paints a detailed picture of a subject. An expository essay explains a topic objectively. A narrative essay tells a story. A persuasive essay convinces the reader to take a specific view or action. A compare and contrast essay analyzes similarities and differences between two subjects.</p>
        <h2>For Students in the Philippines and Worldwide</h2>
        <p>Filipino students from high school to college frequently need to write essays for English, social studies, science, and research subjects. Our tool helps generate essay drafts that can be used as a starting point, helping students understand proper essay structure — introduction, body paragraphs, and conclusion — while saving time on initial drafts.</p>
      </div>

      <RelatedTools current="/essay-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Essay copied!</div>
    </main>
  )
}
