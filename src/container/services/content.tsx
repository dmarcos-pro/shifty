"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { animated } from "react-spring"

const ServicesContent = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <>
      <section id="services-intro" className="py-48">
        <div className="container">
          <animated.div ref={animate} style={fade}>
            <span className="mb-3 block text-sm uppercase text-center text-gray-400 dark:text-gray-500">
              {content.services.content.introduction.title}
            </span>
            <p className="leading-6">
              {content.services.content.introduction.text} 
            </p> 
          </animated.div>
        </div>
        <div className="container mt-24">
          <Heading 
            tag="h2" 
            content={content.services.offer.service.digital[0].title}
          />
          <animated.div ref={animate} style={fade}>
            {content.services.content.digital.map((digital, index: number) => {
              return (
                  <div key={`services-digital-${index}`}>
                    <span className="mt-12 mb-3 block text-sm uppercase text-center text-gray-400 dark:text-gray-500">
                      {digital.title}
                    </span>
                    <p className="leading-6">
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
