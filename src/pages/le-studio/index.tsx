import Head from "../head"

import HeroBanner from "../../container/heroBanner"
import Services from "../../container/services"
import Studio from "../../container/studio"

const About = () => {
  return (
    <>
      <Head>Le studio</Head>
      <HeroBanner />
      <main>
        <Studio />
        <Services />
      </main>
    </>
  )
}

export default About
