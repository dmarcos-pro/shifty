"use client"

import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type Projects } from "@type/component"
import { useQuery } from "react-query"

import { fetchProjects } from "@/api"
import Heading from "@/lib/components/heading"
import { Button } from "@/lib/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"
import content from "@contentJson"
import Image from "next/image"
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
            className="mb-3 block text-sm uppercase text-gray-300 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: content.projects.tag }}
          />
          <Heading tag="h2" content={content.projects.title} />
        </animated.div>
      </div>
      <div className="px-8 mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {projects &&
            projects
              // .filter((project: Projects) => !!project.main)
              .map((project: Projects, index: number) => {
                const imgMini = `/images/project/logo/${project.id}.png`
                const imgProject = `/images/project/mini/${project.id}.jpg`
                const tags = JSON.parse(project.tag)

                return (
                  <React.Fragment key={`project-${index}`}>
                    <Card className="flex flex-col rounded-lg">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">
                            {project.brand}
                          </CardTitle>
                          <Image src={imgMini} width="80" height="80" alt="" />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div
                          style={{
                            backgroundImage: `url(${imgProject})`,
                          }}
                          className={`rounded-lg bg-cover h-[200px] bg-center`}
                        ></div>

                        <CardDescription className="mt-4 font-bold">
                          {project.title}
                        </CardDescription>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: project.content,
                          }}
                          className="mt-2 text-sm leading-4"
                        />
                        <div className="flex mt-2">
                          {tags.map((item: string, index: number) => {
                            return (
                              <span
                                className="uppercase inline-block text-xs mr-2"
                                key={index}
                              >
                                #{item}
                              </span>
                            )
                          })}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="small"
                          size="sm"
                          className="mt-4 bg-gray-100 dark:bg-deepblue text-gray-400 hover:text-primary hover:dark:text-white"
                          asChild
                        >
                          <Link
                            href={project.url}
                            target="_blank"
                            className="w-full"
                          >
                            Voir le site
                          </Link>
                        </Button>
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
