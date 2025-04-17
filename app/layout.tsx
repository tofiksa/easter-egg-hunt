import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bakermester Harepus - Påskebutikk Under Konstruksjon",
  description: "Påskebutikken for Bakermester Harepus er under konstruksjon. Vennligst kom tilbake senere.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
