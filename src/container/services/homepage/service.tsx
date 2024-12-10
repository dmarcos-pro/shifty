import { Button } from "@/lib/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTag,
  CardTitle,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { ServicesProps } from "@/type/component"
import content from "@contentJson"
import Link from "next/link"
import { animated } from "react-spring"
import { Check, ChevronRight } from "lucide-react"

const delays = ["delay-3", "delay-6", "delay-9", "delay-12"]

type ServiceContent = {
  [key: string]: {
    title: string;
    desc?: { title: string }[];
  }[];
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
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const services = (content.services.offer.service as ServiceContent)[id]
  
  return (
    <animated.div
      ref={animate}
      style={fade}
      className={`transition ${delayClass}`}
    >
      <Link href="/about" passHref>
        <Card className={!!isNew ? 'border-orange-500 dark:border-orange-500' : ''}>
          {!!isNew && (
            <span className={`text-xs uppercase font-bold tracking-wide px-4 py-2 bg-orange-600 rounded-full text-white absolute -translate-y-1/2 -translate-x-1/2 top-0 left-1/2`}>
              Nouveau
            </span>
          )}
          <CardHeader>
            <div className="flex flex-row items-end justify-between">
              <CardTitle className={`${!!isNew ? 'text-orange' : ''}`}>{category}</CardTitle>
            </div>
            <CardDescription className='text-gray-500 dark:text-gray-300 text-center text-sm'>{services[0].title}</CardDescription>
          </CardHeader>
          {price &&
            <div className="mt-6 text-sm text-center flex flex-col justify-between items-center">
              <p className="text-md tracking-wide flex flex-col">
                <span className="">
                  {monthly ? ( <>
                    <span className='text-xl font-bold'>{price}€</span>
                    <span className='mt-1 text-xs block uppercase'>/ mois</span> 
                  </>) : ( <>
                    <span className='mb-1 text-xs block uppercase'>À partir de</span> 
                    <span className='text-xl font-bold'>{price}€</span>
                  </>
                  )}
                </span>
              </p>
            </div>
          }
          <CardContent className='mt-6 text-sm'>
            {services[0].desc?.map((cat, index: number) => (
              <p key={index} className="flex py-1">
                {monthly ? 
                  <Check className="mr-2 text-green dark:text-green-300 relative -top-[3px]" width="20" />
                  :
                  <ChevronRight className="mr-1 relative -top-[4px]" width="16" />
                }
                <span className="flex-1">{cat.title}</span>
              </p>
            ))}      
            <div className="grid items-center justify-center mt-8 gap-4">
              <Button asChild variant={monthly && (availability === undefined || availability === null || availability <= 0) ? 'outline' : 'default'}>
                <Link href={`mailto:${content.contact.url}?Subject=Demande de renseignement - ${category}`}>
                {monthly ? 
                  availability === undefined || availability === null || availability <= 0 ? "Me notifier de la disponibilité" : "Sélectionner cet abonnement"
                : "Se renseigner sur cette offre"
                }
                </Link>
              </Button>
              {monthly ?
                availability !== undefined && availability !== null && availability > 0 &&
                  <p className='text-center'>Plus que {availability} place{availability > 1 ? 's' : ''} disponible{availability > 1 ? 's' : ''}</p>
                ||
                  <p className='text-gray-400 text-center'>Bientôt disponible</p>
              : 
                <Link className='text-gray-400 hover:text-blue-950 hover:dark:text-white flex justify-center items-center' href={`#simulator`}>
                  <ChevronRight className="mr-1" width="20" /> 
                  Estimation gratuite de ton projet
                </Link>
              }
              
            </div>
            
          </CardContent>
        </Card>
      </Link>
    </animated.div>
  )
}

export default Service
