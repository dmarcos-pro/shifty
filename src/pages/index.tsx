"use client"
import HeroBanner from "@/container/heroBanner/homepage"
import Feedback from "@container/feedback"
import Presentation from "@container/presentation"
import Services from "@container/services"
import Head from "./head"
import Projects from "@/container/projects"

const name = process.env.NAME as string

const Page = () => {
  return (
    <>
      <Head>{name}</Head>
      <HeroBanner />
      <main>
        <Services />
        <Presentation />
        <Projects />
        <Feedback />
      </main>
    </>
  )
}

export default Page
