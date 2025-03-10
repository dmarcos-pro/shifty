"use client"

import { fetchNav } from "@/api"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { HeaderNav } from "@/type/component"
import { usePathname } from 'next/navigation'
import logo from "@images/logo.png"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import React from "react"
import { useQuery } from "react-query"
import content from "@contentJson"
import { animated } from "react-spring"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/lib/components/ui/navigation-menu"

const Header = () => {
  const { data: nav } = useQuery("nav", () => fetchNav())
  const { setTheme } = useTheme()
  const { ref: animate, fade } = UseFadeInAnimation("fadeDown")
  const pathname = usePathname()

  return (
    <>
      <header className="fixed z-10 w-full top-0 backdrop-blur-sm p-3">
        <div className="container flex items-center justify-between relative">
          <Image
            width={100}
            height={80}
            src={logo.src}
            alt={`Logo ${content.name}`}
          />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={`${pathname === '/' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${pathname === '/services' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <li>
                      <p>Titre</p>
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </li>
                    <li>
                      <p>Titre</p>
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/studio" legacyBehavior passHref>
                  <NavigationMenuLink className={`${pathname === '/studio' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>
                    Le studio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SunIcon
                onClick={() => setTheme("dark")}
                className="absolute right-0 top-[15px] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <MoonIcon
                onClick={() => setTheme("light")}
                className="absolute right-0 top-[15px] h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </header>
      {/* <header className="fixed z-10 w-full top-0 flex items-center justify-center py-3 backdrop-blur-sm">
        <animated.nav
          ref={animate}
          style={fade}
          className={`flex-1 transition delay-4 flex gap-1 px-1 rounded-50 py-1 bg-gray-100 shadow-inner dark:bg-gray-800 text-sm font-bold`}
          >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={`${pathname === '/' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`${pathname === '/services' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <li>
                      <p>Titre</p>
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </li>
                    <li>
                      <p>Titre</p>
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/studio" legacyBehavior passHref>
                  <NavigationMenuLink className={`${pathname === '/studio' ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}>
                    Le studio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {nav &&
            nav.map((item: HeaderNav, index: number) => (
              <Link
                key={`navHeader-${index}`}
                href={`${item.link}`}
                className={`${pathname === item.link ? 'bg-blue text-white hover:bg-blue' : 'hover:text-blue hover:dark:bg-gray-700'} block p-2 md:px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide text-gray-400`}
              >
                {item.name}
              </Link>
            ))}
        </animated.nav>
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
      </header> */}
    </>
  )
}

export default Header
