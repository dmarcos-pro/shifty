"use client"

import Heading from "@/lib/components/heading"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { animated } from "react-spring"
import { 
  Breadcrumb,
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/lib/components/ui/breadcrumb"

export type heroProps = {
  name: "services" | "studio"
}

const Hero = ({ name }: heroProps) => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeDown")

  return (
    <section
      id={`hero-${name}`}
      className="pt-48 pb-12 overflow-hidden"
    >
      <animated.div ref={animate} style={fade} className="container">
        <Heading tag="h1" content={content[name].h1} />
        <Breadcrumb className='my-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="leading-16 text-xl" dangerouslySetInnerHTML={{ __html: content[name].introduction }} />
      </animated.div>
    </section>
  )
}

export default Hero
