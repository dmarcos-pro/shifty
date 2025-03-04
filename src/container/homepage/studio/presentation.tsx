"use client"
import { TextGenerateEffect } from "@/lib/components/ui/text-generate-effect"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { Button } from "@/lib/components/ui/button"
import Link from "next/link"
import content from "@contentJson"
import { animated } from "react-spring"

const Presentation = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const { ref: animateCta, fadeIn } = UseFadeInAnimation("fadeIn")
  return (
    <section id="studio" className="py-48 bg-blue-950">
      <div className="container-md text-center text-white">
        <animated.header ref={animate} style={fade}>
            <p
              className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
              dangerouslySetInnerHTML={{ __html: content.studio.subtitle }}
            />
        </animated.header>
        <TextGenerateEffect
          words={content.studio.desc}
          leading='leading-8'
          fontSize='text-xxl'
          className=''
        />
        <animated.footer ref={animateCta} style={fadeIn} className={`transition delay-6`}>
          <Button
            asChild
            className="my-10"
            size={'lg'}
            variant="outlineDark"
          >
            <Link href={``}>Découvrir le studio</Link>
          </Button>
        </animated.footer>
      </div>
    </section>
  )
}

export default Presentation
