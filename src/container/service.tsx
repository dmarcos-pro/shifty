import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardSubDescription,
} from "@/lib/components/ui/card"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { ServicesProps } from "@/type/component"
import content from "@contentJson"
import { animated } from "react-spring"

const delays = ["delay-3", "delay-6", "delay-9", "delay-12"]

type ServiceContent = {
  [key: string]: { title: string }[]
}

const Service = ({ id, category, name, title, index }: ServicesProps) => {
  const delayClass = index < delays.length ? delays[index] : ""
  const { ref: animate, fadeIn } = UseFadeInAnimation()
  const notifications = (content.services.service as ServiceContent)[id]
  return (
    <animated.div
      ref={animate}
      style={fadeIn}
      className={`flex-1 p-4 transition ${delayClass} ${id}`}
    >
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardSubDescription>{category}</CardSubDescription>
        </CardHeader>
        <CardContent>
          {notifications.map((cat, index: number) => {
            return (
              <p key={index} className="flex text-sm py-2">
                <span className="translate-y-1 h-2 w-2 mr-4 rounded-full bg-sky-500" />
                <span className="flex-1">{cat.title}</span>
              </p>
            )
          })}
        </CardContent>
      </Card>
    </animated.div>
  )
}

export default Service
