"use client"
import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import logo from "@images/logo.png"
import Image from "next/image"
import Link from "next/link"
import { animated } from "react-spring"
import { Send, CornerLeftDown } from 'lucide-react'

const name = process.env.NAME as string

type heroProps = {
  type?: 'home' | 'services' | 'studio'
}

type heroCtaProps = {
  content: string
  variant: buttonVariantProps
  url: string
  icon?: {
    name: string
    size: number
    class?: string
  }
  image?: {
    src: string
    alt: string
    style: string
  }
}

type buttonVariantProps = "noBorder" | "outline" | "outlineDark" | "outlineLight" | "fullDark" | "green" | "white" | "square" | "default" | undefined | null;

const HeroBanner = ({ type = 'home' }: heroProps) => {
  const { ref: animate, fade } = UseFadeInAnimation("fade")

  const CATEGORY_ICONS = {
    send: Send,
    corner: CornerLeftDown
  }
  
  const getImage = (name: string) => {
    return require(`@images/heroBanner/${name}`)
  }

  return (
    <section
      id={`hero-banner-${type}`}
      className="overflow-hidden"
    >
      <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-blue-300 -z-0'></div>
      <animated.div ref={animate} style={fade} className="transition delay-1 container-lg text-center mt-48 mb-24 relative z-1">
        <figure className="table mx-auto my-10">
          <Image
            width={150}
            height={80}
            src={logo.src}
            alt={`Logo ${name}`}
          />
        </figure>
        <Heading tag="h1" content={content.hero[type].h1} />
        <p
          className="mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: content.hero[type].intro }}
        />
        <div className="flex gap-4 justify-center mt-16">
          {content.hero[type] && content.hero[type].cta?.map((cta: heroCtaProps, index: number) => {
            const CustomIcon = CATEGORY_ICONS[cta?.icon?.name as keyof typeof CATEGORY_ICONS] || null
            let img = ''
            if (cta.image) {
              img = getImage(cta?.image?.src)
            }
            return (
              <Button
                key={`herobanner-cta-${index}`}
                asChild
                size="lg"
                variant={cta.variant as buttonVariantProps || 'default'}
              >
                <Link href={cta.url}>
                  {CustomIcon && !cta.image ? <CustomIcon size={cta?.icon?.size} className={`${cta.icon?.class ? cta.icon.class : ''} mr-2`} /> : null}
                  {cta.image ? <Image src={img} alt={cta?.image?.alt} width={100} height={100} className="top-[45px] relative -rotate-[10deg] -left-2" /> : null}
                  {cta.content}
                </Link>
              </Button>
            )
          })}
        </div>
      </animated.div>
      
    </section>
  )
}

export default HeroBanner
