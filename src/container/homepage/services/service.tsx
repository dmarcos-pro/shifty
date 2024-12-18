import { Button } from "@/lib/components/ui/button"
import Heading from "@/lib/components/heading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { ServicesProps } from "@/type/component"
import content from "@contentJson"
import Link from "next/link"
import { animated } from "react-spring"
import { Check, ChevronRight } from "lucide-react"
import { useRouter } from 'next/router'

const delays = ["delay-3", "delay-6", "delay-9", "delay-12"]

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
  category,
  index,
  isNew,
  availability,
  price,
  monthly
}: ServicesProps) => {
  const router = useRouter()
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const services = (content.services.items as ServiceContent)[id]
  
  return (
    <animated.div
      ref={animate}
      style={fade}
      className={`transition ${delayClass}`}
    >

      <Link href={`/services?cat=${id}`} passHref>
        <Card className={!!isNew ? 'border-orange-500 dark:border-orange-500' : ''}>
          {!!isNew && (
            <span className={`text-xs uppercase font-bold tracking-wide px-4 py-2 bg-orange-600 rounded-full text-white absolute -translate-y-1/2 -translate-x-1/2 top-0 left-1/2`}>
              Nouveau
            </span>
            
          )}
          <CardHeader>
            <div className="flex flex-row items-end justify-between">
              <CardTitle className={`${!!isNew ? 'text-orange' : ''}`}>
                <Heading tag="h3" content={category} />
              </CardTitle>
            </div>
            <CardDescription className='text-gray-500 dark:text-gray-300 text-center text-sm'>{services.resume.title}</CardDescription>
          </CardHeader>
          <CardContent>
            {price &&
              <div className="text-sm mb-6 text-center flex flex-col justify-between items-center">
                <p className="text-md tracking-wide flex flex-col">
                  <span className="">
                    {monthly ? ( <>
                      <span className='text-xl font-bold'>{price}€</span>
                      <span className='mt-1 ml-1 text-xs uppercase'>/ mois</span> 
                    </>) : ( <>
                      <span className='mb-1 text-xs block uppercase'>À partir de</span> 
                      <span className='text-xl font-bold'>{price}€</span>
                    </>
                    )}
                  </span>
                </p>
              </div>
            }
            <ul className='text-sm'>
              {services.resume.desc?.map((cat, index: number) => (
                <li key={`service-resume-${index}`} className="flex py-1">
                  {monthly ? 
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
              <Button asChild variant={monthly && (availability === undefined || availability === null || availability <= 0) ? 'outlineLight' : 'default'}>
                <a href={`mailto:${content.contact.url}?Subject=Demande de renseignement - ${category}`}>
                  {monthly ?
                    availability === undefined || availability === null || availability <= 0 ? "Me notifier de la disponibilité" : "Je souhaite m'abonner"
                  : "Parle-nous de ton projet"
                  }
                </a>
              </Button>
              {monthly ?
                availability !== undefined && availability !== null && availability > 0 &&
                  <p className='text-center'>{availability > 1 ? `Plus que ${availability} places disponibles` : 'Dernière place disponible'}</p>
                ||
                  <p className='text-gray-400 text-center'>Bientôt disponible</p>
              :
                <Link className='text-gray-400 hover:text-blue-950 hover:dark:text-white flex justify-center items-center' href={`#simulator`}>
                  <ChevronRight className="mr-1" width="14" />
                  Estimation gratuite
                </Link>
              }
            </div>
          </CardFooter>
        </Card>
      </Link>
    </animated.div>
  )
}

export default Service
