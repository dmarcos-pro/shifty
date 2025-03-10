import { cn } from "@lib/utils"
import { type HeadingProps } from "@type/component"
// import { Anton as FontTitle } from "next/font/google"
import { Figtree as FontTitle } from "next/font/google"

export const fontTitle = FontTitle({
  subsets: ["latin"],
  weight: "700",
})

const Heading = ({ tag, content, className, font }: HeadingProps) => {
  return (
    <>
      {tag === "h1" && (
        <h1
          className={cn("text-h1", `${className}`)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h2" && (
        <h2
        className={cn(`text-xl`, fontTitle.className, `${className}`)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h3" && (
        <h3
          className={cn("text-md", font ? font : fontTitle.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  )
}

export default Heading
