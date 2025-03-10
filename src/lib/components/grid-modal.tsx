"use client"
import React, { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Heading from "@/lib/components/heading"

type Card = {
  title: string
  resume: string
  list: { title: string, content: { title: string }[] }[]
  content: JSX.Element | React.ReactNode | string
  className: string
  thumbnail: string
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)

  const handleClick = (card: Card) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null)
  }

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "bg-gradient-to-t from-white rounded")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden px-6 pb-8",
              selected?.title === card.title
                ? "rounded-lg cursor-pointer absolute inset-0 w-full md:w-3/4 m-auto z-50 flex justify-center items-center flex-wrap flex-col text-red-500 "
                : lastSelected?.title === card.title
                ? "z-40 bg-blue-800 rounded-xl h-full w-full"
                : "bg-red-800 rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.title}`}
          >
            {selected?.title === card.title && <SelectedCard selected={selected} />}
            <div style={{ height: '200px' }}></div>
            <Heading tag="h3" content={card.title} />
            <p className="mt-2">{card.resume}</p>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.title ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.title ? 0 : 0 }}
      />
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.title}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
    />
  )
}

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6}}
        className="absolute inset-0 h-full w-full bg-yellow-500 opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.title}`}
        initial={{ opacity: 0, y: 100}}
        animate={{ opacity: 1,y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {/* {selected?.content} */}
        {selected?.list.map((item, index) => (
            <div key={index}>
                <p>{item.title}</p>
                <div>{item.content.map((text, index) => {
                    return <p key={index}>{text.title}</p>
                })}</div>
            </div>
        ))}
      </motion.div>
    </div>
  )
}
