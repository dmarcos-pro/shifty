"use client"

import Project from "@/container/projects/homepage/project"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type Projects } from "@type/component"
import { useQuery } from "react-query"

import { fetchProjects } from "@/api"
import Heading from "@/lib/components/heading"
import content from "@contentJson"
import { animated } from "react-spring"
import Link from 'next/link'
import { Button } from "@/lib/components/ui/button"

const Projects = () => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery("projectsData", () => fetchProjects())

  if (projectsLoading) return <div>Loading...</div>
  if (projectsError) return <div>Error fetching data...</div>

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
              .filter((project: Projects) => !!project.main)
              .map((project: Projects, index: number) => {
                return <Project key={`project-${index}`} project={project} />
              })
          }
        </div>
          <div className='text-center'>
            <Button asChild className="mt-12">
              <Link href="/projects">Découvrir tous les projets</Link>
            </Button>
          </div>
      </div>
    </section>
  )
}

export default Projects
