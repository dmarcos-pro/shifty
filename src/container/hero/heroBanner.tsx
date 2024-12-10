"use client"
import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { fetchProjects } from "@api"
import content from "@contentJson"
import logo from "@images/logo.png"
import { type HeroBannerProject } from "@type/component"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { animated } from "react-spring"

const name = process.env.NAME as string

const HeroBanner = () => {
  const counterRef = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState<number>(0)
  const sizeImgRef = 100
  const marginRef = 20
  const [increment, setIncrement] = useState<boolean>(true)
  const [mobile, setMobile] = useState<boolean>(false)

  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")

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

  const getImage = (product: any) => {
    return require(`@images/project/logo/${product.id}.png`)
  }

  return (
    <div
      id="hero-banner"
      className="py-24 bg-blue dark:border-b dark:border-gray-700 h-screen flex items-center justify-center overflow-hidden relative"
    >
      <div className="container text-center relative">
        <animated.div ref={animate} style={fade} className="transition delay-3">
          <figure className="table mx-auto my-10">
            <Image
              width={120}
              height={80}
              style={{ width: "120px", height: "auto" }}
              src={logo.src}
              alt={`Logo ${name}`}
            />
          </figure>
          <Heading tag="h1" content={content.catch_phrase} className='text-white' />
          <p
            className="mt-4 text-white"
            dangerouslySetInnerHTML={{ __html: content.baseline }}
          />
          <Button 
            asChild 
            className="my-10"
            variant="outlineDark"
            size="lg"
          >
            <Link href={`mailto:${content.contact.url}`}>{content.contact.content}</Link>
          </Button>
        </animated.div>
      </div>
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
    </div>
  )
}

export default HeroBanner
