import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import Image from "next/image"
import Link from "next/link"
import { animated } from "react-spring"
import { ProjectsProps } from "@/type/component"
import { Check } from "lucide-react"

const Project = ({ id, brand, category, url, desc }: ProjectsProps) => {
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const imgMini = `/images/project/logo/${id}.png`
  const imgProject = `/images/project/mini/${id}.jpg`
  return (
    <animated.div ref={animate} style={fade}>
      <Link href={url} target="_blank" passHref>
        <Card>
          <CardHeader>
              <Image src={imgMini} width="80" height="80" alt={`Logo ${id}`} className='table mx-auto' />
          </CardHeader>
          <CardContent className="flex-1 mt-4">
            <div
              style={{ backgroundImage: `url(${imgProject})`}}
              className={`bg-cover h-[200px] bg-center relative`}
            >
              <div className="absolute top-2 right-1">
                {category.map((item, index) => (
                  <span
                    className="uppercase inline-block text-xs bg-white mr-2 py-1 px-2 rounded-lg"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <CardTitle className="mt-8 text-sm">{brand}</CardTitle>
            <CardContent className="text-sm">
              {desc.map((desc, index) => ( <>
                <CardDescription key={index} className='text-gray-500 dark:text-gray-400 text-sm mt-6 p-0'>
                  {desc.title}
                </CardDescription>
                <div className="mt-2">
                  {desc.result.map((item, i) => <>
                    <span key={i} className='flex py-1'>
                      <Check className="mr-2 text-green dark:text-green-300 relative -top-[3px]" width="20" />
                      <span className='flex-1' dangerouslySetInnerHTML={{ __html: item.text}} />
                    </span>
                  </>)}
                </div>
              </>))}
            </CardContent>
          </CardContent>
        </Card>
      </Link>
    </animated.div>
  )
}

export default Project
