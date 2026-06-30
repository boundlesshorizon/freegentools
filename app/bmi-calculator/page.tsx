'use client'
import { useState } from 'react'
import RelatedTools from '../../components/RelatedTools'

interface BMIResult { bmi: number; category: string; color: string; description: string; advice: string[]; idealMin: number; idealMax: number; toLose: number | null; toGain: number | null }

function calcBMI(weight: number, height: number, unit: string): BMIResult {
  let heightM: number, weightKg: number
  if (unit === 'metric') { heightM = height / 100; weightKg = weight } else { heightM = height * 0.0254; weightKg = weight * 0.453592 }
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10
  const idealMin = Math.round(18.5 * heightM * heightM * 10) / 10
  const idealMax = Math.round(24.9 * heightM * heightM * 10) / 10
  const toLose = weightKg > idealMax ? Math.round((weightKg - idealMax) * 10) / 10 : null
  const toGain = weightKg < idealMin ? Math.round((idealMin - weightKg) * 10) / 10 : null

  let category: string, color: string, description: string, advice: string[]
  if (bmi < 16) { category='Severely Underweight'; color='#ef4444'; description='Your BMI indicates severe underweight, affecting immune system and bone density.'; advice=['See a doctor or nutritionist','Increase calories with nutrient-dense foods','Add healthy fats: avocado, nuts, olive oil','Eat 5-6 smaller meals daily','Consider strength training'] }
  else if (bmi < 18.5) { category='Underweight'; color='#f97316'; description='Your BMI is below healthy range. Gaining weight will improve energy and health.'; advice=['Increase daily calories by 300-500','Eat protein-rich foods','Add healthy snacks between meals','Strength training 3x per week','Track food intake'] }
  else if (bmi < 25) { category='Normal Weight ✓'; color='#22c55e'; description='Your BMI is in the healthy range. Keep it up!'; advice=['Maintain balanced diet','Exercise 150+ minutes per week','Drink 8 glasses of water daily','Get 7-9 hours of sleep','Annual health checkups'] }
  else if (bmi < 30) { category='Overweight'; color='#f97316'; description='Your BMI is slightly above healthy. Small changes bring big results.'; advice=['Reduce daily calories by 300-500','Walk 30 minutes daily','Cut sugary drinks','Fill half plate with vegetables','Track meals with a diary'] }
  else if (bmi < 35) { category='Obese (Class I)'; color='#ef4444'; description='Your BMI indicates obesity. Changes now make a huge difference.'; advice=['Consult a doctor for a plan','20-30 minute daily walks','Eliminate sugary drinks','Reduce portion sizes','Focus on whole foods'] }
  else if (bmi < 40) { category='Obese (Class II)'; color='#dc2626'; description='Your BMI indicates severe obesity. Medical guidance is recommended.'; advice=['See a doctor for supervision','Work with a dietitian','Low-impact exercise: swimming, walking','Set small goals','Build a support system'] }
  else { category='Obese (Class III)'; color='#991b1b'; description='Your BMI indicates morbid obesity. Please seek medical help.'; advice=['Seek immediate medical consultation','Discuss medical weight loss options','Avoid extreme diets without supervision','Focus on sustainable changes','Mental health support helps'] }

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
    const h = unit === 'metric' ? parseFloat(height) : (parseFloat(heightFt||'0') * 12) + parseFloat(heightIn||'0')
    if (!w || !h || w <= 0 || h <= 0) return
    setResult(calcBMI(w, h, unit))
  }

  const getPointerPct = (bmi: number) => Math.min(98, Math.max(2, ((bmi - 10) / 35) * 100))
  const copy = () => { if (!result) return; navigator.clipboard.writeText(`BMI: ${result.bmi} — ${result.category}\nIdeal weight: ${result.idealMin}kg – ${result.idealMax}kg`); setToast(true); setTimeout(() => setToast(false), 2000) }

  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>BMI <span>Calculator</span></h1>
        <p>Calculate your Body Mass Index instantly. Get your BMI score, weight category, ideal weight range, and health tips.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Unit System</label>
        <div className="options-row">
          <button className={`opt-btn ${unit==='metric'?'active':''}`} onClick={() => { setUnit('metric'); setResult(null) }}>📏 Metric (kg, cm)</button>
          <button className={`opt-btn ${unit==='imperial'?'active':''}`} onClick={() => { setUnit('imperial'); setResult(null) }}>📐 Imperial (lbs, ft)</button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'1rem'}}>
          <div><label className="tool-label">Weight ({unit==='metric'?'kg':'lbs'})</label><input type="number" placeholder={unit==='metric'?'e.g. 70':'e.g. 154'} value={weight} onChange={e => { setWeight(e.target.value); setResult(null) }} /></div>
          {unit === 'metric' ? (
            <div><label className="tool-label">Height (cm)</label><input type="number" placeholder="e.g. 170" value={height} onChange={e => { setHeight(e.target.value); setResult(null) }} /></div>
          ) : (
            <div><label className="tool-label">Height</label>
              <div style={{display:'flex', gap:'0.4rem'}}>
                <input type="number" placeholder="ft" value={heightFt} onChange={e => { setHeightFt(e.target.value); setResult(null) }} style={{width:'50%'}} />
                <input type="number" placeholder="in" value={heightIn} onChange={e => { setHeightIn(e.target.value); setResult(null) }} style={{width:'50%'}} />
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
            <div style={{background:'var(--bg)', border:`2px solid ${result.color}`, borderRadius:'12px', padding:'1.5rem', textAlign:'center', marginBottom:'1rem'}}>
              <div style={{fontSize:'0.7rem', color:'var(--text-dim)', textTransform:'uppercase', marginBottom:'0.5rem'}}>Your BMI Score</div>
              <div style={{fontSize:'3.5rem', fontWeight:'800', color:result.color, lineHeight:1}}>{result.bmi}</div>
              <div style={{fontSize:'1rem', fontWeight:'700', color:result.color, marginTop:'0.5rem'}}>{result.category}</div>
              <div style={{fontSize:'0.8rem', color:'var(--text-dim)', marginTop:'0.75rem', lineHeight:1.7}}>{result.description}</div>
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label className="tool-label">BMI Scale</label>
              <div style={{position:'relative', height:'24px', borderRadius:'8px', display:'flex', gap:'2px'}}>
                {[{c:'#ef4444',f:6},{c:'#f97316',f:2.5},{c:'#22c55e',f:6.5},{c:'#f97316',f:5},{c:'#ef4444',f:5},{c:'#dc2626',f:5},{c:'#991b1b',f:5}].map((s,i) => <div key={i} style={{flex:s.f, background:s.c, opacity:0.75}} />)}
                <div style={{position:'absolute', left:`${getPointerPct(result.bmi)}%`, top:'-3px', bottom:'-3px', width:'3px', background:'white', transform:'translateX(-50%)'}} />
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px,1fr))', gap:'0.6rem', marginBottom:'1rem'}}>
              {[{label:'Ideal Min',value:`${result.idealMin} kg`},{label:'Ideal Max',value:`${result.idealMax} kg`},result.toLose?{label:'To Lose',value:`${result.toLose} kg`}:null,result.toGain?{label:'To Gain',value:`${result.toGain} kg`}:null].filter(Boolean).map((s: any, i) => (
                <div key={i} style={{background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.7rem', textAlign:'center'}}>
                  <div style={{fontSize:'1.05rem', fontWeight:'800', color:'var(--gold)'}}>{s.value}</div>
                  <div style={{fontSize:'0.65rem', color:'var(--text-dim)'}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{padding:'1rem', background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'8px'}}>
              <label className="tool-label">Health Tips</label>
              {result.advice.map((tip, i) => <div key={i} style={{display:'flex', gap:'0.5rem', fontSize:'0.8rem', color:'var(--text-dim)', marginBottom:'0.3rem'}}><span style={{color:'var(--gold)'}}>✦</span><span>{tip}</span></div>)}
            </div>
            <div className="btn-row"><button className="btn btn-ghost" onClick={copy}>Copy Result</button></div>
            <p style={{marginTop:'0.7rem', fontSize:'0.7rem', color:'var(--text-dim)'}}>⚠️ BMI doesn't account for muscle mass or age. Consult a healthcare professional.</p>
          </div>
        )}
      </div>
      <div className="seo-content fade-up-3">
        <h2>Free BMI Calculator</h2>
        <p>Calculate your Body Mass Index instantly with metric or imperial units. Get your score, category, ideal weight range, and health tips.</p>
        <h2>BMI for Filipinos and Asians</h2>
        <p>For Asians, health experts recommend lower thresholds — overweight starts at 23 and obesity at 27.5 — due to higher body fat at the same BMI.</p>
      </div>
      <RelatedTools current="/bmi-calculator" />
      <div className={`toast ${toast?'show':''}`}>✓ Result copied!</div>
    </main>
  )
}
