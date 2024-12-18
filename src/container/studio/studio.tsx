"use client"

import { TextGenerateEffect } from "@/lib/components/ui/text-generate-effect"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { animated } from "react-spring"

const Studio = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <section id="studio" className="py-48">
      <animated.div ref={animate} style={fade} className="container text-center">
        <header>
          <span
            className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: content.about.story.title }}
          />
        </header>
        <TextGenerateEffect 
          words={content.about.story.content} 
          fontSize={`text-sm md:text-md`}
          leading={`md:leading-[1rem]`} 
        />
      </animated.div>
    </section>
  )
}

export default Studio
