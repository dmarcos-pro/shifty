"use client"
import { motion, stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export const TextGenerateEffect = ({
  words,
  className = '',
  fontSize = 'text-lg md:text-xxl',
  bold = false,
  fontTitle = true,
  leading = 'md:leading-[4rem]',
}: {
  words: string
  className?: string
  fontSize?: string
  bold?: boolean
  fontTitle?: boolean
  leading?: string
}) => {
  const { ref, inView } = useInView()
  const [scope, animate] = useAnimate()

  let wordsArray = words.split(" ")
  useEffect(() => {
    if (inView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 1,
          delay: stagger(0.1),
        },
      )
    }
  }, [inView, animate])

  const renderWords = () => {
    return (
      <div ref={ref}>
        <motion.div ref={scope}>
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                className={`${bold ? 'font-extrabold' : ''} ${fontTitle ? 'font-title' : ''} ${fontSize} ${leading} opacity-0 ${className}`}
              >
                {word}{" "}
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-4">
        <div className={`${fontSize} ${className}`}>
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
