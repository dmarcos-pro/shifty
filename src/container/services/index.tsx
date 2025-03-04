"use client"
import { useState, useEffect } from 'react'
import { animated } from "react-spring"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { useRouter } from 'next/router'
import SelectedService from "./selection"
import ContentServices from "./content"
import { fetchServices } from "@/api/index"
import { useQuery } from "react-query"
import { ServicesProps } from "@/type/component"
import content from "@contentJson"
import { PenTool, MousePointer2, Camera } from 'lucide-react'

const ServicesContent = () => {
  const router = useRouter()
  const { cat } = router.query as { cat: string }
  const [serviceSelected, setServiceSelected] = useState<number>(0)
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const [category, setCategory] = useState<'branding' | 'digital' | 'social_media'>('digital')

  const { data: services, isLoading, isError } = useQuery("services", () => fetchServices())
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  const categoryIcons = {
    branding: PenTool,
    digital: MousePointer2,
    social_media: Camera,
  }
  const categoryColors = {
    branding: 'bg-blue-800',
    digital: 'bg-blue-600',
    social_media: 'bg-blue-400',
  }

  return <section id="services" className="my-24">
    <div className="container flex gap-12 px-8">
      <animated.aside ref={animate} style={fade} className='flex-[3]'>
        <SelectedService
          category={category}
          setCategory={setCategory}
          cat={cat}
          serviceSelected={serviceSelected}
          setServiceSelected={setServiceSelected}
        />
      </animated.aside>
      <main className='flex-[9]'>
        <ContentServices 
          category={category}
          serviceSelected={serviceSelected}
        />
      </main>
        {/* <aside className='mt-12'>
          <hr className='my-8 border-gray-200 dark:border-gray-600' />
          <header className='text-2xl font-bold'>
          <Heading tag='h3' content="Quelques chiffres" />
          </header>
          <div className='grid grid-cols-3 gap-4 mt-4'>
            {category === 'branding' && (<>
              
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Clients qui ont dit &quot;Waouh&quot; dès la première présentation</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={10} endValue={23} delay={30} />
                </span>
                <p className='mt-4 text-sm'>On ne se souvient pas des autres !</p>
              </div>
            </>)}
            {category === 'digital' && (<>
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Nombre de débats sur le &quot;mode&nbsp;sombre&quot;</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={0} endValue={8} delay={30} />
                </span>
                <p className='mt-4 text-sm'>Verdict : toujours oui !</p>
              </div>
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Lignes de code inutiles</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={350} endValue={420} delay={20} />
                </span>
                <p className='mt-4 text-sm'>Inutiles… mais élégantes</p>
              </div>
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Nombre mensuel de cafés froids</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={13} endValue={28} delay={30} />
                </span>
                <p className='mt-4 text-sm'>Résoudre un bug, c&apos;est la priorité !</p>
              </div>
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Nombre de cookies mangés</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={6} endValue={18} delay={30} />
                </span>
                <p className='mt-4 text-sm'>Et ce ne sont pas ceux du RGPD !</p>
              </div>
              <div className='py-8 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg'>
                <p className='font-bold'>Nuits blanches pour finir un projet</p>
                <span className='block text-lg font-bold mt-2'>
                  <DataIncrementer startValue={4} endValue={14} delay={30} />
                </span>
                <p className='mt-4 text-sm'>Mais ça valait le coup !</p>
              </div>
            </>)}
          </div>
        </aside> */}
    </div>
  </section>
}

export default ServicesContent
