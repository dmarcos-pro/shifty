"use client"
import { fetchServices } from "@/api/index"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import Service from "@/container/services/homepage/service"
import { Button } from '@/lib/components/ui/button'
import { useState } from 'react'

const Services = () => {
  const { data: services,isLoading: servicesLoading, error: servicesError, } = useQuery("services", () => fetchServices())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [monthly, setMonthly] = useState(true)

  if (servicesLoading) return <div>Loading...</div>
  if (servicesError) return <div>Error fetching data...</div>

  return (
    <section id="services" className="pb-48">
      <div className="container">
        <animated.div ref={animate} style={fade}>
          <div className="text-center">
              <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-blue-300">
                {content.services.homepage.subtitle}
              </span>
              <Heading 
                tag="h2" 
                content={content.services.homepage.title}
              />
          </div>
        </animated.div>
        <animated.div ref={animate} style={fade} className={`transition delay-3`}>
          <div className='flex justify-center mt-8 gap-2'>
            <Button 
              onClick={() => setMonthly(true)}
              variant={monthly ? 'default' : 'outlineLight'}
              size="sm"
              className={`uppercase text-xs`}
              >
              Pack création
            </Button>
            <Button 
              onClick={() => setMonthly(false)}
              variant={monthly ? 'outlineLight' : 'default'}
              size="sm"
              className={`uppercase text-xs`}
              >
              Abonnement
            </Button>
          </div>
        </animated.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services &&
            services
            .filter((service: ServicesProps) => !service.monthly === monthly)
            .sort((a: ServicesProps, b: ServicesProps) => (a.order ?? 0) - (b.order ?? 0))
            .map((service: ServicesProps, index: number) => (
              <Service
                key={`offer-${service.id}`}
                id={service.id}
                category={service.category}
                index={index}
                isNew={service.isNew}
                availability={service.availability}
                price={service.price}
                monthly={service.monthly}
              />
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default Services
