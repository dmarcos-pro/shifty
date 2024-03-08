import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { animated } from "react-spring"

export type projectProps = {
  project: {
    id: string
    tag: string
    brand: string
    title: string
    content: string
    url: string
  }
}

const Project = ({ project }: projectProps) => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const imgMini = `/images/project/logo/${project.id}.png`
  const imgProject = `/images/project/mini/${project.id}.jpg`
  const tags = JSON.parse(project.tag)
  return (
    <animated.div ref={animate} style={fade}>
      <Card className="flex flex-col rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-md">{project.brand}</CardTitle>
            <Image src={imgMini} width="80" height="80" alt="" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div
            style={{
              backgroundImage: `url(${imgProject})`,
            }}
            className={`rounded-lg bg-cover h-[200px] bg-center relative`}
          >
            <div className="absolute -bottom-2.5 right-2">
              {tags.map((item: string, index: number) => {
                return (
                  <span
                    className="uppercase inline-block text-xs text-white mr-2 bg-blue py-1 px-2 rounded-lg"
                    key={index}
                  >
                    {item}
                  </span>
                )
              })}
            </div>
          </div>
          <CardDescription className="mt-4 font-bold">
            {project.title}
          </CardDescription>
          <p
            dangerouslySetInnerHTML={{
              __html: project.content,
            }}
            className="mt-2 text-sm leading-4"
          />
        </CardContent>
        <CardFooter>
          <Link
            href={project.url}
            target="_blank"
            className="flex justify-end mt-4 text-blue-light hover:text-white"
          >
            <ExternalLink className="w-6 ml-1 -mt-0.5" />
          </Link>
        </CardFooter>
      </Card>
    </animated.div>
  )
}

export default Project
