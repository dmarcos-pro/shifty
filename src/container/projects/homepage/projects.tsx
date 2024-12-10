"use client"

import Project from "@/container/projects/homepage/project"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import Heading from "@/lib/components/heading"
import content from "@contentJson"
import { animated } from "react-spring"
import Link from 'next/link'
import { Button } from "@/lib/components/ui/button"

const Projects = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const projects = content.projects.project

  return (
    <section id="projects" className="pb-48">
      <div className="text-center">
        <animated.div ref={animate} style={fade}>
          <span
            className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: content.projects.tag }}
          />
          <Heading tag="h2" content={content.projects.title} />
        </animated.div>
      </div>
      <div className="px-8 mt-8 container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects &&
            projects
              .filter((project) => !!project.main)
              .map((project, index: number) => (
                <Project 
                  key={`project-${index}`} 
                  id={project.id}
                  brand={project.brand}
                  category={project.category}
                  main={project.main}
                  desc={project.desc}
                  url={project.url}
                />
              ))
          }
        </div>
        <animated.div ref={animate} style={fade} className={`transition delay-15 text-center`}>
          <Button 
            asChild 
            className="my-10"
            variant="outline"
            size={'lg'}
          >
            <Link href={``}>Voir tous les projets</Link>
          </Button>
        </animated.div>
      </div>
    </section>
  )
}

export default Projects
