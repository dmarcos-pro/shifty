"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { animated } from "react-spring"

const ServicesContent = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <>
      <section id="services-intro" className="pt-48 border-t border-t-gray-500">
        <div className="container">
          <div className="">
            <animated.div ref={animate} style={fade}>
              <span className="mb-3 block text-sm uppercase text-gray-400">
                {content.services.content.introduction.title}
              </span>
              <p className="text-white leading-6">
                {content.services.content.introduction.text} 
              </p> 
            </animated.div>
          </div>
        </div>
      </section>
      <section id="services-digital" className="pt-8">
        <div className="container pt-8">
          <Heading 
            tag="h2" 
            content={content.services.offer.service.digital[0].title} 
            className="text-white"
          />
          <animated.div ref={animate} style={fade}>
            {content.services.content.digital.map((digital, index: number) => {
              return (
                  <div key={`services-digital-${index}`}>
                    <span className="mb-3 block text-sm uppercase text-gray-400">
                      {digital.title}
                    </span>
                    <p className="text-white">
                      {digital.text}
                    </p> 
                  </div>
              )
            })}
          </animated.div>
          </div>
      </section>
    </>
  )
}

export default ServicesContent
