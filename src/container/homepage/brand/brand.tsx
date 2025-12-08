"use client"

import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { BrandContainer } from "@/type/component"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { Marquee } from "@/lib/components/ui/marquee"
import Image from "next/image"
import { getBrand } from '@/api/strapi.server'
import Link from "next/link"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

const Brand = () => {

  const { data: brand, isLoading, isError } = useQuery("brand", () => getBrand())
  const { ref: animate, fade } = UseFadeInAnimation("fadeIn")
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  return (
    <animated.aside ref={animate} style={fade} className="py-24">
      <Marquee pauseOnHover className="[--duration:40s]">
        {brand.data.map((brandItem: BrandContainer, index: number) => (
          <div key={`brand-${index}`} className="p-4">    
            <Link href={brandItem.url}>
              <Image
                width={100}
                height={80}
                src={`${strapiUrl}${brandItem?.logo?.url}`}
                alt={brandItem?.name}
              />
            </Link>
          </div>
        ))} 
      </Marquee>
    </animated.aside>
  )
}

export default Brand
