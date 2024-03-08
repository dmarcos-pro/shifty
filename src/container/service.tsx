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
  [key: string]: { title: string }[]
}
type AvailabilityContent = {
  [key: string]: number
}

const Service = ({
  id,
  category,
  title,
  index,
  price,
  promotion,
  availability,
}: ServicesProps) => {
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  const services = (content.services.offer.service as ServiceContent)[id]
  const operation = (content.services.offer.operation as ServiceContent)[id]
  console.log("🚀 ~ Service ~ availability:", promotion)
  return (
    <animated.div
      ref={animate}
      style={fade}
      className={`transition ${delayClass}`}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between mb-2">
            <CardTitle>{category}</CardTitle>
            {promotion && (
              <span className="text-xs inline-block font-bold tracking-wide leading-loose px-3 bg-primary rounded-lg text-white">
                Offre limitée
              </span>
            )}
          </div>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="pb-4 text-sm text-gray-400">
            À partir de
            <span className="text-lg dark:text-white text-deepblue pl-1 font-bold tracking-wide">
              <span className={promotion && "line-through pr-1 text-gray-400"}>
                {price}
              </span>
              <span>{promotion}</span>€
            </span>
          </p>
          {services.map((cat, index: number) => {
            return (
              <p key={index} className="flex text-sm py-1">
                <span className="translate-y-1 h-2 w-2 mr-3 rounded-full bg-blue" />
                <span className="flex-1">{cat.title}</span>
              </p>
            )
          })}
          <CardTag className="mt-4">
            <p className="font-bold mb-2">Fonctionnement</p>
            {operation.map((cat, index: number) => {
              return (
                <p key={index} className="flex text-sm py-1">
                  <span className="translate-y-[6px] h-1 w-1 mr-2 rounded-full bg-blue-light" />
                  <span className="flex-1">{cat.title}</span>
                </p>
              )
            })}
          </CardTag>
          <Button
            variant="small"
            size="sm"
            className={`mt-4 ${availability === 0 && "bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-300 dark:text-gray-400"}`}
            asChild
          >
            <Link
              href={`${content.contact.url}?Subject=Demande de renseignement - ${category}`}
            >
              {availability === 0 && "Bientôt disponible"}
              {availability === 1 && `Encore ${availability} place disponible`}
              {availability > 1 && `Encore ${availability} places disponibles`}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </animated.div>
  )
}

export default Service
