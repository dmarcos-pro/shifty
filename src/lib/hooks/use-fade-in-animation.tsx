import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring } from "react-spring"

export const UseFadeInAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { ref, inView } = useInView()
  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
  })

  if (inView && !isVisible) {
    setIsVisible(true)
  }

  return { ref, fadeIn }
}
