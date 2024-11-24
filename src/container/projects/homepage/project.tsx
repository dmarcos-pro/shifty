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
      <Link href="/projects">
        <Card className="flex flex-col flex-1 rounded-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm">{project.brand}</CardTitle>
              <Link
              href={project.url}
              target="_blank"
              >
                <Image src={imgMini} width="80" height="80" alt="" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex-1 mt-md">
            <div
              style={{
                backgroundImage: `url(${imgProject})`,
              }}
              className={`bg-cover h-[200px] bg-center relative`}
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
            {/* <CardDescription className="mt-8 text-center">
              {project.title}
            </CardDescription> */}
            {/* <p
              dangerouslySetInnerHTML={{
                __html: project.content,
                }}
                className="mt-2 text-sm leading-4"
                /> */}
          </CardContent>
        </Card>
      </Link>
    </animated.div>
  )
}

export default Project
