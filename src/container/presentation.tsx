"use client"

import { TextGenerateEffect } from "@/lib/components/ui/text-generate-effect"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { animated } from "react-spring"

const Presentation = () => {
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  return (
    <section id="studio" className="pt-48">
      <div className="container">
        <div className="text-center">
          <animated.div ref={animate} style={fadeIn}>
            <div>
              <span
                className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
                dangerouslySetInnerHTML={{ __html: content.about.tag }}
              />
              <TextGenerateEffect words={content.about.desc} />
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  )
}

export default Presentation
