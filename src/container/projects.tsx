"use client"

import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type Projects } from "@type/component"
import { useQuery } from "react-query"

import { fetchProjects } from "@/api"
import Heading from "@/lib/components/heading"
import {
  Card,
  CardContent,
  CardFooter,
  CardSubDescription,
  CardTitle,
} from "@/lib/components/ui/card"
import content from "@contentJson"
import { Badge } from "@lib/components/ui/badge"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { animated } from "react-spring"

const Projects = () => {
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError,
  } = useQuery("projectsData", () => fetchProjects())

  if (projectsLoading) return <div>Loading...</div>
  if (projectsError) return <div>Error fetching data...</div>

  return (
    <section id="projects" className="pt-48">
      <div className="text-center">
        <animated.div ref={animate} style={fadeIn}>
          <span
            className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: content.projects.tag }}
          />
          <Heading tag="h2" content={content.projects.title} />
        </animated.div>
      </div>
      <div className="px-8 mt-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {projects &&
            projects
              // .filter((project: Projects) => !!project.main)
              .map((project: Projects, index: number) => {
                const img = `/images/project/mini/${project.id}.jpg`
                const tags = JSON.parse(project.tag)

                return (
                  <React.Fragment key={`project-${index}`}>
                    <Card className="flex flex-col rounded-lg">
                      <CardContent className="p-0 flex-1">
                        <div
                          style={{
                            backgroundImage: `url(${img})`,
                          }}
                          className={`rounded-tl-lg rounded-tr-lg bg-cover h-[200px] bg-center`}
                        ></div>
                        <div className="py-8 px-6">
                          <CardTitle className="mb-2 text-md">
                            {project.brand}
                          </CardTitle>
                          <CardSubDescription className="text-gray-500 font-bold">
                            {project.title}
                          </CardSubDescription>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: project.content,
                            }}
                            className="my-2 text-gray-800 dark:text-gray-500 text-sm leading-4"
                          />
                          {tags.map((item: string, index: number) => {
                            return (
                              <Badge
                                key={index}
                                className="uppercase border dark:border-gray-600 bg-transparent text-gray-500 pt-[3px] mr-1"
                              >
                                {item}
                              </Badge>
                            )
                          })}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={project.url}
                          className="flex items-center text-sm text-gray-500 hover:text-blue-dark hover:dark:text-blue-light"
                        >
                          <ChevronRight size="12" /> Voir le site
                        </Link>
                      </CardFooter>
                    </Card>
                  </React.Fragment>
                )
              })}
        </div>
      </div>
    </section>
  )
}
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "",
  },
]

export default Projects
