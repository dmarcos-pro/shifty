"use client"
import { fetchServices } from "@/api/index"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import Service from "@/container/services/homepage/service"

const Services = () => {
  const { data: services } = useQuery("services", () => fetchServices())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <section id="services" className="pb-48">
      <div className="container">
        <div className="text-center">
          <animated.div ref={animate} style={fade}>
            <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-blue-300">
              {content.services.homepage.subtitle}
            </span>
            <Heading 
              tag="h2" 
              content={content.services.homepage.title}
            />
          </animated.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services &&
            services.map((service: ServicesProps, index: number) => {
              return (
                <Service
                  key={`offer-${service.id}`}
                  category={service.category}
                  id={service.id}
                  url={`/`}
                  promotion={service.promotion}
                  isNew={service.isNew}
                  availability={service.availability}
                  index={index}
                />
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Services
