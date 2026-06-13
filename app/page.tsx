import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FreeGenTools — Free Online Generator & Text Tools',
  description: '14 free online generator tools. Fancy text, symbols, passwords, QR codes, hashtags, word counter, lorem ipsum, and more. Fast, free, no signup required.',
}

const tools = [
  {
    href: '/fancy-text-generator',
    icon: '✦',
    name: 'Fancy Text Generator',
    desc: 'Transform your text into 100+ beautiful Unicode styles for social media, bios, and more.',
    tag: 'Most Popular',
  },
  {
    href: '/symbol-generator',
    icon: '◈',
    name: 'Symbol Generator',
    desc: 'Browse and copy 500+ symbols, special characters, arrows, and Unicode art.',
    tag: '',
  },
  {
    href: '/case-converter',
    icon: 'Aa',
    name: 'Case Converter',
    desc: 'Convert text to UPPERCASE, lowercase, Title Case, sentence case, and more instantly.',
    tag: '',
  },
  {
    href: '/word-counter',
    icon: '⌗',
    name: 'Word Counter',
    desc: 'Count words, characters, sentences, and paragraphs. Perfect for essays and SEO.',
    tag: '',
  },
  {
    href: '/password-generator',
    icon: '⚿',
    name: 'Password Generator',
    desc: 'Generate strong, secure random passwords with custom length and character options.',
    tag: '',
  },
  {
    href: '/qr-code-generator',
    icon: '▦',
    name: 'QR Code Generator',
    desc: 'Create free QR codes for URLs, text, WiFi, and more. Download as PNG instantly.',
    tag: 'New',
  },
  {
    href: '/lorem-ipsum-generator',
    icon: '¶',
    name: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text for design mockups and website development projects.',
    tag: '',
  },
  {
    href: '/random-number-generator',
    icon: '⚄',
    name: 'Random Number Generator',
    desc: 'Generate random numbers in any range. Great for raffles, games, and decisions.',
    tag: '',
  },
  {
    href: '/username-generator',
    icon: '@',
    name: 'Username Generator',
    desc: 'Create unique, creative usernames for games, social media, and online profiles.',
    tag: '',
  },
  {
    href: '/hashtag-generator',
    icon: '#',
    name: 'Hashtag Generator',
    desc: 'Generate relevant hashtags for TikTok, Instagram, Facebook, and Twitter posts.',
    tag: '',
  },
  {
    href: '/lotto-number-generator',
    icon: '🎰',
    name: 'Lotto Number Generator',
    desc: 'Generate lucky lotto numbers for Philippines PCSO, US Powerball, Canada, UK, and Australia.',
    tag: '',
  },
  {
    href: '/bmi-calculator',
    icon: '⚖️',
    name: 'BMI Calculator',
    desc: 'Calculate your Body Mass Index instantly. Get your BMI score, ideal weight range, and health tips.',
    tag: 'New',
  },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero fade-up">
        <div className="hero-badge">✦ 12 Tools · 100% Free · No Signup</div>
        <h1>Free Online <em>Generator</em> Tools for Everyone</h1>
        <p>Fancy text, symbols, passwords, QR codes, hashtags, and more. Fast, free, and works on any device.</p>
      </section>

      {/* ADSENSE SLOT - TOP */}
      {/* <div style={{textAlign:'center', margin:'0 auto 2rem', maxWidth:'728px'}}>
        AdSense leaderboard ad here
      </div> */}

      {/* TOOLS GRID */}
      <section className="tools-section fade-up-2">
        <div className="section-label">All Tools</div>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <div>
                <div className="tool-name">
                  {tool.name}
                  {tool.tag && (
                    <span style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.6rem',
                      background: 'rgba(245,200,66,0.15)',
                      color: '#F5C842',
                      border: '1px solid rgba(245,200,66,0.3)',
                      borderRadius: '4px',
                      padding: '0.1rem 0.4rem',
                      letterSpacing: '0.05em',
                      verticalAlign: 'middle',
                    }}>{tool.tag}</span>
                  )}
                </div>
                <div className="tool-desc">{tool.desc}</div>
              </div>
              <div className="tool-arrow">Use Tool →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO FOOTER CONTENT */}
      <section style={{maxWidth:'860px', margin:'0 auto', padding:'0 1.5rem 4rem'}}>
        <div className="seo-content fade-up-3">
          <h2>Free Generator Tools — No Account Required</h2>
          <p>
            FreeGenTools.com is your go-to destination for free online text and generator tools.
            Whether you are a student, content creator, developer, or small business owner,
            our tools help you work faster and smarter — completely free, with no signup needed.
          </p>
          <p>
            From generating fancy Unicode text for your social media bio, to creating secure passwords,
            custom QR codes for your business, or trending hashtags for your TikTok and Instagram posts —
            everything you need is right here in one place.
          </p>
          <p>
            All tools work directly in your browser. No downloads, no registration, no hidden fees.
            Just fast, reliable, free tools available 24/7 from any device.
          </p>
        </div>
      </section>
    </main>
  )
}
