import type { Metadata } from 'next'
import { Space_Grotesk, Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})
const _notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
})

export const metadata: Metadata = {
  title: '아산신화초등학교 5학년 1반 - 꿈이 자라는 교실',
  description: '우리 반을 소개합니다. 함께 배우고, 함께 꿈꾸는 아산신화초등학교 5학년 1반!',
}

export const viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${_spaceGrotesk.variable} ${_notoSansKR.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
