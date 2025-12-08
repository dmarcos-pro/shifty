"use client"

import Heading, { fontTitle } from "@/lib/components/heading"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { BrandContainer } from "@/type/component"
import { fetchFeedback } from "@api"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { Marquee } from "@/lib/components/ui/marquee"
import { MessageSquareQuote } from 'lucide-react'
import Image from "next/image"
import { getBrand, getFeedback } from '@/api/strapi.server'
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

const Feedback = () => {
  const { data: brand, isLoading, isError } = useQuery("brand", () => getBrand())
  const { data: feedback, isLoading: isLoadingFeedback, isError: isErrorFeedback } = useQuery("feedback", () => getFeedback())

  const sizeImgRef = 75
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  
  if (isLoading || isLoadingFeedback) return <div>Loading...</div>
  if (isError || isErrorFeedback) return <div>Error fetching data...</div>

  const brandsWithFeedback = brand?.data?.filter((brandItem: BrandContainer) => 
    brandItem.feedback && brandItem.feedback.comment
  ) || []

  return (
    <animated.section ref={animate} style={fade} className="py-24">
      <header className="text-center">
        <span className="mb-3 block text-sm uppercase text-gray-400">
          {feedback?.data?.subtitle}
        </span>
        <Heading tag="h2" content={feedback?.data?.title} />
      </header>
      <aside className="mt-8 grid gap-2">
        <Marquee pauseOnHover className="[--duration:40s]">
          {brandsWithFeedback.map((brandItem: BrandContainer) => {
            return (
              <div 
                key={`feedback-first-${brandItem.id}`} 
                className={`bg-white border p-12 w-[400px] text-center rounded-lg flex flex-col justify-between`}
              >
                <div>
                  {/* <MessageSquareQuote width={30} height={30} className='table mx-auto text-yellow-500'/> */}
                  <Image
                    height={32}
                    width={sizeImgRef}
                    src={`${strapiUrl}${brandItem.logo.url}`}
                    alt={brandItem.name}
                    className='table mx-auto'
                  />
                  <p
                    className="mt-4 leading-5 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: brandItem.feedback.comment,
                    }}
                  />
                </div>
              </div>
          )
        })}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:40s]">
          {brandsWithFeedback.map((brandItem: BrandContainer) => {
            return (
              <div 
                key={`feedback-second-${brandItem.id}`} 
                className="bg-white border p-12 w-[400px] text-center rounded-lg flex flex-col justify-between"
              >
                <div>
                  {/* <MessageSquareQuote width={30} height={30} className='table mx-auto text-yellow-500'/> */}
                  <Image
                    height={32}
                    width={sizeImgRef}
                    src={`${strapiUrl}${brandItem.logo.url}`}
                    alt={brandItem.name}
                    className='table mx-auto'
                  />
                  <p
                    className="mt-4 leading-5 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: brandItem.feedback.comment,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </Marquee>
      </aside>
    </animated.section>
  )
}

export default Feedback
