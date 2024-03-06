"use client"
import { fetchServices } from "@/api/index"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import Link from "next/link"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import Service from "./service"

const Services = () => {
  const { data: services } = useQuery("services", () => fetchServices())
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  return (
    <section id="services" className="pt-48">
      <div className="container">
        <div className="text-center">
          <animated.div ref={animate} style={fadeIn}>
            <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500">
              {content.services.tag}
            </span>
            <Heading tag="h2" content={content.services.title} />
          </animated.div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-16">
          {services &&
            services.map((service: ServicesProps, index: number) => {
              return (
                <Service
                  key={`offer-${service.id}`}
                  category={service.category}
                  name={service.name}
                  id={service.id}
                  title={service.title}
                  index={index}
                />
              )
            })}
        </div>
        <Button asChild className="my-10 mx-auto table">
          <Link href={content.contact.url}>{content.contact.content}</Link>
        </Button>
      </div>
    </section>
  )
}

export default Services
