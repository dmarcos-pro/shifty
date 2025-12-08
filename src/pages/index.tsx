"use client"

import Head from "./head"
import HeroBanner from "@/container/hero/heroBanner"
import Services from "@/container/homepage/services/services"
import Presentation from "@/container/homepage/studio/presentation"
import Brand from "@/container/homepage/brand/brand"
import Feedback from "@/container/homepage/feedback/feedback"
import Simulator from "@/container/homepage/simulator/simulator"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <HeroBanner />
      <Brand />
      <Presentation />
      <Services />
      <Feedback />
      <Simulator />
    </>
  )
}

export default Page
