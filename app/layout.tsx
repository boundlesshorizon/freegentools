import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FreeGenTools — Free Online Generator Tools',
  description: 'Free online generator tools for everyone. Fancy text, symbols, passwords, QR codes, hashtags, lorem ipsum, and more. Fast, free, no signup.',
  keywords: 'free online tools, text generator, symbol generator, password generator, qr code generator, hashtag generator, word counter',
  openGraph: {
    title: 'FreeGenTools — Free Online Generator Tools',
    description: 'Fast, free online generator tools. No signup needed.',
    type: 'website',
    url: 'https://freegentools.com',
  },
}

const tools = [
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
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/" className="nav-logo">Free<span>Gen</span>Tools</a>
          <span className="nav-tagline">12 Free Tools · No Signup</span>
        </nav>
        {children}
        <footer>
          <p>© 2025 FreeGenTools.com · <a href="/privacy-policy">Privacy Policy</a> · Built by <a href="https://boundlesshorizonholdings.com" target="_blank" rel="noopener">Boundless Horizon Holdings</a></p>
        </footer>
      </body>
    </html>
  )
}
