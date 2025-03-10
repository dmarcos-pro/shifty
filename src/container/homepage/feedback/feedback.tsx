"use client"

import Heading, { fontTitle } from "@/lib/components/heading"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { FeedbackContainer } from "@/type/component"
import { fetchFeedback } from "@api"
import content from "@contentJson"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { Marquee } from "@/lib/components/ui/marquee"
import { MessageSquareQuote } from 'lucide-react'
import Image from "next/image"

const Feedback = () => {

  const sizeImgRef = 100

  const {
    data: feedback,
    isLoading,
    isError,
  } = useQuery("feedback", () => fetchFeedback())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  // const firstRow = feedback.slice(0, feedback.length / 2);
  // const secondRow = feedback.slice(feedback.length / 2);
  
  const getImage = (id: string) => {
    return require(`@images/project/logo/${id}.png`)
  }

  return (
    <animated.section ref={animate} style={fade} className="py-24">
      <header className="text-center">
        <span className="mb-3 block text-sm uppercase text-gray-400">
          {content.feedback.tag}
        </span>
        <Heading tag="h2" content={content.feedback.title} />
      </header>
      <aside className="mt-8">
        {feedback && (
          <>
          
          <Marquee pauseOnHover className="[--duration:40s]">
                {feedback.map((feedback: FeedbackContainer, index: number) => {
                  const img = getImage(feedback.brand)
                  return (
                  <div key={`feedback-first-${index}`} className={`bg-white border px-8 py-16 w-[400px] text-center rounded-lg flex flex-col justify-between`}>
                    <div>
                      <MessageSquareQuote width={30} height={30} className='table mx-auto text-yellow-500'/>
                      <p
                        className="mt-8 mb-4 leading-7"
                        dangerouslySetInnerHTML={{
                          __html: feedback.text,
                        }}
                      />
                    </div>
                    <div>
                      <Image
                        height={48}
                        width={sizeImgRef}
                        src={img}
                        alt={feedback.brand}
                        className='table mx-auto'
                      />
                    </div>
                  </div>
                )})}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:40s]">
                {feedback.map((feedback: FeedbackContainer, index: number) => {
                  const img = getImage(feedback.brand)
                  return (
                  <div key={`feedback-second-${index}`} className="bg-white border px-8 py-16 w-[400px] text-center rounded-lg flex flex-col justify-between">
                    <div>
                      <MessageSquareQuote width={30} height={30} className='table mx-auto text-yellow-500'/>
                      <p
                        className="my-8 leading-7"
                        dangerouslySetInnerHTML={{
                          __html: feedback.text,
                        }}
                      />
                    </div>
                    <div>
                      <Image
                        height={48}
                        width={sizeImgRef}
                        src={img}
                        alt={feedback.brand}
                        className='table mx-auto'
                      />
                    </div>
                </div>
                )})}
          </Marquee>
          </>
        )}
      </aside>
    </animated.section>
  )
}

export default Feedback
