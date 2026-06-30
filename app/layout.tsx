import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FreeGenTools — Free Online Generator Tools',
  description: '12 free online generator tools. Fancy text, symbols, passwords, QR codes, hashtags, word counter, lorem ipsum, random numbers, usernames, hashtags, lotto numbers, and BMI calculator. Fast, free, no signup.',
  keywords: 'free online tools, text generator, symbol generator, password generator, qr code generator, hashtag generator, word counter, bmi calculator, lotto number generator',
  openGraph: { title: 'FreeGenTools — Free Online Generator Tools', description: 'Fast, free online generator tools. No signup needed.', type: 'website', url: 'https://freegentools.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/" className="nav-logo">Free<span>Gen</span>Tools</a>
          <span className="nav-tag">12 Free Tools · No Signup</span>
        </nav>
        {children}
        <footer>
          <p>© 2025 FreeGenTools.com · <a href="/privacy-policy">Privacy Policy</a> · Built by <a href="https://boundlesshorizonholdings.com" target="_blank" rel="noopener">Boundless Horizon Holdings</a></p>
        </footer>
      </body>
    </html>
  )
}
