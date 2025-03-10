"use client"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { animated } from "react-spring"
import {Rocket, TrendingUp, Headset} from "lucide-react"
import Link from "next/link"
import { Button } from '@/lib/components/ui/button'

const Presentation = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  return (
    <section id="studio" className="py-24">
      <div className="container-md text-center">
        <animated.header ref={animate} style={fade}>
            <p
              className="mb-3 text-sm text-blue uppercase"
              dangerouslySetInnerHTML={{ __html: content.studio.subtitle }}
            />
        </animated.header>
        <div className='px-12 text-xxl' dangerouslySetInnerHTML={{ __html: content.studio.desc }} />
        <aside className='grid grid-cols-3 gap-8 mt-16 text-md'>
          <div className='flex flex-col items-center px-12'>
            <Rocket className='mb-4 text-blue' size={50} />
            Booste ta visibilité pour attirer plus de clients
          </div>
          <div className='flex flex-col items-center px-12'>
            <TrendingUp className='mb-4 text-blue' size={50} />
            Des résultats rapides, mesurables et impactants
          </div>
          <div className='flex flex-col items-center px-12'>
            <Headset className='mb-4 text-blue' size={50} />
            Un interlocuteur dédié pour une communication claire
          </div>
        </aside>
      </div>
      <aside className="container rounded-lg bg-blue-950 mt-32 pt-24 pb-20 px-12 text-center text-xxl">
        <p className='font-title text-white text-8xl'>Un expert à votre écoute <span className='text-blue-600 block'>sans engagement !</span></p>
        <div className='mt-8 flex gap-4 justify-center'>
          <Button
              asChild
              size="lg"
              variant="outline"
              className='bg-white border-6 text-lg'
            >
              <Link href="/">
                Planifier un appel
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className='text-lg border-6 hover:bg-white'
            >
              <Link href="/">
                Message Whatsapp
              </Link>
            </Button>
        </div>
      </aside>
    </section>
    )
}

export default Presentation
