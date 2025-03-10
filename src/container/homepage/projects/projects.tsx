"use client"

import Project from "@/container/homepage/projects/project"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import Heading from "@/lib/components/heading"
import content from "@contentJson"
import { animated } from "react-spring"
import { Check, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/components/ui/carousel'
import { useState } from "react"
import Link from "next/link"

const Projects = () => {
  const { ref: animateTitle, fadeIn } = UseFadeInAnimation("fadeIn")
  const projects = content.projects.project
  const [projectActive, setProjectActive] = useState(0);

  return (
    <section id="projects" className="pb-48">
      <animated.header ref={animateTitle} style={fadeIn} className="text-center">
        <span
          className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
          dangerouslySetInnerHTML={{ __html: content.projects.tag }}
        />
        <Heading tag="h2" content={content.projects.title} />
      </animated.header>
      <div className="px-8 mt-12 container">
        {projects.length > 0 && (
          <><Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {projects &&
                projects
                .map((project, index: number) => (
                  <CarouselItem 
                    key={`project-${index}`} 
                    className="md:basis-1/2 lg:basis-1/5"
                    onClick={() => setProjectActive(index)}
                  >
                    <Project 
                      id={project.id}
                      brand={project.brand}
                      category={project.category}
                      selected={projectActive === index}
                    />
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="grid grid-cols-2 gap-8 mt-12 mb-12 items-center">
            <div
              style={{ backgroundImage: `url(/images/project/mini/${projects[projectActive].id}.jpg)`}}
              className={`bg-cover h-[400px] bg-center rounded-lg`}
            ></div>
            <div className='text-sm px-12'>
              {projects[projectActive].desc.map((desc, index) => ( 
                <div key={`project-content-${index}`}>
                  <p className={`text-gray-500 dark:text-gray-400 ${index !== 0 ? 'mt-6' : ''}`}>{desc.title}</p>
                  <ul className="mt-2">
                    {desc.result.map((item, i) =>
                      <li key={`project-desc-${i}`} className='flex py-1'>
                        <Check className="mr-2 text-green dark:text-green-300 relative -top-[3px]" width="20" />
                        <span className='flex-1' dangerouslySetInnerHTML={{ __html: item.text}} />
                      </li>
                    )}
                  </ul>
                </div>
              ))}
              {projects[projectActive].url !== '' && 
                <Link href={projects[projectActive].url} className='mt-6 flex items-center text-blue-500' target='_blank'>
                  <ChevronRight className="mr-1" width="14" />
                  Voir le site
                </Link>
              }
            </div>
          </div></>
        )}
          
        
      </div>
    </section>
  )
}

export default Projects
