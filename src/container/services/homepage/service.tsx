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
  url,
  // price,
  promotion,
  isNew,
}: ServicesProps) => {
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const services = (content.services.offer.service as ServiceContent)[id]
  const operation = (content.services.offer.operation as ServiceContent)[id]
  
  return (
    <animated.div
      ref={animate}
      style={fade}
      className={`transition ${delayClass}`}
    >
      
        <Card>
          <CardHeader>
            <div className="flex flex-row items-end justify-between">
              <CardTitle>{category}</CardTitle>
              {(promotion || !!isNew) && (
                <span className={`text-sm leading-loose px-3 ${promotion ? 'bg-orange-light' : ''} ${isNew ? 'bg-green' : ''} rounded-full text-white`}>
                  {promotion && 'Offre limitée'}
                  {!!isNew && 'Nouveauté'}
                </span>
              )}
            </div>
            <CardDescription>{services[0].title}</CardDescription>
          </CardHeader>
          <hr className="my-md border-gray-300" />
          <CardContent>
            {services[0].desc?.map((cat, index: number) => {
              return (
                <p key={index} className="flex py-1">
                  <span className="translate-y-2 h-2 w-2 mr-3 rounded-full bg-blue" />
                  <span className="flex-1">{cat.title}</span>
                </p>
              )
            })}
            <CardTag className="mt-4">
              <p className="font-bold mb-2">Notre Processus</p>
              {operation.map((cat, index: number) => {
                return (
                  <p key={index} className="flex py-1">
                    <span className="translate-y-2 h-1 w-1 mr-2 rounded-full bg-blue" />
                    <span className="flex-1">{cat.title}</span>
                  </p>
                )
              })}
            </CardTag>
            {/* <div className="my-4 text-sm text-center flex flex-col justify-between items-center">
              <p className='text-gray-400'>À partir de</p>
              <p className="text-lg tracking-wide flex flex-col">
                <span className={`${promotion ? "line-through text-gray-500 text-md" : "font-bold"}`}>
                  {price}€
                </span>
                {promotion && <span className='font-bold'>{promotion}€</span> }
              </p>
            </div>
            <Button
              variant="small"
              size="sm"
              // className={`mt-4 ${availability === 0 && "bg-gray-100 cursor-not-allowed text-gray-300"}`}
              className={`mt-4 table mx-auto`}
              // asChild
            >
              <Link href={`${content.contact.url}?Subject=Demande de renseignement - ${category}`}>
                {availability === 0 ? "Bientôt disponible" : 'Contactez-nous'}
              </Link>
            </Button> */}
            <Button
              // variant="outline"
              // size="sm"
              className={`mt-6 table mx-auto`}
            >
              <Link href={`mailto:${content.contact.url}?Subject=Demande de renseignement - ${category}`}>
                Je choisis ce service
              </Link>
            </Button>
            
          </CardContent>
        </Card>
      
    </animated.div>
  )
}

export default Service
