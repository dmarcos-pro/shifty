import Footer from "@container/footer"
import Header from "@container/header"
import { ThemeProvider } from "@lib/components/theme-provider"
import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      // defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="App bg-gray-50 dark:bg-gray-800">
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  )
}
