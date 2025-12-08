"use client"
import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import logo from "@images/logo.png"
import Image from "next/image"
import Link from "next/link"
import { animated } from "react-spring"
import { Send, CornerRightDown } from 'lucide-react'
import { useQuery } from "react-query"
import { getHero } from '@/api/strapi.server'

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
  const { data: hero, isLoading, error } = useQuery("hero", () => getHero())
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching data...</div>

  return (
    <section
      id={`hero-banner-${type}`}
      className="overflow-hidden"
    >
      <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-blue-300 -z-0'></div>
      <animated.div ref={animate} style={fade} className="transition delay-1 container-lg text-center mt-48 mb-24 relative z-1">
        {/* <figure className="table mx-auto my-10">
          <Image
            width={150}
            height={80}
            src={logo.src}
            alt={`Logo ${name}`}
          />
        </figure> */}
        <Heading tag="h1" content={hero?.data?.title} />
        <p
          className="mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: hero?.data?.subtitle }}
        />
        <div className="flex gap-4 justify-center mt-16">
          <Button
            asChild
            size="lg"
            variant={'default'}
          >
            <Link href={hero?.data?.primaryLinkUrl}>
              {hero?.data?.primaryIconSize && 
                <Send size={hero?.data?.primaryIconSize} className="mr-2" />
              }
              {hero?.data?.primaryLinkContent}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant={'noBorder'}
            >
            <Link href={hero?.data?.secondaryLinkUrl}>
              {hero?.data?.secondaryLinkContent}
              {hero?.data?.secondaryIconSize && 
                <CornerRightDown size={hero?.data?.secondaryIconSize} className="ml-2 relative top-2" />
              }
            </Link>
          </Button>
        </div>
      </animated.div>
      
    </section>
  )
}

export default HeroBanner
