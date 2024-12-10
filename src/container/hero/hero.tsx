"use client"

import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import Link from "next/link"
import { animated } from "react-spring"

export type heroProps = {
  name: string
}

const Hero = ({ name }: heroProps) => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")

  return (
    <div
      id={`hero-${name}`}
      className="py-48 flex items-center justify-center overflow-hidden relative bg-blue"
    >
      <div className="container text-center relative">
        <animated.div ref={animate} style={fade} className="transition delay-3">
          <Heading tag="h1" content={content.services.title} className='text-white' />
        </animated.div>
      </div>
    </div>
  )
}

export default Hero
