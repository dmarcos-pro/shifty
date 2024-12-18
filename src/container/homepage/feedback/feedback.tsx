"use client"

import Heading from "@/lib/components/heading"
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
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")

  return (
    <animated.section ref={animate} style={fade} className="pb-48">
      <header className="text-center">
        <span className="mb-3 block text-sm uppercase text-gray-400 dark:text-gray-500">
          {content.feedback.tag}
        </span>
        <Heading tag="h2" content={content.feedback.title} />
      </header>
      <aside className="container mt-8">
        {feedback && (
          <Carousel className="mx-auto w-2/3 px-12">
            <CarouselContent>
              {feedback.map((feedback: FeedbackContainer, index: number) => (
                <CarouselItem key={`feedback-${index}`}>
                  <p
                    className="mb-4 text-md leading-7"
                    dangerouslySetInnerHTML={{
                      __html: feedback.text,
                    }}
                  />
                  <p className="text-sm text-center">{feedback.who}</p>
                  <p className="text-sm mt-1 text-center text-gray-500">
                    {feedback.job} - {feedback.brand}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </aside>
    </animated.section>
  )
}

export default Feedback
