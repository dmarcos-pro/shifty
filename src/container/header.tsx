"use client"

import { fetchNav } from "@/api"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { HeaderNav } from "@/type/component"
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import React from "react"
import { useQuery } from "react-query"
import { animated } from "react-spring"

const Header = () => {
  const { data: nav } = useQuery("nav", () => fetchNav())
  const { setTheme } = useTheme()
  const { ref: animate, fade } = UseFadeInAnimation("fadeDown")
  const pathname = usePathname()

  return (
    <>
      <header className="fixed z-10 w-full top-0 flex items-center justify-center py-3 backdrop-blur-sm">
        <animated.div
          ref={animate}
          style={fade}
          className={`transition delay-8`}
        >
          <nav className="flex rounded-50 p-1 bg-gray-100 dark:bg-gray-800 text-sm font-bold">
            {nav &&
              nav.map((item: HeaderNav, index: number) => {
                return (
                  <React.Fragment key={`navHeader-${index}`}>
                    <Link
                      href={`${item.link}`}
                      className={`${pathname === item.link ? 'bg-blue text-white hover:bg-blue' : 'hover:bg-gray-200'} block py-2 px-2 mx-1 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide hover:dark:bg-gray-700 text-gray-400`}
                    >
                      {item.name}
                    </Link>
                  </React.Fragment>
                )
              })}
          </nav>
        </animated.div>
        <div className="absolute right-md md:right-lg top-xs">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SunIcon
                onClick={() => setTheme("dark")}
                className="absolute right-0 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <MoonIcon
                onClick={() => setTheme("light")}
                className="absolute right-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}

export default Header
