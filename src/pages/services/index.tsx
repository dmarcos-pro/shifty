"use client"
import Hero from "@/container/hero/hero"
import ServicesContent from "@/container/services/content"
import Head from "../head"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <Hero name={'services'} />
      <main>
        <ServicesContent />
      </main>
    </>
  )
}

export default Page
