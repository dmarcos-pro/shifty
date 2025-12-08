"use client"
import Heading from "@lib/components/heading"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import Service from "@/container/homepage/services/service"
import { Button } from '@/lib/components/ui/button'
import { useState } from 'react'
import { getOffer } from '@/api/strapi.server'

// Définir les types d'offres possibles
const OFFER_TYPES = [
  { value: "Service", label: "Prestation" },
  { value: "Subscription", label: "Abonnement" }
] as const

type OfferType = typeof OFFER_TYPES[number]['value']

const Services = () => {
  const { data: offer, isLoading, isError } = useQuery("offer", () => getOffer())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [selectedType, setSelectedType] = useState<OfferType>("Service")

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  return (
    <section id="services" className="px-10">
      <animated.div ref={animate} style={fade} className="container-lg p-24 ">
        <header className="text-center">
          <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500">
            {offer?.data?.subtitle}
          </span>
          <Heading tag="h2" content={offer?.data?.title} />
        </header>
        <animated.div ref={animate} style={fade} className={`transition delay-3`}>
          <div className='flex justify-center mt-8 gap-2'>
            {OFFER_TYPES.map((type) => (
              <Button 
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                variant={selectedType === type.value ? 'outline' : 'outlineLight'}
                size="sm"
                className={`uppercase text-xs`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </animated.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 container">
          {offer?.data?.list
            .filter((service: any) => service.type === selectedType)
            .map((service: any, index: number) => (
              <Service
                key={`service-${service.id}`}
                id={service.id}
                indexation={index}
                isNew={service.isNew}
                title={service.title}
                subtitle={service.subtitle}
                price={service.price}
                desc={service.description}
                subscription={selectedType === 'Subscription'}
                availability={service.availability}
              />
            ))}
        </div>
      </animated.div>
    </section>
  )
}

export default Services
