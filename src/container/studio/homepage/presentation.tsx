"use client"

import { TextGenerateEffect } from "@/lib/components/ui/text-generate-effect"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { Button } from "@/lib/components/ui/button"
import Link from "next/link"
import content from "@contentJson"
import { animated } from "react-spring"

const Presentation = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <section id="studio" className="py-48">
      <div className="container">
        <div className="text-center">
          <animated.div ref={animate} style={fade}>
            <div>
              <span
                className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
                dangerouslySetInnerHTML={{ __html: content.about.tag }}
              />
              <TextGenerateEffect 
                words={content.about.desc} 
                bold={true}
              />
            </div>
            <Button asChild className="mt-xl">
              <Link href="/studio">Découvrir le studio</Link>
            </Button>
          </animated.div>
        </div>
      </div>
    </section>
  )
}

export default Presentation
