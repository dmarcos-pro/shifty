import { cn } from "@lib/utils"
import "@styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import Layout from "./layout"
import AnimatedCursor from 'react-animated-cursor'
import { useState } from "react"
import Head from "next/head"
import { getGlobal } from "@/api/strapi.server"

import { Poppins as FontSans } from "next/font/google"
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


type MyAppProps = AppProps & {
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent Component={Component} pageProps={pageProps} />
    </QueryClientProvider>
  )
}

function AppContent({ Component, pageProps }: { Component: any; pageProps: any }) {
  const { data: global } = useQuery("global", () => getGlobal())
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  return (
    <>
      <Head>
        {global?.data?.favicon?.url && (
          <link rel="icon" href={`${strapiUrl}${global.data.favicon.url}`} />
        )}
      </Head>
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
    </>
  )
}
