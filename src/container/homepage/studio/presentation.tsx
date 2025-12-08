"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { animated } from "react-spring"
import {Rocket, TrendingUp, Headset} from "lucide-react"
import Link from "next/link"
import { Button } from '@/lib/components/ui/button'
import { useQuery } from "react-query"
import { getPromise, getBanner } from '@/api/strapi.server'

const Presentation = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const { data: promise, isLoading, isError } = useQuery("promise", () => getPromise())
  const { data: banner, isLoading: isLoadingBanner, isError: isErrorBanner } = useQuery("banner", () => getBanner())

  if (isLoading || isLoadingBanner) return <div>Loading...</div>
  if (isError || isErrorBanner) return <div>Error fetching data...</div>
  
  const ICON_MAP: { [key: string]: any } = {
    Rocket: Rocket,
    TrendingUp: TrendingUp,
    Headset: Headset,
  }
  
  return (
    <section id="studio" className="py-24">
      <div className="container-md text-center">
        <animated.header ref={animate} style={fade}>
          <p
            className="mb-3 text-sm text-blue uppercase"
            dangerouslySetInnerHTML={{ __html: promise?.data?.subtitle }}
          />
        </animated.header>
        <div className='px-12 text-xxl' dangerouslySetInnerHTML={{ __html: promise?.data?.title }} />
        <aside className='grid grid-cols-3 gap-8 mt-16 text-md'>
          {promise?.data?.list.map((item: any, index: number) => {
            const IconComponent = ICON_MAP[item.icon]
            return (
              <div key={`promise-item-${item.id}`} className='flex flex-col items-center px-12'>
                {IconComponent && <IconComponent className='mb-4 text-blue' size={50} />}
                <p className='text-base'>{item.text}</p>
              </div>
            )
          })}
        </aside>
      </div>
      <aside className="container rounded-lg bg-blue-950 mt-32 pt-24 pb-20 px-12 text-center text-xxl">
        <p className='font-title text-white text-8xl'>
          {banner?.data?.title} 
          <span className='text-blue-600 block'>
            {banner?.data?.subtitle}
          </span>
        </p>
        <div className='mt-8 flex gap-4 justify-center'>
          <Button
            asChild
            size="lg"
            variant="outline"
            className='bg-white border-6 text-lg'
          >
            <Link href={banner?.data?.scheduleUrl || '#'}>
              {banner?.data?.scheduleName}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className='text-lg border-6 hover:bg-white'
          >
            <Link href={banner?.data?.sendMessageUrl || '#'}>
              {banner?.data?.sendMessageName}
            </Link>
          </Button>
        </div>
      </aside>
    </section>
  )
}

export default Presentation
