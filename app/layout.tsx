import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Raba - Join the Waitlist",
  description: "Be the first to experience Raba. Join our exclusive waitlist today.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Raba - Join the Waitlist</title>
        <meta name="description" content="Be the first to experience Raba. Join our exclusive waitlist today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Raba - Join the Waitlist" />
        <meta property="og:description" content="Be the first to experience Raba. Join our exclusive waitlist today." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://sendraba.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Raba - Join the Waitlist" />
        <meta name="twitter:description" content="Be the first to experience Raba. Join our exclusive waitlist today." />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
