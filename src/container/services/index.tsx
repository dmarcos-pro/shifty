"use client"
import { useState } from 'react'
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { useRouter } from 'next/router'
import SelectedService from "./selection"
import ContentServices from "./content"

const ServicesContent = () => {
  const router = useRouter()
  const { cat } = router.query as { cat: string }
  const [serviceSelected, setServiceSelected] = useState<number>(0)
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [category, setCategory] = useState<'branding' | 'digital' | 'social_media'>('branding')
  

  return (
    <animated.section ref={animate} style={fade} id="services" className="my-24">
      <div className="container flex gap-12">
        <aside className='flex-[4]'>
          <SelectedService
            category={category}
            setCategory={setCategory}
            cat={cat}
            serviceSelected={serviceSelected}
            setServiceSelected={setServiceSelected}
          />
        </aside>
        <main className='flex-[8]'>
          <ContentServices 
            category={category}
            serviceSelected={serviceSelected}
          />
        </main>
      </div>
    </animated.section>
  )
}

export default ServicesContent
