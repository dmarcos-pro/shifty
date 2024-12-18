import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring } from "react-spring"

export const UseFadeInAnimation = (effect: string) => {
  const [isVisible, setIsVisible] = useState(false)
  const { ref, inView } = useInView()
  let e = {}
  if (effect === "fade" || effect === undefined) {
    e = {
      opacity: isVisible ? 1 : 0,
    }
  }
  if (effect === "fadeIn" || effect === undefined) {
    e = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0px)" : "translateY(50px)",
    }
  }
  if (effect === "fadeDown") {
    e = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0px)" : "translateY(-10px)",
    }
  }

  const fade = useSpring(e)
  const fadeIn = useSpring(e)
  const fadeDown = useSpring(e)

  if (inView && !isVisible) {
    setIsVisible(true)
  }

  return { ref, fade, fadeIn, fadeDown }
}
