'use client'
import Link from 'next/link'

const ALL_TOOLS = [
  { href: '/fancy-text-generator', icon: '✦', name: 'Fancy Text Generator' },
  { href: '/symbol-generator', icon: '◈', name: 'Symbol Generator' },
  { href: '/case-converter', icon: 'Aa', name: 'Case Converter' },
  { href: '/word-counter', icon: '⌗', name: 'Word Counter' },
  { href: '/password-generator', icon: '⚿', name: 'Password Generator' },
  { href: '/qr-code-generator', icon: '▦', name: 'QR Code Generator' },
  { href: '/lorem-ipsum-generator', icon: '¶', name: 'Lorem Ipsum Generator' },
  { href: '/random-number-generator', icon: '⚄', name: 'Random Number Generator' },
  { href: '/username-generator', icon: '@', name: 'Username Generator' },
  { href: '/hashtag-generator', icon: '#', name: 'Hashtag Generator' },
  { href: '/sentence-generator', icon: '✍', name: 'Sentence Generator' },
  { href: '/lotto-number-generator', icon: '🎰', name: 'Lotto Number Generator' },
  { href: '/bmi-calculator', icon: '⚖️', name: 'BMI Calculator' },
  { href: '/email-generator', icon: '✉️', name: 'Email Generator' },
  { href: '/essay-generator', icon: '📝', name: 'Essay Generator' },
]

export default function RelatedTools({ current }: { current: string }) {
  const related = ALL_TOOLS.filter(t => t.href !== current).slice(0, 4)
  return (
    <div className="related-tools">
      <div className="section-label">Other Free Tools</div>
      <div className="related-grid">
        {related.map(t => (
          <Link key={t.href} href={t.href} className="related-card">
            <span className="icon">{t.icon}</span>
            <span className="name">{t.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
