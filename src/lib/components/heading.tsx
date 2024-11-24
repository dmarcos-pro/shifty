import { cn } from "@lib/utils"
import { type HeadingProps } from "@type/component"
import { Anton as FontTitle } from "next/font/google"

export const fontTitle = FontTitle({
  subsets: ["latin"],
  weight: "400",
})

const Heading = ({ tag, content, className }: HeadingProps) => {
  return (
    <>
      {tag === "h1" && (
        <h1
          className={cn("font-extrabold text-3xl md:text-6xl lg:text-h1", fontTitle.className, `${className}`)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h2" && (
        <h2
        className={cn(`text-xl font-bold`, fontTitle.className, `${className}`)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tag === "h3" && (
        <h3
          className={cn("text-md", fontTitle.className)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  )
}

export default Heading
