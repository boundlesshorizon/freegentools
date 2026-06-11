'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

interface BMIResult {
  bmi: number
  category: string
  color: string
  description: string
  advice: string[]
  idealMin: number
  idealMax: number
  toLose: number | null
  toGain: number | null
}

function calcBMI(weight: number, height: number, unit: string): BMIResult {
  let bmi: number
  let heightM: number
  let weightKg: number

  if (unit === 'metric') {
    heightM = height / 100
    weightKg = weight
  } else {
    heightM = height * 0.0254
    weightKg = weight * 0.453592
  }
  bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10

  const idealMin = Math.round(18.5 * heightM * heightM * 10) / 10
  const idealMax = Math.round(24.9 * heightM * heightM * 10) / 10
  const toLose = weightKg > idealMax ? Math.round((weightKg - idealMax) * 10) / 10 : null
  const toGain = weightKg < idealMin ? Math.round((idealMin - weightKg) * 10) / 10 : null

  let category: string, color: string, description: string, advice: string[]

  if (bmi < 16) {
    category = 'Severely Underweight'; color = '#ef4444'
    description = 'Your BMI indicates severe underweight. This affects your immune system, bone density, and overall health.'
    advice = ['See a doctor or nutritionist immediately', 'Increase calories with nutrient-dense foods', 'Add healthy fats: avocado, nuts, olive oil', 'Eat 5-6 smaller meals daily', 'Consider strength training to build muscle']
  } else if (bmi < 18.5) {
    category = 'Underweight'; color = '#f97316'
    description = 'Your BMI is below the healthy range. Gaining some weight will improve your energy and overall health.'
    advice = ['Increase daily calories by 300-500', 'Eat protein-rich foods: eggs, chicken, fish, beans', 'Add healthy snacks between meals', 'Do strength training 3x per week', 'Track food intake to ensure you eat enough']
  } else if (bmi < 25) {
    category = 'Normal Weight ✓'; color = '#22c55e'
    description = 'Your BMI is in the healthy range. Keep it up! This reduces your risk of chronic diseases significantly.'
    advice = ['Maintain your current balanced diet', 'Exercise at least 150 minutes per week', 'Drink 8 glasses of water daily', 'Get 7-9 hours of sleep every night', 'Keep up with annual health checkups']
  } else if (bmi < 30) {
    category = 'Overweight'; color = '#f97316'
    description = 'Your BMI is slightly above healthy. Small consistent lifestyle changes can bring big results.'
    advice = ['Reduce daily calories by 300-500', 'Walk at least 30 minutes every day', 'Cut sugary drinks and processed foods', 'Fill half your plate with vegetables', 'Track meals with a food diary or app']
  } else if (bmi < 35) {
    category = 'Obese (Class I)'; color = '#ef4444'
    description = 'Your BMI indicates obesity which raises risk of heart disease and diabetes. Changes now make a huge difference.'
    advice = ['Consult a doctor for a personalized plan', 'Start with 20-30 minute daily walks', 'Eliminate sugary drinks completely', 'Reduce portion sizes at every meal', 'Focus on vegetables, lean protein, whole grains']
  } else if (bmi < 40) {
    category = 'Obese (Class II)'; color = '#dc2626'
    description = 'Your BMI indicates severe obesity. Medical guidance is strongly recommended alongside lifestyle changes.'
    advice = ['See a doctor for medical supervision', 'Work with a registered dietitian', 'Start low-impact exercise: swimming, walking', 'Set small goals — even 5% weight loss helps', 'Build a support system with family or a health group']
  } else {
    category = 'Obese (Class III)'; color = '#991b1b'
    description = 'Your BMI indicates morbid obesity. Please seek medical help — this level carries serious health risks.'
    advice = ['Seek immediate medical consultation', 'Discuss medical weight loss options with your doctor', 'Do not attempt extreme diets without supervision', 'Focus on sustainable small changes first', 'Mental health support can be very helpful']
  }

  return { bmi, category, color, description, advice, idealMin, idealMax, toLose, toGain }
}

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [toast, setToast] = useState(false)

  const calculate = () => {
    const w = parseFloat(weight)
    const h = unit === 'metric' ? parseFloat(height) : (parseFloat(heightFt || '0') * 12) + parseFloat(heightIn || '0')
    if (!w || !h || w <= 0 || h <= 0) return
    setResult(calcBMI(w, h, unit))
  }

  const getPointerPct = (bmi: number) => Math.min(98, Math.max(2, ((bmi - 10) / 35) * 100))

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(`BMI: ${result.bmi} — ${result.category}\nIdeal weight: ${result.idealMin}kg – ${result.idealMax}kg`)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>BMI <span>Calculator</span></h1>
        <p>Calculate your Body Mass Index instantly. Get your BMI score, weight category, ideal weight range, and personalized health tips. Free, no signup.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Unit System</label>
        <div className="options-row">
          <button className={`opt-btn ${unit === 'metric' ? 'active' : ''}`} onClick={() => { setUnit('metric'); setResult(null) }}>📏 Metric (kg, cm)</button>
          <button className={`opt-btn ${unit === 'imperial' ? 'active' : ''}`} onClick={() => { setUnit('imperial'); setResult(null) }}>📐 Imperial (lbs, ft)</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'1rem'}}>
          <div>
            <label className="tool-label">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <input type="number" placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'} value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} min="1" />
          </div>
          {unit === 'metric' ? (
            <div>
              <label className="tool-label">Height (cm)</label>
              <input type="number" placeholder="e.g. 170" value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} min="1" />
            </div>
          ) : (
            <div>
              <label className="tool-label">Height</label>
              <div style={{display:'flex', gap:'0.4rem'}}>
                <input type="number" placeholder="ft" value={heightFt} onChange={e => { setHeightFt(e.target.value); setResult(null) }} min="1" style={{width:'50%'}} />
                <input type="number" placeholder="in" value={heightIn} onChange={e => { setHeightIn(e.target.value); setResult(null) }} min="0" max="11" style={{width:'50%'}} />
              </div>
            </div>
          )}
        </div>

        <div className="btn-row">
          <button className="btn" onClick={calculate}>Calculate BMI</button>
          {result && <button className="btn btn-ghost" onClick={() => { setWeight(''); setHeight(''); setHeightFt(''); setHeightIn(''); setResult(null) }}>Clear</button>}
        </div>

        {result && (
          <div style={{marginTop:'1.5rem'}}>
            {/* Score card */}
            <div style={{background:'var(--bg)', border:`2px solid ${result.color}`, borderRadius:'12px', padding:'1.5rem', textAlign:'center', marginBottom:'1rem'}}>
              <div style={{fontSize:'0.72rem', color:'var(--text-dim)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.5rem'}}>Your BMI Score</div>
              <div style={{fontSize:'4rem', fontFamily:'Syne, sans-serif', fontWeight:'800', color:result.color, lineHeight:1}}>{result.bmi}</div>
              <div style={{fontSize:'1rem', fontFamily:'Syne, sans-serif', fontWeight:'700', color:result.color, marginTop:'0.5rem'}}>{result.category}</div>
              <div style={{fontSize:'0.82rem', color:'var(--text-dim)', marginTop:'0.75rem', lineHeight:1.7}}>{result.description}</div>
            </div>

            {/* Scale bar */}
            <div style={{marginBottom:'1rem'}}>
              <label className="tool-label">BMI Scale</label>
              <div style={{position:'relative', height:'28px', borderRadius:'8px', overflow:'visible', display:'flex', gap:'2px'}}>
                {[{c:'#ef4444',f:6},{c:'#f97316',f:2.5},{c:'#22c55e',f:6.5},{c:'#f97316',f:5},{c:'#ef4444',f:5},{c:'#dc2626',f:5},{c:'#991b1b',f:5}].map((s,i) => (
                  <div key={i} style={{flex:s.f, background:s.c, opacity:0.75, borderRadius: i===0?'8px 0 0 8px':i===6?'0 8px 8px 0':'0'}} />
                ))}
                <div style={{position:'absolute', left:`${getPointerPct(result.bmi)}%`, top:'-4px', bottom:'-4px', width:'4px', background:'white', transform:'translateX(-50%)', borderRadius:'2px', boxShadow:'0 0 8px rgba(0,0,0,0.6)'}} />
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.62rem', color:'var(--text-dim)', marginTop:'0.4rem'}}>
                <span>10</span><span>16</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px,1fr))', gap:'0.6rem', marginBottom:'1rem'}}>
              {[
                {label:'Ideal Min', value:`${result.idealMin} kg`},
                {label:'Ideal Max', value:`${result.idealMax} kg`},
                result.toLose ? {label:'To Lose', value:`${result.toLose} kg`, warn:true} : null,
                result.toGain ? {label:'To Gain', value:`${result.toGain} kg`, warn:true} : null,
              ].filter(Boolean).map((s:any, i) => (
                <div key={i} style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.75rem', textAlign:'center'}}>
                  <div style={{fontSize:'1.1rem', fontFamily:'Syne, sans-serif', fontWeight:'800', color: s.warn ? '#f97316' : 'var(--gold)'}}>{s.value}</div>
                  <div style={{fontSize:'0.68rem', color:'var(--text-dim)', marginTop:'0.2rem'}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Health tips */}
            <div style={{padding:'1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', marginBottom:'1rem'}}>
              <label className="tool-label">Personalized Health Tips</label>
              {result.advice.map((tip, i) => (
                <div key={i} style={{display:'flex', gap:'0.6rem', fontSize:'0.82rem', color:'var(--text-dim)', lineHeight:1.7, marginBottom:'0.3rem'}}>
                  <span style={{color:'var(--gold)'}}>✦</span><span>{tip}</span>
                </div>
              ))}
            </div>

            {/* BMI categories reference */}
            <div style={{padding:'1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', marginBottom:'1rem'}}>
              <label className="tool-label">BMI Categories</label>
              {[
                {range:'Below 16', label:'Severely Underweight', color:'#ef4444'},
                {range:'16 – 18.4', label:'Underweight', color:'#f97316'},
                {range:'18.5 – 24.9', label:'Normal Weight', color:'#22c55e'},
                {range:'25 – 29.9', label:'Overweight', color:'#f97316'},
                {range:'30 – 34.9', label:'Obese Class I', color:'#ef4444'},
                {range:'35 – 39.9', label:'Obese Class II', color:'#dc2626'},
                {range:'40 and above', label:'Obese Class III', color:'#991b1b'},
              ].map((c, i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', fontSize:'0.78rem', padding:'0.3rem 0', borderBottom:'1px solid var(--border)'}}>
                  <span style={{color: c.color, fontWeight:'600'}}>{c.range}</span>
                  <span style={{color:'var(--text-dim)'}}>{c.label}</span>
                </div>
              ))}
            </div>

            <div className="btn-row">
              <button className="btn btn-ghost" onClick={copy}>Copy Result</button>
            </div>
            <p style={{marginTop:'0.75rem', fontSize:'0.72rem', color:'var(--text-dim)', lineHeight:1.6}}>⚠️ BMI is a general screening tool and does not account for muscle mass, age, or ethnicity. Always consult a healthcare professional for medical advice.</p>
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Free BMI Calculator Online</h2>
        <p>Our BMI calculator instantly computes your Body Mass Index using your height and weight. It supports both metric and imperial units, and provides your BMI score, weight category, ideal weight range, and personalized health tips — completely free.</p>
        <h2>What is BMI?</h2>
        <p>Body Mass Index (BMI) is a number calculated from your height and weight that estimates your body fat level. A BMI below 18.5 is underweight, 18.5 to 24.9 is normal, 25 to 29.9 is overweight, and 30 or above is obese. These are general guidelines for adults aged 18 to 65.</p>
        <h2>BMI for Filipinos and Asians</h2>
        <p>For Asians including Filipinos, health experts recommend lower BMI thresholds — overweight starts at 23 and obesity at 27.5 — because Asians tend to carry more body fat at the same BMI compared to Western populations. Always consult your doctor for personalized advice.</p>
      </div>

      <RelatedTools current="/bmi-calculator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Result copied!</div>
    </main>
  )
}
