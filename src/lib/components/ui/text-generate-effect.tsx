"use client"
import { motion, stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
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
                className="font-extrabold font-title text-lg md:text-[3.2rem] md:leading-[4rem] opacity-0"
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
        <div className="text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
