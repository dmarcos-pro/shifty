import Footer from "@container/footer"
import Header from "@container/header"
import { ThemeProvider } from "@lib/components/theme-provider"
import { useScroll } from "framer-motion"
import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { scrollYProgress } = useScroll()
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="App bg-gray-100 dark:bg-gray-800">
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  )
}
