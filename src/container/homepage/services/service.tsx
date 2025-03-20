import { Button } from "@/lib/components/ui/button"
import Heading, { fontTitle } from "@/lib/components/heading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { ServicesIntroProps } from "@/type/component"
import content from "@contentJson"
import Link from "next/link"
import { animated } from "react-spring"
import { Check, ChevronRight } from "lucide-react"
import { useRouter } from 'next/router'

const delays = ["delay-2", "delay-4", "delay-6", "delay-8"]

type ServiceItem = {
  resume: {
    title?: string;
    desc?: { title: string }[];
  }
  content?: {
    title: string;
    resume: string;
    list: {
      title: string;
      content: string[];
    }[];
    footer: {
      title: string;
      content: string;
    }[];
  }[];
};

type ServiceContent = {
  [key: string]: ServiceItem; 
};

const Service = ({
  id,
  indexation = 0,
  isNew,
  title,
  subtitle,
  price,
  transition = true,
  subscription = false,
  availability,
  desc
}: ServicesIntroProps) => {
  const delayClass = transition && indexation < delays.length ? delays[indexation] : ""
  const { ref: animate, fade } = transition ? UseFadeInAnimation("fadeIn") : { ref: null, fade: null }
  // const services = (content.services.items as ServiceContent)[id]
  
  return (
    <animated.div
      ref={animate}
      style={transition ? fade || undefined : undefined}
      className={`transition ${delayClass} flex`}
    >
      <Link href={`/services?cat=${id}`} className='flex' passHref>
        <Card className={!!isNew ? 'border-orange-500 dark:border-orange-500' : ''}>
          {!!isNew && (
            <span className={`text-xs uppercase font-bold tracking-wide px-4 py-2 bg-orange-600 rounded-full text-white absolute -translate-y-1/2 -translate-x-1/2 top-0 left-1/2`}>
              Nouveau
            </span>
          )}
          <CardHeader>
            <div className="flex flex-row items-end justify-between">
              <CardTitle className={`${!!isNew ? 'text-orange' : ''}`}>
                <Heading tag="h3" content={title} font />
              </CardTitle>
            </div>
            <CardDescription className='text-gray-500 dark:text-gray-300 text-center text-sm'>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {price &&
              <div className="mb-6 text-center flex flex-col justify-between items-center">
                <p className="text-md tracking-wide flex flex-col">
                  <span className="">
                    {subscription ? ( <>
                      <span className='text-xl font-bold'>{price}</span>
                      <span className='mt-1 ml-1 text-xs uppercase'>/ mois</span> 
                    </>) : ( <>
                      <span className='mb-1 text-xs block uppercase'>À partir de</span> 
                      <span className='text-xl font-bold'>{price}</span>
                    </>
                    )}
                  </span>
                </p>
              </div>
            }
            <ul>
              {desc?.map((cat, index: number) => (
                <li key={`service-resume-${index}`} className="flex py-1">
                  {subscription ? 
                    <Check className="mr-2 text-green dark:text-green-300 relative -top-[2px]" width="20" />
                    :
                    <ChevronRight className="mr-1 relative -top-[2px]" width="16" />
                  }
                  <span className="flex-1">{cat.title}</span>
                </li>
              ))}      
            </ul>
          </CardContent>
          <CardFooter>
            <div className="grid items-center justify-center mt-8 gap-4">
              <Button asChild size={'sm'} variant={subscription && (availability === undefined || availability === null || availability <= 0) ? 'outlineLight' : 'default'}>
                <a href={`/`}>
                  {subscription ?
                    availability === undefined || availability === null || availability <= 0 ? "Me notifier de la disponibilité" : "Je souhaite m'abonner"
                  : "Je découvre les offres"
                  }
                </a>
              </Button>
              {subscription ?
                availability !== undefined && availability !== null && availability > 0 &&
                  <p className='text-center text-sm'>{availability > 1 ? `Plus que ${availability} places disponibles` : 'Dernière place disponible'}</p>
                ||
                  <p className='text-gray-400 text-sm text-center'>Bientôt disponible</p>
              :
                // <Link className='text-gray-400 hover:text-blue-950 hover:dark:text-white flex justify-center items-center text-sm' href={`#simulator`}>
                //   <ChevronRight className="mr-1" width="14" />
                //   Estimation gratuite
                // </Link>
                null
              }
            </div>
          </CardFooter>
        </Card>
      </Link>
    </animated.div>
  )
}

export default Service
