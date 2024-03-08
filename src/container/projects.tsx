"use client"

import Project from "@/container/project"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { type Projects } from "@type/component"
import { useQuery } from "react-query"

import { fetchProjects } from "@/api"
import Heading from "@/lib/components/heading"
import content from "@contentJson"
import { animated } from "react-spring"

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
    <section id="projects" className="pt-48">
      <div className="text-center">
        <animated.div ref={animate} style={fade}>
          <span
            className="mb-3 block text-sm uppercase text-gray-300 dark:text-gray-500"
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
