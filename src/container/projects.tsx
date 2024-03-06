"use client"

import Heading from "@/lib/components/heading"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import content from "@contentJson"
import { Projects } from "@type/component"
import Link from "next/link"
import { useQuery } from "react-query"
import { animated } from "react-spring"

import { fetchProjects } from "@/api"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSubDescription,
  CardTitle,
} from "@/lib/components/ui/card"

const Projects = () => {
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery("projects", () => fetchProjects())

  return (
    <section className="pt-48">
      <div className="text-center">
        <animated.div ref={animate} style={fadeIn}>
          <span
            className="mb-3 block text-sm uppercase text-primary"
            dangerouslySetInnerHTML={{ __html: content.projects.tag }}
          />
          <Heading tag="h2" content={content.projects.title} />
        </animated.div>
      </div>
      <div className="px-8 mt-16">
        <div className="grid grid-cols-3 gap-4">
          {projects &&
            projects
              .filter((project: Projects) => !!project.main)
              .map((project: Projects, index: number) => {
                const img = `/images/project/mini/${project.id}.jpg`
                return (
                  <div key={`project-${index}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardSubDescription>{project.brand}</CardSubDescription>
                      </CardHeader>
                      <CardContent>
                        <div
                          style={{
                            backgroundImage: `url(${img})`,
                          }}
                          className={`bg-cover h-[200px] bg-center`}
                        ></div>
                        <p className="pl-2 border-l-2 border-blue mt-5 text-sm">
                          {project.content}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link
                          className="text-sm hover:text-blue-light"
                          href={project.url}
                          target="_blank"
                        >
                          Visiter le site
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                )
              })}
        </div>
      </div>
    </section>
  )
}

export default Projects
