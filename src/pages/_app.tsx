import { cn } from "@lib/utils"
import "@styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import Layout from "./layout"
import AnimatedCursor from 'react-animated-cursor'

// import { Inter as FontSans } from "next/font/google"
import { Figtree as FontSans } from "next/font/google"
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


type MyAppProps = AppProps & {
  Component: any
  pageProps: any
}

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatedCursor
        innerSize={16}
        outerSize={24}
        color="139, 179, 255"
        innerScale={0.2}
        outerScale={3}
      />
      <div
        className={cn(
          "min-h-screen font-sans text-base antialiased",
          fontSans.variable,
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
