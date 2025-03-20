"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@lib/hooks/use-outside-click";
import { Check } from 'lucide-react';

export default function ExpandableCardDemo({ cards } : { cards: any }) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const CATEGORY_NAME = {
    digital: "Digital",
    branding: "Branding",
    social_media: "Social Media"
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 rounded overflow-hidden"
            >
              {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div> */}

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.div
                      layoutId={`description-${active.subtitle}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      <p className="mb-4">{active.subtitle}</p>
                      {active.desc.map((desc: any, index: number) => (
                        <div key={index} className='grid gap-4'>
                          {desc.content.map((content: any, i: number) => (
                            <div key={i} >
                                <p>{content.title}</p>
                                <p className='text-sm'>{content.text}</p>
                            </div>
                        ))}
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a> */}
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid gap-8 grid-cols-3">
        {cards.map((card: any, index: number) => {
          // const CustomCategory = CATEGORY_NAME[card.category as 'digital' | 'branding' | 'social_media'] || null;
          return (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`${card.title}-${index}`}
            onClick={() => setActive(card)}
            className={`p-12 cursor-pointer bg-gradient-to-b from-gray-100 shadow-md rounded-lg`}
          >
            <div className="grid gap-8">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full border bg-gray-200 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="grid gap-4">
                {/* <p className='text-sm'>{CustomCategory}</p> */}
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-sans text-md font-bold"
                >
                    {card.title}
                </motion.h3>
                <p className=''>{card.subtitle}</p>
              </div>
              {card.desc.map((desc: any, index: number) => (
                <ul key={index} className='grid gap-2'>
                  {desc.content.map((content: any, i: number) => (
                    <li key={i} className='flex gap-2 text-sm'>
                      <Check className='text-green' />
                      <span className="flex-1">{content.title}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </motion.div>
        )})}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};