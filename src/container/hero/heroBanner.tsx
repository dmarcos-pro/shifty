"use client"
import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { fetchProjects, fetchNav } from "@api"
import content from "@contentJson"
import logo from "@images/logo.png"
import { type HeroBannerProject } from "@type/component"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { Send, Layers } from 'lucide-react'

const name = process.env.NAME as string

const HeroBanner = () => {
  const counterRef = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState<number>(0)
  const sizeImgRef = 100
  const marginRef = 20
  const [increment, setIncrement] = useState<boolean>(true)
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const { data: nav } = useQuery("nav", () => fetchNav())
  const navService = nav ? nav.filter((item:any) => item.name === "Services") : []

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery("projects", () => fetchProjects())

  useEffect(() => {
    if (!isLoading && !isError && projects) {
      const imgWidth = projects.length * (sizeImgRef + marginRef)
      const sizeCounterBox = counterRef.current
        ? counterRef?.current?.clientWidth
        : 0

      const interval = setInterval(() => {
        if (increment) {
          setCounter((prevCounter) => prevCounter + 1)
          if (counter >= imgWidth - sizeCounterBox) {
            setIncrement(false)
          }
        } else {
          setCounter((prevCounter) => prevCounter - 1)
          if (counter <= 0) {
            setIncrement(true)
          }
        }
      }, 30)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isLoading, isError, projects, counter, sizeImgRef, increment])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  const getImage = (product: any) => {
    return require(`@images/project/logo/${product.id}.png`)
  }

  return (
    <section
      id="hero-banner"
      className="py-24 h-screen flex items-center justify-center overflow-hidden"
    >
      <animated.div ref={animate} style={fade} className="transition delay-2 container text-center">
        <figure className="table mx-auto my-10">
          <Image
            width={120}
            height={80}
            style={{ width: "120px", height: "auto" }}
            src={logo.src}
            alt={`Logo ${name}`}
          />
        </figure>
        <Heading tag="h1" content={content.catch_phrase} />
        <p
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: content.baseline }}
        />
        <div className="flex gap-4 justify-center my-10">
          <Button
            asChild
            size="lg"
          >
            <Link href={`mailto:${content.contact.url}`}>
              <Send size={16} className='mr-2' />
              {content.contact.content}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outlineLight"
          >
            <Link href={`${navService[0].link}`}>
              <Layers size={`16`} className='mr-2' />
              Voir nos services
            </Link>
          </Button>
        </div>
      </animated.div>
      <div ref={counterRef} className="p-4 absolute bottom-0 bg-white dark:bg-gray-800 w-full">
        <div className='container'>
          <div className="flex relative" style={{ left: `-${counter}px` }}>
            {projects &&
              projects.map((project: HeroBannerProject, index: number) => {
                const img = getImage(project)
                return (
                  <figure
                    key={`ref-${project.id}-${index}`}
                    style={{
                      flex: `1 0 ${sizeImgRef}px`,
                      marginRight: marginRef,
                    }}
                  >
                    <Link href={project.url} target="_blank">
                      <Image
                        style={{opacity: '0.5'}}
                        height={48}
                        width={sizeImgRef}
                        src={img}
                        alt={project.brand}
                      />
                    </Link>
                  </figure>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
