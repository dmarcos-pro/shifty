"use client"

import Head from "./head"
import HeroBanner from "@/container/hero/heroBanner"
import Services from "@/container/services/homepage/services"
import Presentation from "@/container/studio/homepage/presentation"
import Projects from "@/container/projects/homepage/projects"
import Feedback from "@/container/projects/homepage/feedback"
import Simulator from "@/container/services/homepage/simulator/simulator"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <HeroBanner />
      <main>
        <Services />
        <Simulator />
        <Presentation />
        <Projects />
        <Feedback />
      </main>
    </>
  )
}

export default Page
