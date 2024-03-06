"use client"
import Heading from "@/lib/components/heading"
import { BackgroundBeams } from "@/lib/components/ui/background-beams"
import { Button } from "@/lib/components/ui/button"
import { fetchProjects } from "@api"
import content from "@contentJson"
import logo from "@images/logo.png"
import { type HeroBannerProject } from "@type/component"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"

const name = process.env.NAME as string

const HeroBanner = () => {
  const counterRef = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState<number>(0)
  const sizeImgRef = 100
  const marginRef = 20
  const [increment, setIncrement] = useState<boolean>(true)
  const [mobile, setMobile] = useState<boolean>(false)

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

      const updateDevice = () => {
        setMobile(window.innerWidth <= 768 ? true : false)
      }
      updateDevice()
      window.addEventListener("resize", updateDevice)

      return () => {
        window.removeEventListener("resize", updateDevice)
        clearInterval(interval)
      }
    }
  }, [isLoading, isError, projects, counter, sizeImgRef, increment])

  const getImage = (product: any) => {
    return require(`@images/project/logo/${product.id}.png`)
  }

  return (
    <div className="py-24 h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />
      <div className="container text-center relative">
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
        <Button asChild className="my-10">
          <Link href={content.contact.url}>{content.contact.content}</Link>
        </Button>
      </div>
      <div ref={counterRef} className="p-4 absolute bottom-0">
        <div>
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
