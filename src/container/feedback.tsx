"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/components/ui/carousel"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { FeedbackContainer } from "@/type/component"
import { fetchFeedback } from "@api"
import content from "@contentJson"
import { useQuery } from "react-query"
import { animated } from "react-spring"

const Feedback = () => {
  const {
    data: feedback,
    isLoading,
    isError,
  } = useQuery("feedback", () => fetchFeedback())
  const { ref: animate, fadeIn } = UseFadeInAnimation()

  return (
    <section className="py-48">
      <div className="text-center">
        <animated.div ref={animate} style={fadeIn}>
          <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500">
            {content.feedback.title}
          </span>
        </animated.div>
      </div>
      <div className="container pt-10">
        {feedback && (
          <Carousel className="mx-auto w-2/3 px-12">
            <CarouselContent>
              {feedback.map((feedback: FeedbackContainer, index: number) => {
                return (
                  <CarouselItem key={index} className="text-center">
                    <div
                      className="mb-4 text-xl leading-8"
                      dangerouslySetInnerHTML={{
                        __html: feedback.text,
                      }}
                    />
                    <p className="text-sm">{feedback.who}</p>
                    <p className="text-sm mt-1 text-gray-500">
                      {feedback.job} - {feedback.brand}
                    </p>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  )
}

export default Feedback
