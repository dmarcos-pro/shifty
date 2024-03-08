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
import { animated } from "react-spring"

const delays = ["delay-3", "delay-6", "delay-9", "delay-12"]

type ServiceContent = {
  [key: string]: { title: string }[]
}
type AvailabilityContent = {
  [key: string]: number
}

const Service = ({ id, category, name, title, index }: ServicesProps) => {
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  const services = (content.services.offer.service as ServiceContent)[id]
  const operation = (content.services.offer.operation as ServiceContent)[id]
  const availability = (
    content.services.offer.availability as AvailabilityContent
  )[id]
  console.log("🚀 ~ Service ~ availability:", availability)
  return (
    <animated.div
      ref={animate}
      style={fadeIn}
      className={`transition ${delayClass}`}
    >
      <Card>
        <CardHeader>
          <CardTitle>{category}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <span className="translate-y-1 h-2 w-2 mr-3 rounded-full bg-blue" />
                  <span className="flex-1">{cat.title}</span>
                </p>
              )
            })}
          </CardTag>
          <Button
            variant="small"
            size="sm"
            className={`mt-4 ${availability === 0 && "bg-gray-200 cursor-not-allowed text-gray-500"}`}
          >
            {availability === 0 && "Bientôt disponible"}
            {availability === 1 && `Encore ${availability} place disponible`}
            {availability > 1 && `Encore ${availability} places disponibles`}
          </Button>
        </CardContent>
      </Card>
    </animated.div>
  )
}

export default Service
