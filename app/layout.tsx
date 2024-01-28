import './css/style.css'

import { Inter } from 'next/font/google'
import Theme from './theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Mojo Real Time Markets',
  description: 'Created by Patrick Neiler, for Mojo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  )
}
