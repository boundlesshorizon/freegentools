'use client'
import { useState, useCallback } from 'react'
import RelatedTools from '../../components/RelatedTools'

const transformText = (text: string) => {
  const flipMap: Record<string,string> = {a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',J:'ɾ',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'d',Q:'Q',R:'ɹ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z','0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6'}
  const flip = (t: string) => t.split('').reverse().map(c => flipMap[c] ?? c).join('')
  const mirrorMap: Record<string,string> = {a:'ɒ',b:'d',c:'ɔ',d:'b',e:'ɘ',f:'ʇ',g:'ϱ',h:'ʜ',i:'i',j:'ⱼ',k:'ʞ',l:'l',m:'m',n:'n',o:'o',p:'q',q:'p',r:'ɿ',s:'ƨ',t:'ƚ',u:'u',v:'v',w:'w',x:'x',y:'y',z:'z',A:'A',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'ꟻ',H:'H',I:'I',J:'Ⴑ',K:'ʞ',L:'⅃',M:'M',N:'И',O:'O',P:'ꟼ',R:'Я',S:'Ƨ',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Z'}
  const mirror = (t: string) => t.split('').reverse().map(c => mirrorMap[c] ?? c).join('')
  const tinyMap: Record<string,string> = {a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'q',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',A:'ᴬ',B:'ᴮ',C:'ᶜ',D:'ᴰ',E:'ᴱ',F:'ᶠ',G:'ᴳ',H:'ᴴ',I:'ᴵ',J:'ᴶ',K:'ᴷ',L:'ᴸ',M:'ᴹ',N:'ᴺ',O:'ᴼ',P:'ᴾ',Q:'Q',R:'ᴿ',S:'ˢ',T:'ᵀ',U:'ᵁ',V:'ᵛ',W:'ᵂ',X:'ˣ',Y:'ʸ',Z:'ᶻ','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'}
  const tiny = (t: string) => t.split('').map(c => tinyMap[c] ?? c).join('')
  const bubbleMap: Record<string,string> = {a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ',A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ','0':'⓪','1':'①','2':'②','3':'③','4':'④','5':'⑤','6':'⑥','7':'⑦','8':'⑧','9':'⑨'}
  const bubble = (t: string) => t.split('').map(c => bubbleMap[c] ?? c).join('')
  const vaporMap: Record<string,string> = {a:'ａ',b:'ｂ',c:'ｃ',d:'ｄ',e:'ｅ',f:'ｆ',g:'ｇ',h:'ｈ',i:'ｉ',j:'ｊ',k:'ｋ',l:'ｌ',m:'ｍ',n:'ｎ',o:'ｏ',p:'ｐ',q:'ｑ',r:'ｒ',s:'ｓ',t:'ｔ',u:'ｕ',v:'ｖ',w:'ｗ',x:'ｘ',y:'ｙ',z:'ｚ',A:'Ａ',B:'Ｂ',C:'Ｃ',D:'Ｄ',E:'Ｅ',F:'Ｆ',G:'Ｇ',H:'Ｈ',I:'Ｉ',J:'Ｊ',K:'Ｋ',L:'Ｌ',M:'Ｍ',N:'Ｎ',O:'Ｏ',P:'Ｐ',Q:'Ｑ',R:'Ｒ',S:'Ｓ',T:'Ｔ',U:'Ｕ',V:'Ｖ',W:'Ｗ',X:'Ｘ',Y:'Ｙ',Z:'Ｚ','0':'０','1':'１','2':'２','3':'３','4':'４','5':'５','6':'６','7':'７','8':'８','9':'９'}
  const vapor = (t: string) => t.split('').map(c => vaporMap[c] ?? c).join('')

  const strike=(t:string)=>t.split('').join('\u0336')
  const underline=(t:string)=>t.split('').join('\u0332')
  const doubleUnder=(t:string)=>t.split('').join('\u0333')
  const overdots=(t:string)=>t.split('').join('\u0308')
  const tilde=(t:string)=>t.split('').join('\u0303')
  const slash=(t:string)=>t.split('').join('\u0338')
  const overline=(t:string)=>t.split('').join('\u0305')
  const zalgoL=(t:string)=>t.split('').map(c=>c+'\u0301\u0308').join('')
  const zalgoM=(t:string)=>t.split('').map(c=>c+'\u0308\u0336\u0301').join('')
  const zalgoH=(t:string)=>t.split('').map(c=>c+'\u0308\u0336\u0301\u0302\u0303').join('')
  const altCase=(t:string)=>t.split('').map((c,i)=>i%2===0?c.toLowerCase():c.toUpperCase()).join('')
  const altCase2=(t:string)=>t.split('').map((c,i)=>i%2===0?c.toUpperCase():c.toLowerCase()).join('')
  const inverse=(t:string)=>t.split('').map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join('')
  const upper=(t:string)=>t.toUpperCase()
  const lower=(t:string)=>t.toLowerCase()
  const sep=(s:string)=>(t:string)=>t.split('').join(s)
  const wide=sep(' '),dotSep=sep('.'),dashSep=sep('-'),tildeSep=sep('~'),pipeSep=sep('|'),starSep=sep('★'),heartSep=sep('♥'),dotStarSep=sep('·'),arrowSep=sep('›'),plusSep=sep('+'),xSep=sep('×'),diamondSep=sep('◆')
  const wrap=(pre:string,suf:string)=>(t:string)=>`${pre}${t}${suf}`

  const styles=[
    {name:'ⓑⓤⓑⓑⓛⓔ',fn:bubble},{name:'Ｖａｐｏｒｗａｖｅ',fn:vapor},
    {name:'↕ uʍop ǝpᴉsdn',fn:flip},{name:'↔ ɿoɿɿiM',fn:mirror},
    {name:'ᵗⁱⁿʸ ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ',fn:tiny},{name:'aLtErNaTiNg',fn:altCase},
    {name:'AlTeRnAtInG 2',fn:altCase2},{name:'iNVERSE cASE',fn:inverse},
    {name:'UPPERCASE',fn:upper},{name:'lowercase',fn:lower},
    {name:'[B][r][a][c][k][e][t]',fn:(t:string)=>t.split('').map(c=>c===' '?' ':`[${c}]`).join('')},
    {name:'(P)(a)(r)(e)(n)',fn:(t:string)=>t.split('').map(c=>c===' '?' ':`(${c})`).join('')},
    {name:'{C}{u}{r}{l}{y}',fn:(t:string)=>t.split('').map(c=>c===' '?' ':`{${c}}`).join('')},
    {name:'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶',fn:strike},{name:'U̲n̲d̲e̲r̲l̲i̲n̲e̲',fn:underline},
    {name:'D̳o̳u̳b̳l̳e̳ U̳n̳d̳e̳r̳',fn:doubleUnder},{name:'Ö̤v̤e̤r̤ D̤ö̤t̤s̤',fn:overdots},
    {name:'T̃ĩl̃d̃ẽ W̃ãṽẽ',fn:tilde},{name:'S̸l̸a̸s̸h̸e̸d̸',fn:slash},
    {name:'O̅v̅e̅r̅l̅i̅n̅e̅',fn:overline},{name:'Z̈a̤l̃g̈o̤ Light',fn:zalgoL},
    {name:'Z̈ä̤l̃g̈ö̤ Medium',fn:zalgoM},{name:'Z̈ä̤l̃g̈ö̤ Heavy',fn:zalgoH},
    {name:'Strike+Underline',fn:(t:string)=>t.split('').join('\u0336\u0332')},
    {name:'W I D E',fn:wide},{name:'S.p.a.c.e.d',fn:dotSep},{name:'S-p-a-c-e-d',fn:dashSep},
    {name:'S~p~a~c~e~d',fn:tildeSep},{name:'S|p|a|c|e|d',fn:pipeSep},
    {name:'S★p★a★c★e★d',fn:starSep},{name:'S♥p♥a♥c♥e♥d',fn:heartSep},
    {name:'S·p·a·c·e·d',fn:dotStarSep},{name:'S›p›a›c›e›d',fn:arrowSep},
    {name:'S+p+a+c+e+d',fn:plusSep},{name:'S×p×a×c×e×d',fn:xSep},
    {name:'S◆p◆a◆c◆e◆d',fn:diamondSep},{name:'S ✦ p ✦ a ✦ c ✦ e',fn:(t:string)=>t.split('').join(' ✦ ')},
    {name:'S — p — a — c — e',fn:(t:string)=>t.split('').join(' — ')},
    {name:'✨ Sparkle ✨',fn:wrap('✨ ',' ✨')},{name:'🔥 Fire 🔥',fn:wrap('🔥 ',' 🔥')},
    {name:'💎 Diamond 💎',fn:wrap('💎 ',' 💎')},{name:'⚔️ Swords ⚔️',fn:wrap('⚔️ ',' ⚔️')},
    {name:'🌟 Stars 🌟',fn:wrap('🌟 ',' 🌟')},{name:'💫 Cosmic 💫',fn:wrap('💫 ',' 💫')},
    {name:'🎯 Target 🎯',fn:wrap('🎯 ',' 🎯')},{name:'👑 Crown 👑',fn:wrap('👑 ',' 👑')},
    {name:'🌈 Rainbow 🌈',fn:wrap('🌈 ',' 🌈')},{name:'🦋 Butterfly 🦋',fn:wrap('🦋 ',' 🦋')},
    {name:'🌸 Sakura 🌸',fn:wrap('🌸 ',' 🌸')},{name:'💜 Purple 💜',fn:wrap('💜 ',' 💜')},
    {name:'❤️ Love ❤️',fn:wrap('❤️ ',' ❤️')},{name:'🖤 Dark 🖤',fn:wrap('🖤 ',' 🖤')},
    {name:'⭐ Star ⭐',fn:wrap('⭐ ',' ⭐')},{name:'🌙 Moon 🌙',fn:wrap('🌙 ',' 🌙')},
    {name:'☀️ Sun ☀️',fn:wrap('☀️ ',' ☀️')},{name:'🎀 Ribbon 🎀',fn:wrap('🎀 ',' 🎀')},
    {name:'🌊 Wave 🌊',fn:wrap('🌊 ',' 🌊')},{name:'⚡ Lightning ⚡',fn:wrap('⚡ ',' ⚡')},
    {name:'🏆 Trophy 🏆',fn:wrap('🏆 ',' 🏆')},{name:'🎮 Gamer 🎮',fn:wrap('🎮 ',' 🎮')},
    {name:'🎵 Music 🎵',fn:wrap('🎵 ',' 🎵')},{name:'🌺 Flower 🌺',fn:wrap('🌺 ',' 🌺')},
    {name:'🍀 Lucky 🍀',fn:wrap('🍀 ',' 🍀')},{name:'🎊 Party 🎊',fn:wrap('🎊 ',' 🎊')},
    {name:'🦁 Lion 🦁',fn:wrap('🦁 ',' 🦁')},{name:'🐉 Dragon 🐉',fn:wrap('🐉 ',' 🐉')},
    {name:'💀 Skull 💀',fn:wrap('💀 ',' 💀')},{name:'🔮 Magic 🔮',fn:wrap('🔮 ',' 🔮')},
    {name:'🧿 Evil Eye 🧿',fn:wrap('🧿 ',' 🧿')},{name:'🪄 Wizard 🪄',fn:wrap('🪄 ',' 🪄')},
    {name:'🦄 Unicorn 🦄',fn:wrap('🦄 ',' 🦄')},{name:'🌻 Sunflower 🌻',fn:wrap('🌻 ',' 🌻')},
    {name:'❄️ Snow ❄️',fn:wrap('❄️ ',' ❄️')},{name:'🔱 Trident 🔱',fn:wrap('🔱 ',' 🔱')},
    {name:'👻 Ghost 👻',fn:wrap('👻 ',' 👻')},{name:'🥷 Ninja 🥷',fn:wrap('🥷 ',' 🥷')},
    {name:'🐺 Wolf 🐺',fn:wrap('🐺 ',' 🐺')},{name:'🦊 Fox 🦊',fn:wrap('🦊 ',' 🦊')},
    {name:'꧁ ꧂ Ornament',fn:wrap('꧁ ',' ꧂')},{name:'【 】 Square',fn:wrap('【 ',' 】')},
    {name:'〖 〗 Bracket',fn:wrap('〖 ',' 〗')},{name:'《 》 Double',fn:wrap('《 ',' 》')},
    {name:'『 』 Corner',fn:wrap('『 ',' 』')},{name:'「 」 Box',fn:wrap('「 ',' 」')},
    {name:'★彡 彡★ Stream',fn:wrap('★彡 ',' 彡★')},{name:'•°• Border •°•',fn:wrap('•°• ',' •°•')},
    {name:'→ Arrow ←',fn:wrap('→ ',' ←')},{name:'✦ Star ✦',fn:wrap('✦ ',' ✦')},
    {name:'♛ Queen ♛',fn:wrap('♛ ',' ♛')},{name:'♔ King ♔',fn:wrap('♔ ',' ♔')},
    {name:'∞ Infinity ∞',fn:wrap('∞ ',' ∞')},{name:'✿ Flower ✿',fn:wrap('✿ ',' ✿')},
    {name:'◈ Diamond ◈',fn:wrap('◈ ',' ◈')},{name:'⊱ Curl ⊰',fn:wrap('⊱ ',' ⊰')},
    {name:'⋆ Mini Star ⋆',fn:wrap('⋆ ',' ⋆')},{name:'≋ Wave ≋',fn:wrap('≋ ',' ≋')},
    {name:'◤ Corner ◥',fn:wrap('◤ ',' ◥')},{name:'⛧ Dark Star ⛧',fn:wrap('⛧ ',' ⛧')},
    {name:'♠ Spade ♠',fn:wrap('♠ ',' ♠')},{name:'☯ Yin Yang ☯',fn:wrap('☯ ',' ☯')},
    {name:'✪ Star Circle ✪',fn:wrap('✪ ',' ✪')},{name:'❂ Sun Star ❂',fn:wrap('❂ ',' ❂')},
    {name:'※ Reference ※',fn:wrap('※ ',' ※')},{name:'⁂ Asterism ⁂',fn:wrap('⁂ ',' ⁂')},
    {name:'-=[ Border ]=-',fn:wrap('-=[ ',' ]=-')},{name:'•·.·• Dots •·.·•',fn:wrap('•·.·• ',' •·.·•')},
    {name:'°•○● Ring ●○•°',fn:wrap('°•○● ',' ●○•°')},{name:'»——[ Dash ]——«',fn:wrap('»——[ ',' ]——«')},
    {name:'══[ Double ]══',fn:wrap('══[ ',' ]══')},{name:'▶ Play ◀',fn:wrap('▶ ',' ◀')},
    {name:'◦○◦ Circle ◦○◦',fn:wrap('◦○◦ ',' ◦○◦')},
    {name:'ヽ(•‿•)ノ Happy',fn:(t:string)=>`ヽ(•‿•)ノ ${t} ヽ(•‿•)ノ`},
    {name:'¯\\_(ツ)_/¯ Shrug',fn:(t:string)=>`¯\\_(ツ)_/¯ ${t}`},
    {name:'ʕ•ᴥ•ʔ Bear',fn:wrap('ʕ•ᴥ•ʔ ',' ʕ•ᴥ•ʔ')},
    {name:'(ﾉ◕ヮ◕)ﾉ Celebrate',fn:(t:string)=>`(ﾉ◕ヮ◕)ﾉ ${t}`},
    {name:'✨ W I D E ✨',fn:(t:string)=>`✨ ${wide(t)} ✨`},
    {name:'🔥 W I D E 🔥',fn:(t:string)=>`🔥 ${wide(t)} 🔥`},
    {name:'💎 W I D E 💎',fn:(t:string)=>`💎 ${wide(t)} 💎`},
    {name:'👑 W I D E 👑',fn:(t:string)=>`👑 ${wide(t)} 👑`},
    {name:'꧁ W I D E ꧂',fn:(t:string)=>`꧁ ${wide(t)} ꧂`},
    {name:'【 W I D E 】',fn:(t:string)=>`【 ${wide(t)} 】`},
    {name:'《 W I D E 》',fn:(t:string)=>`《 ${wide(t)} 》`},
    {name:'👑 Bubble Crown 👑',fn:(t:string)=>`👑 ${bubble(t)} 👑`},
    {name:'🌟 Vapor Star 🌟',fn:(t:string)=>`🌟 ${vapor(t)} 🌟`},
    {name:'💎 Bubble Diamond 💎',fn:(t:string)=>`💎 ${bubble(t)} 💎`},
    {name:'꧁ Vapor ꧂',fn:(t:string)=>`꧁ ${vapor(t)} ꧂`},
    {name:'【 Bubble 】',fn:(t:string)=>`【 ${bubble(t)} 】`},
    {name:'★ Strike ★',fn:(t:string)=>`★ ${strike(t)} ★`},
    {name:'🔥 Flip 🔥',fn:(t:string)=>`🔥 ${flip(t)} 🔥`},
    {name:'✦ Tiny ✦',fn:(t:string)=>`✦ ${tiny(t)} ✦`},
    {name:'♛ Vapor ♛',fn:(t:string)=>`♛ ${vapor(t)} ♛`},
    {name:'🌸 Tiny 🌸',fn:(t:string)=>`🌸 ${tiny(t)} 🌸`},
    {name:'🔥 Vapor 🔥',fn:(t:string)=>`🔥 ${vapor(t)} 🔥`},
    {name:'✨ Bubble ✨',fn:(t:string)=>`✨ ${bubble(t)} ✨`},
    {name:'🔥💎 Fire Diamond 💎🔥',fn:wrap('🔥💎 ',' 💎🔥')},
    {name:'⚡🌟 Power Star 🌟⚡',fn:wrap('⚡🌟 ',' 🌟⚡')},
    {name:'👑💎 Royal 💎👑',fn:wrap('👑💎 ',' 💎👑')},
    {name:'🌸✨ Bloom Spark ✨🌸',fn:wrap('🌸✨ ',' ✨🌸')},
    {name:'🔮⚡ Magic Power ⚡🔮',fn:wrap('🔮⚡ ',' ⚡🔮')},
    {name:'🌟🔥 Star Fire 🔥🌟',fn:wrap('🌟🔥 ',' 🔥🌟')},
    {name:'🌈🌟 Rainbow Star 🌟🌈',fn:wrap('🌈🌟 ',' 🌟🌈')},
    {name:'💀⚔️ Dark Sword ⚔️💀',fn:wrap('💀⚔️ ',' ⚔️💀')},
    {name:'🐉🔥 Dragon Fire 🔥🐉',fn:wrap('🐉🔥 ',' 🔥🐉')},
    {name:'🌙⭐ Night Star ⭐🌙',fn:wrap('🌙⭐ ',' ⭐🌙')},
    {name:'Bubble + Wide',fn:(t:string)=>wide(bubble(t))},
    {name:'Vapor + Wide',fn:(t:string)=>wide(vapor(t))},
    {name:'Tiny + Wide',fn:(t:string)=>wide(tiny(t))},
    {name:'Upper + Wide',fn:(t:string)=>wide(upper(t))},
    {name:'Bubble + Dots',fn:(t:string)=>dotSep(bubble(t))},
    {name:'Vapor + Dots',fn:(t:string)=>dotSep(vapor(t))},
    {name:'Strike + Underline',fn:(t:string)=>underline(strike(t))},
    {name:'🔥 Bubble Wide 🔥',fn:(t:string)=>`🔥 ${wide(bubble(t))} 🔥`},
    {name:'👑 Vapor Wide 👑',fn:(t:string)=>`👑 ${wide(vapor(t))} 👑`},
    {name:'✨ Tiny Wide ✨',fn:(t:string)=>`✨ ${wide(tiny(t))} ✨`},
    {name:'꧁ Vapor Wide ꧂',fn:(t:string)=>`꧁ ${wide(vapor(t))} ꧂`},
    {name:'【 Bubble Dot 】',fn:(t:string)=>`【 ${dotSep(bubble(t))} 】`},
    {name:'♛ Upper Dot ♛',fn:(t:string)=>`♛ ${dotSep(upper(t))} ♛`},
  ]
  return styles.map(s=>{try{return{name:s.name,output:s.fn(text)}}catch{return{name:s.name,output:text}}})
}

export default function FancyTextGenerator() {
  const [input, setInput] = useState('')
  const [toast, setToast] = useState(false)
  const results = input.trim() ? transformText(input) : []
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }, [])
  return (
    <main className="tool-page">
      <div className="tool-header fade-up">
        <div className="breadcrumb"><a href="/">← All Tools</a></div>
        <h1>Fancy <span>Text</span> Generator</h1>
        <p>Transform your text into 300+ styles instantly. Zero boxes — works on Windows, Mac, Android, iOS, Facebook, TikTok, Instagram, Discord and more.</p>
      </div>
      <div className="tool-box fade-up-2">
        <label className="tool-label">Your Text</label>
        <textarea placeholder="Type something here..." value={input} onChange={e => setInput(e.target.value)} rows={3} />
        {input.trim() && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <span className="tool-label" style={{margin:0}}>{results.length} Styles Generated</span>
              <span style={{fontSize:'0.7rem',color:'var(--text-dim)'}}>Click any to copy</span>
            </div>
            <div className="fancy-grid">
              {results.map((r, i) => (
                <div key={i} className="fancy-item" onClick={() => copy(r.output)}>
                  <span className="style-text">{r.output || '—'}</span>
                  <button className="copy-btn">COPY</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {!input.trim() && <div className="output-box" style={{color:'var(--text-dim)',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>Your 300+ fancy text styles will appear here ✦</div>}
      </div>
      <div className="seo-content fade-up-3">
        <h2>What is a Fancy Text Generator?</h2>
        <p>A fancy text generator transforms your normal text into stylized Unicode characters, emoji borders, and special decorations. All styles work on Facebook, Instagram, TikTok, Twitter, Discord, and WhatsApp — no special fonts needed, and no boxes or broken characters on any device.</p>
        <h2>How to Use</h2>
        <p>Type or paste your text above. All 300+ styles generate instantly. Click any style to copy it to your clipboard, then paste anywhere. Works on Windows, Mac, Android, and iPhone.</p>
      </div>
      <RelatedTools current="/fancy-text-generator" />
      <div className={`toast ${toast?'show':''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
