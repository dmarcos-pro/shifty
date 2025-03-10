"use client"
import Hero from "@/container/hero/hero"
import ServicesContent from "@/container/services/index"
import HeroBanner from "@/container/hero/heroBanner"
import Head from "../head"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      {/* <Hero name={'services'} /> */}
      <HeroBanner type={'services'} />
      <ServicesContent />
    </>
  )
}

export default Page
