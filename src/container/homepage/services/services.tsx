"use client"
import { fetchServices } from "@/api/index"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import Heading from "@lib/components/heading"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import Service from "@/container/homepage/services/service"
import { Button } from '@/lib/components/ui/button'
import { useState } from 'react'

const Services = () => {
  const { data: services, isLoading: servicesLoading, error: servicesError, } = useQuery("services", () => fetchServices())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [monthly, setMonthly] = useState(true)

  if (servicesLoading) return <div>Loading...</div>
  if (servicesError) return <div>Error fetching data...</div>

  return (
    <section id="services" className="pb-48">
      <div className="container">
        <animated.header ref={animate} style={fade} className="text-center">
          <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-blue-300">
            {content.services.subtitle}
          </span>
          <Heading tag="h2" content={content.services.title} />
        </animated.header>
        <animated.div ref={animate} style={fade} className={`transition delay-3`}>
          <div className='flex justify-center mt-8 gap-2'>
            <Button 
              onClick={() => setMonthly(true)}
              variant={monthly ? 'outline' : 'outlineLight'}
              size="sm"
              className={`uppercase text-xs`}
              >
              Prestation
            </Button>
            <Button 
              onClick={() => setMonthly(false)}
              variant={monthly ? 'outlineLight' : 'outline'}
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
                key={`service-${index}`}
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
