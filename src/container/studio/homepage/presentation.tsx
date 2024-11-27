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
            <Dialog>
              <DialogTrigger className='mt-xl border border-3 border-blue px-6 py-3 rounded-full hover:bg-blue hover:text-white text-sm'>
                  Découvrir le studio
              </DialogTrigger>
              <DialogContent className="bg-white py-12 px-10 max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="font-title leading-8 dark:text-deepblue">
                    {content.about.story.title} 
                  </DialogTitle>
                  <DialogClose asChild>
                    <X className="text-primary absolute top-[6px] z-10 right-3 cursor-pointer" />
                  </DialogClose>
                  <DialogDescription className="font-title leading-5 dark:text-deepblue text-md">
                    <div dangerouslySetInnerHTML={{ __html: content.about.story.content }} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </animated.div>
        </div>
      </div>
    </section>
  )
}

export default Presentation
