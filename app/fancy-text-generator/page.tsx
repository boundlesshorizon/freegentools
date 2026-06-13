'use client'
import { useState, useCallback } from 'react'
import RelatedTools from '../../components/RelatedTools'

const transformText = (text: string) => {
  const A = 'abcdefghijklmnopqrstuvwxyz'
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const N = '0123456789'

  // Generic mapper: builds a function from full replacement alphabets
  const mapAlphabet = (upper: string, lower: string, digits?: string) => (t: string) =>
    t.split('').map(c => {
      const ui = U.indexOf(c)
      if (ui >= 0) return upper[ui] ?? c
      const li = A.indexOf(c)
      if (li >= 0) return lower[li] ?? c
      if (digits) {
        const ni = N.indexOf(c)
        if (ni >= 0) return digits[ni] ?? c
      }
      return c
    }).join('')

  // Math Alphanumeric blocks
  const fromCodepoint = (upStart: number, loStart: number, numStart?: number) => {
    const upper = Array.from({length:26}, (_,i) => String.fromCodePoint(upStart+i)).join('')
    const lower = Array.from({length:26}, (_,i) => String.fromCodePoint(loStart+i)).join('')
    const digits = numStart ? Array.from({length:10}, (_,i) => String.fromCodePoint(numStart+i)).join('') : undefined
    return { upper, lower, digits }
  }

  const bold = (() => { const {upper,lower,digits} = fromCodepoint(0x1D400,0x1D41A,0x1D7CE); return mapAlphabet(upper,lower,digits) })()
  const italic = (() => { const {upper,lower} = fromCodepoint(0x1D434,0x1D44E); return mapAlphabet(upper,lower) })()
  const boldItalic = (() => { const {upper,lower} = fromCodepoint(0x1D468,0x1D482); return mapAlphabet(upper,lower) })()
  const script = (() => {
    const {upper,lower} = fromCodepoint(0x1D49C,0x1D4B6)
    const u = upper.split(''); const l = lower.split('')
    const upEx: Record<string,string> = {B:'\u212C',E:'\u2130',F:'\u2131',H:'\u210B',I:'\u2110',L:'\u2112',M:'\u2133',R:'\u211B'}
    const loEx: Record<string,string> = {e:'\u212F',g:'\u210A',o:'\u2134'}
    U.split('').forEach((ch,i) => { if (upEx[ch]) u[i] = upEx[ch] })
    A.split('').forEach((ch,i) => { if (loEx[ch]) l[i] = loEx[ch] })
    return mapAlphabet(u.join(''), l.join(''))
  })()
  const boldScript = (() => { const {upper,lower} = fromCodepoint(0x1D4D0,0x1D4EA); return mapAlphabet(upper,lower) })()
  const fraktur = (() => {
    const {upper,lower} = fromCodepoint(0x1D504,0x1D51E)
    const u = upper.split('')
    const upEx: Record<string,string> = {C:'\u212D',H:'\u210C',I:'\u2111',R:'\u211C',Z:'\u2128'}
    U.split('').forEach((ch,i) => { if (upEx[ch]) u[i] = upEx[ch] })
    return mapAlphabet(u.join(''), lower)
  })()
  const boldFraktur = (() => { const {upper,lower} = fromCodepoint(0x1D56C,0x1D586); return mapAlphabet(upper,lower) })()
  const doubleStruck = (() => {
    const {upper,lower,digits} = fromCodepoint(0x1D538,0x1D552,0x1D7D8)
    const u = upper.split('')
    const upEx: Record<string,string> = {C:'\u2102',H:'\u210D',N:'\u2115',P:'\u2119',Q:'\u211A',R:'\u211D',Z:'\u2124'}
    U.split('').forEach((ch,i) => { if (upEx[ch]) u[i] = upEx[ch] })
    return mapAlphabet(u.join(''), lower, digits)
  })()
  const sans = (() => { const {upper,lower,digits} = fromCodepoint(0x1D5A0,0x1D5BA,0x1D7E2); return mapAlphabet(upper,lower,digits) })()
  const sansBold = (() => { const {upper,lower,digits} = fromCodepoint(0x1D5D4,0x1D5EE,0x1D7EC); return mapAlphabet(upper,lower,digits) })()
  const sansItalic = (() => { const {upper,lower} = fromCodepoint(0x1D608,0x1D622); return mapAlphabet(upper,lower) })()
  const sansBoldItalic = (() => { const {upper,lower} = fromCodepoint(0x1D63C,0x1D656); return mapAlphabet(upper,lower) })()
  const monospace = (() => { const {upper,lower,digits} = fromCodepoint(0x1D670,0x1D68A,0x1D7F6); return mapAlphabet(upper,lower,digits) })()

  // Upside down map
  const flipMap: Record<string,string> = {
    a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',
    m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
    A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',J:'ɾ',K:'ʞ',L:'˥',
    M:'W',N:'N',O:'O',P:'d',Q:'Q',R:'ɹ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
    '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',
  }
  const flip = (t: string) => t.split('').reverse().map(c => flipMap[c] ?? c).join('')

  // Mirror map
  const mirrorMap: Record<string,string> = {
    a:'ɒ',b:'d',c:'ɔ',d:'b',e:'ɘ',f:'ʇ',g:'ϱ',h:'ʜ',i:'i',j:'ⱼ',k:'ʞ',l:'l',
    m:'m',n:'n',o:'o',p:'q',q:'p',r:'ɿ',s:'ƨ',t:'ƚ',u:'u',v:'v',w:'w',x:'x',y:'y',z:'z',
    A:'A',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'ꟻ',H:'H',I:'I',J:'Ⴑ',K:'ʞ',L:'⅃',
    M:'M',N:'И',O:'O',P:'ꟼ',R:'Я',S:'Ƨ',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Z',
  }
  const mirror = (t: string) => t.split('').reverse().map(c => mirrorMap[c] ?? c).join('')

  // Tiny superscript
  const tinyMap: Record<string,string> = {
    a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',
    m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'q',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',
    A:'ᴬ',B:'ᴮ',C:'ᶜ',D:'ᴰ',E:'ᴱ',F:'ᶠ',G:'ᴳ',H:'ᴴ',I:'ᴵ',J:'ᴶ',K:'ᴷ',L:'ᴸ',
    M:'ᴹ',N:'ᴺ',O:'ᴼ',P:'ᴾ',Q:'Q',R:'ᴿ',S:'ˢ',T:'ᵀ',U:'ᵁ',V:'ᵛ',W:'ᵂ',X:'ˣ',Y:'ʸ',Z:'ᶻ',
    '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  }
  const tiny = (t: string) => t.split('').map(c => tinyMap[c] ?? c).join('')

  // Bubble (circled letters)
  const bubbleL = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'
  const bubbleU = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'
  const bubbleN = '⓪①②③④⑤⑥⑦⑧⑨'
  const bubble = mapAlphabet(bubbleU, bubbleL, bubbleN)

  // Square / enclosed alphanumeric letters
  const squareU = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
  const square = mapAlphabet(squareU, squareU)

  // Vaporwave fullwidth
  const vaporL = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
  const vaporU = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
  const vaporN = '０１２３４５６７８９'
  const vapor = mapAlphabet(vaporU, vaporL, vaporN)

  // Combining diacritics
  const strike = (t: string) => t.split('').join('\u0336')
  const underline = (t: string) => t.split('').join('\u0332')
  const doubleUnder = (t: string) => t.split('').join('\u0333')
  const overdots = (t: string) => t.split('').join('\u0308')
  const tilde = (t: string) => t.split('').join('\u0303')
  const slash = (t: string) => t.split('').join('\u0338')
  const zalgoLight = (t: string) => t.split('').map(c => c + '\u0301\u0308').join('')
  const zalgoMed = (t: string) => t.split('').map(c => c + '\u0308\u0336\u0301').join('')

  // Case transforms
  const altCase = (t: string) => t.split('').map((c,i) => i%2===0 ? c.toLowerCase() : c.toUpperCase()).join('')
  const inverse = (t: string) => t.split('').map(c => c===c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')

  const styles = [
    // ===== PREMIUM FONT STYLES (most-used "cool fonts" — Canva/LingoJam style) =====
    { name: 'Bold', fn: bold },
    { name: 'Italic', fn: italic },
    { name: 'Bold Italic', fn: boldItalic },
    { name: 'Cursive Script', fn: script },
    { name: 'Bold Cursive', fn: boldScript },
    { name: 'Gothic / Fraktur', fn: fraktur },
    { name: 'Bold Gothic', fn: boldFraktur },
    { name: 'Double-Struck', fn: doubleStruck },
    { name: 'Sans Serif', fn: sans },
    { name: 'Sans Serif Bold', fn: sansBold },
    { name: 'Sans Serif Italic', fn: sansItalic },
    { name: 'Sans Serif Bold Italic', fn: sansBoldItalic },
    { name: 'Monospace', fn: monospace },
    { name: 'Circle Letters', fn: bubble },
    { name: 'Square Letters', fn: square },
    { name: 'Wide Fullwidth', fn: vapor },

    // Diacritic styles
    { name: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶', fn: strike },
    { name: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲', fn: underline },
    { name: 'D̳o̳u̳b̳l̳e̳ U̳n̳d̳e̳r̳l̳i̳n̳e̳', fn: doubleUnder },
    { name: 'Ö̤v̤e̤r̤ D̤ö̤t̤s̤', fn: overdots },
    { name: 'T̃ĩl̃d̃ẽ', fn: tilde },
    { name: 'S̸l̸a̸s̸h̸e̸d̸', fn: slash },
    { name: 'Z̈à̤l̃g̈o̤ L̃ight', fn: zalgoLight },
    { name: 'Z̈ä̤l̃g̈ö̤ M̃ëd̈', fn: zalgoMed },

    // Transform styles
    { name: '↕ uʍop ǝpᴉsdn', fn: flip },
    { name: '↔ ɿoɿɿiM txɘT', fn: mirror },
    { name: 'ᵗⁱⁿʸ ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ', fn: tiny },
    { name: 'aLtErNaTiNg CaSe', fn: altCase },
    { name: 'iNVERSE cASE', fn: inverse },
    { name: 'W I D E   T E X T', fn: (t: string) => t.split('').join(' ') },
    { name: 'S.p.a.c.e.d.O.u.t', fn: (t: string) => t.split('').join('.') },
    { name: 'S-p-a-c-e-d-2', fn: (t: string) => t.split('').join('-') },
    { name: 'S~p~a~c~e~d~3', fn: (t: string) => t.split('').join('~') },
    { name: 'S|p|a|c|e|d|4', fn: (t: string) => t.split('').join('|') },
    { name: 'S*p*a*c*e*d*5', fn: (t: string) => t.split('').join('*') },
    { name: 'S♥p♥a♥c♥e♥d♥6', fn: (t: string) => t.split('').join('♥') },
    { name: 'S★p★a★c★e★d★7', fn: (t: string) => t.split('').join('★') },
    { name: 'S⚡p⚡a⚡c⚡e⚡d⚡8', fn: (t: string) => t.split('').join('⚡') },

    // Emoji border styles
    { name: '✨ Sparkle ✨', fn: (t: string) => `✨ ${t} ✨` },
    { name: '🔥 Fire 🔥', fn: (t: string) => `🔥 ${t} 🔥` },
    { name: '💎 Diamond 💎', fn: (t: string) => `💎 ${t} 💎` },
    { name: '⚔️ Swords ⚔️', fn: (t: string) => `⚔️ ${t} ⚔️` },
    { name: '🌟 Stars 🌟', fn: (t: string) => `🌟 ${t} 🌟` },
    { name: '💫 Cosmic 💫', fn: (t: string) => `💫 ${t} 💫` },
    { name: '🎯 Target 🎯', fn: (t: string) => `🎯 ${t} 🎯` },
    { name: '👑 Crown 👑', fn: (t: string) => `👑 ${t} 👑` },
    { name: '🌈 Rainbow 🌈', fn: (t: string) => `🌈 ${t} 🌈` },
    { name: '🦋 Butterfly 🦋', fn: (t: string) => `🦋 ${t} 🦋` },
    { name: '🌸 Sakura 🌸', fn: (t: string) => `🌸 ${t} 🌸` },
    { name: '💜 Purple 💜', fn: (t: string) => `💜 ${t} 💜` },
    { name: '❤️ Love ❤️', fn: (t: string) => `❤️ ${t} ❤️` },
    { name: '🖤 Dark 🖤', fn: (t: string) => `🖤 ${t} 🖤` },
    { name: '⭐ Star ⭐', fn: (t: string) => `⭐ ${t} ⭐` },
    { name: '🌙 Moon 🌙', fn: (t: string) => `🌙 ${t} 🌙` },
    { name: '☀️ Sun ☀️', fn: (t: string) => `☀️ ${t} ☀️` },
    { name: '🎀 Ribbon 🎀', fn: (t: string) => `🎀 ${t} 🎀` },
    { name: '🌊 Wave 🌊', fn: (t: string) => `🌊 ${t} 🌊` },
    { name: '⚡ Lightning ⚡', fn: (t: string) => `⚡ ${t} ⚡` },
    { name: '🏆 Trophy 🏆', fn: (t: string) => `🏆 ${t} 🏆` },
    { name: '🎮 Gamer 🎮', fn: (t: string) => `🎮 ${t} 🎮` },
    { name: '🎵 Music 🎵', fn: (t: string) => `🎵 ${t} 🎵` },
    { name: '🌺 Flower 🌺', fn: (t: string) => `🌺 ${t} 🌺` },
    { name: '🍀 Lucky 🍀', fn: (t: string) => `🍀 ${t} 🍀` },
    { name: '🎊 Party 🎊', fn: (t: string) => `🎊 ${t} 🎊` },
    { name: '🦁 Lion 🦁', fn: (t: string) => `🦁 ${t} 🦁` },
    { name: '🐉 Dragon 🐉', fn: (t: string) => `🐉 ${t} 🐉` },
    { name: '🌍 World 🌍', fn: (t: string) => `🌍 ${t} 🌍` },
    { name: '💀 Skull 💀', fn: (t: string) => `💀 ${t} 💀` },
    { name: '🎸 Rock 🎸', fn: (t: string) => `🎸 ${t} 🎸` },
    { name: '🏄 Surf 🏄', fn: (t: string) => `🏄 ${t} 🏄` },
    { name: '🎭 Drama 🎭', fn: (t: string) => `🎭 ${t} 🎭` },
    { name: '🦊 Fox 🦊', fn: (t: string) => `🦊 ${t} 🦊` },
    { name: '🐺 Wolf 🐺', fn: (t: string) => `🐺 ${t} 🐺` },
    { name: '🌴 Tropical 🌴', fn: (t: string) => `🌴 ${t} 🌴` },
    { name: '🍓 Berry 🍓', fn: (t: string) => `🍓 ${t} 🍓` },
    { name: '🎆 Fireworks 🎆', fn: (t: string) => `🎆 ${t} 🎆` },
    { name: '🔮 Magic 🔮', fn: (t: string) => `🔮 ${t} 🔮` },
    { name: '🧿 Evil Eye 🧿', fn: (t: string) => `🧿 ${t} 🧿` },
    { name: '🪄 Wizard 🪄', fn: (t: string) => `🪄 ${t} 🪄` },

    // Symbol borders
    { name: '꧁ ꧂ Ornament', fn: (t: string) => `꧁ ${t} ꧂` },
    { name: '【 】 Square', fn: (t: string) => `【 ${t} 】` },
    { name: '〖 〗 Bracket', fn: (t: string) => `〖 ${t} 〗` },
    { name: '《 》 Double', fn: (t: string) => `《 ${t} 》` },
    { name: '『 』 Corner', fn: (t: string) => `『 ${t} 』` },
    { name: '「 」 Box', fn: (t: string) => `「 ${t} 」` },
    { name: '★彡 彡★ Stream', fn: (t: string) => `★彡 ${t} 彡★` },
    { name: '•°• Border •°•', fn: (t: string) => `•°• ${t} •°•` },
    { name: '→ Arrow ←', fn: (t: string) => `→ ${t} ←` },
    { name: '✦ Star Dot ✦', fn: (t: string) => `✦ ${t} ✦` },
    { name: '♛ Queen ♛', fn: (t: string) => `♛ ${t} ♛` },
    { name: '♔ King ♔', fn: (t: string) => `♔ ${t} ♔` },
    { name: '⚜ Fleur ⚜', fn: (t: string) => `⚜ ${t} ⚜` },
    { name: '∞ Infinity ∞', fn: (t: string) => `∞ ${t} ∞` },
    { name: '✿ Flower ✿', fn: (t: string) => `✿ ${t} ✿` },
    { name: '❋ Asterisk ❋', fn: (t: string) => `❋ ${t} ❋` },
    { name: '◈ Diamond ◈', fn: (t: string) => `◈ ${t} ◈` },
    { name: '⊱ Curl ⊰', fn: (t: string) => `⊱ ${t} ⊰` },
    { name: '⋆ Mini Star ⋆', fn: (t: string) => `⋆ ${t} ⋆` },
    { name: '░ Ghost ░', fn: (t: string) => t.split('').join('░') },
    { name: '▓ Block ▓', fn: (t: string) => `▓ ${t} ▓` },
    { name: '≋ Wave Line ≋', fn: (t: string) => `≋ ${t} ≋` },
    { name: '⫷ Angle ⫸', fn: (t: string) => `⫷ ${t} ⫸` },
    { name: '◤ Corner ◥', fn: (t: string) => `◤ ${t} ◥` },
    { name: '⛧ Dark Star ⛧', fn: (t: string) => `⛧ ${t} ⛧` },
    { name: '♠ Spade ♠', fn: (t: string) => `♠ ${t} ♠` },
    { name: '♣ Club ♣', fn: (t: string) => `♣ ${t} ♣` },
    { name: '☯ Yin Yang ☯', fn: (t: string) => `☯ ${t} ☯` },
    { name: '☮ Peace ☮', fn: (t: string) => `☮ ${t} ☮` },
    { name: '⚛ Atom ⚛', fn: (t: string) => `⚛ ${t} ⚛` },

    // Combo styles (premium font + border / spacing)
    { name: '✨ Bold Sparkle ✨', fn: (t: string) => `✨ ${bold(t)} ✨` },
    { name: '👑 Bold Crown 👑', fn: (t: string) => `👑 ${bold(t)} 👑` },
    { name: '💎 Script Diamond 💎', fn: (t: string) => `💎 ${script(t)} 💎` },
    { name: '🌟 Italic Star 🌟', fn: (t: string) => `🌟 ${italic(t)} 🌟` },
    { name: '꧁ Gothic Ornament ꧂', fn: (t: string) => `꧁ ${fraktur(t)} ꧂` },
    { name: '【 Bold Box 】', fn: (t: string) => `【 ${bold(t)} 】` },
    { name: '《 Double-Struck Angle 》', fn: (t: string) => `《 ${doubleStruck(t)} 》` },
    { name: '♛ Bold Script Queen ♛', fn: (t: string) => `♛ ${boldScript(t)} ♛` },
    { name: '🔥 W I D E Fire 🔥', fn: (t: string) => `🔥 ${t.split('').join(' ')} 🔥` },
    { name: '✨ W I D E Sparkle ✨', fn: (t: string) => `✨ ${t.split('').join(' ')} ✨` },
    { name: '👑 Bubble Crown 👑', fn: (t: string) => `👑 ${bubble(t)} 👑` },
    { name: '🌟 Vapor Star 🌟', fn: (t: string) => `🌟 ${vapor(t)} 🌟` },
    { name: '💎 Bubble Diamond 💎', fn: (t: string) => `💎 ${bubble(t)} 💎` },
    { name: '꧁ Vapor Ornament ꧂', fn: (t: string) => `꧁ ${vapor(t)} ꧂` },
    { name: '【 Bubble Box 】', fn: (t: string) => `【 ${bubble(t)} 】` },
    { name: '★ Strike Star ★', fn: (t: string) => `★ ${strike(t)} ★` },
    { name: '🔥 Upside Fire 🔥', fn: (t: string) => `🔥 ${flip(t)} 🔥` },
    { name: '✦ Tiny Star ✦', fn: (t: string) => `✦ ${tiny(t)} ✦` },
    { name: '《 Wide Angle 》', fn: (t: string) => `《 ${t.split('').join(' ')} 》` },
    { name: '♛ Vapor Queen ♛', fn: (t: string) => `♛ ${vapor(t)} ♛` },
  ]

  return styles.map(s => ({ name: s.name, output: s.fn(text) }))
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
        <h1>Cool Fonts &amp; <span>Fancy Text</span> Generator</h1>
        <p>Type your text and get 100+ cool fonts, stylish letters, and symbols for your Instagram bio, TikTok name, Discord, and Facebook — copy and paste, no apps needed.</p>
      </div>

      <div className="tool-box fade-up-2">
        <label className="tool-label">Your Text</label>
        <textarea
          placeholder="Type something here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
        />
        {input.trim() && (
          <div style={{marginTop:'1.25rem'}}>
            <div className="output-label">
              <span className="tool-label" style={{margin:0}}>{results.length} Fonts &amp; Styles Generated</span>
              <span style={{fontSize:'0.72rem', color:'var(--text-dim)'}}>Click any to copy</span>
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
        {!input.trim() && (
          <div className="output-box" style={{color:'var(--text-dim)', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Your 100+ cool fonts and fancy text styles will appear here ✦
          </div>
        )}
      </div>

      <div className="seo-content fade-up-3">
        <h2>Cool Fonts for Instagram Bio, TikTok &amp; Discord — Copy and Paste</h2>
        <p>This fancy text generator turns plain text into 100+ cool fonts and stylish letters — bold, italic, cursive script, gothic/fraktur, double-struck, monospace, bubble letters, and more — using special Unicode characters. Copy any style and paste it directly into your Instagram bio, TikTok username, Facebook post, Discord nickname, Twitter/X profile, or WhatsApp status. No font installation, no apps, and no signup required.</p>
        <h2>How to Make Your Bio Stand Out with Aesthetic Fonts</h2>
        <p>Type your name or text in the box above. Instantly get bold fonts, italic fonts, cursive fonts, gothic letters, circle/bubble letters, and dozens of emoji-decorated and symbol-bordered styles — the same aesthetic look people get from Canva font generators, but ready to paste anywhere text is accepted. Click any style to copy it to your clipboard.</p>
        <h2>Frequently Asked Questions</h2>
        <h3>Will these fancy fonts work on Instagram and TikTok?</h3>
        <p>Yes. These are real Unicode characters, not images or custom fonts, so they display correctly in Instagram bios, TikTok usernames and captions, Facebook posts, Discord nicknames, Twitter/X, and WhatsApp.</p>
        <h3>What's the difference between this and a Canva font generator?</h3>
        <p>Canva fonts are typically image-based or require their editor. This tool generates copy-paste text fonts that work anywhere plain text is accepted — bios, usernames, chat apps, and comments — with no design software needed.</p>
        <h3>Which font style is most popular for bios?</h3>
        <p>Bold, italic, and cursive script styles are the most commonly used for Instagram and TikTok bios, while bubble letters and emoji-bordered styles are popular for usernames and gamer tags.</p>
        <h3>Is this fancy text generator free?</h3>
        <p>Yes, completely free with no account, signup, or download required. Generate and copy unlimited styles.</p>
      </div>

      <RelatedTools current="/fancy-text-generator" />
      <div className={`toast ${toast ? 'show' : ''}`}>✓ Copied to clipboard!</div>
    </main>
  )
}
