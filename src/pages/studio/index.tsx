"use client"
import Hero from "@/container/hero/hero"
import StudioContent from "@/container/studio/index"
import Head from "../head"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <Hero name={'studio'} />
      <StudioContent />
    </>
  )
}

export default Page
