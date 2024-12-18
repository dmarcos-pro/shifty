"use client"

import Head from "./head"
import HeroBanner from "@/container/hero/heroBanner"
import Services from "@/container/homepage/services/services"
import Presentation from "@/container/studio/homepage/presentation"
import Projects from "@/container/homepage/projects/projects"
import Feedback from "@/container/homepage/feedback/feedback"
import Simulator from "@/container/homepage/simulator/simulator"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <HeroBanner />
      <Presentation />
      <Services />
      <Feedback />
      <Projects />
      <Simulator />
    </>
  )
}

export default Page
