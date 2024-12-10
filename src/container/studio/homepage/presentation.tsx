"use client"

import { TextGenerateEffect } from "@/lib/components/ui/text-generate-effect"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { Button } from "@/lib/components/ui/button"
import Link from "next/link"
import content from "@contentJson"
import { animated } from "react-spring"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/lib/components/ui/dialog"
import { X } from "lucide-react"

const Presentation = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <section id="studio" className="py-48">
      <div className="container text-center">
        <animated.div ref={animate} style={fade}>
          <span
            className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: content.about.tag }}
          />
          <TextGenerateEffect 
            words={content.about.desc} 
            bold={true}
          />
        </animated.div>
        <animated.div ref={animate} style={fade} className={`transition delay-15`}>
          <Button 
            asChild 
            className="my-10"
            variant="outline"
            size={'lg'}
          >
            <Link href={``}>Découvrir le studio</Link>
          </Button>
        </animated.div>
      </div>
    </section>
  )
}

export default Presentation
