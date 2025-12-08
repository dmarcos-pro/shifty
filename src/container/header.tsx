"use client"

import { fetchNav } from "@/api"
import { UseFadeInAnimation } from "@/lib/hooks/use-fade-in-animation"
import { HeaderNav } from "@/type/component"
import { usePathname } from 'next/navigation'
import logo from "@images/logo.png"
import Image from "next/image"
import {
  Arrow,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { ArrowRight, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import React from "react"
import { useQuery } from "react-query"
import { animated } from "react-spring"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/lib/components/ui/navigation-menu"
import { Button } from "@/lib/components/ui/button"
import { useState } from "react"

import { getGlobal } from '@/api/strapi.server'

const Header = () => {
  const { data: nav } = useQuery("nav", () => fetchNav())
  const { ref: animate, fade } = UseFadeInAnimation("fadeDown")
  const pathname = usePathname()
  const [navHeader, setNavHeader] = useState(false)
  const { setTheme } = useTheme()
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  const { data: global, isLoading, isError } = useQuery("global", () => getGlobal())

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  const goToNextNav = () => {
    setNavHeader(prev => !prev)
  }

  return (
    <>
      <header className="fixed z-10 w-full top-0 backdrop-blur-md">
        <div className="container flex items-center justify-between relative p-6">
          <Link href="/">
            <Image
              width={100}
              height={80}
              src={global?.data?.logo?.[0]?.url ? `${strapiUrl}${global.data.logo[0].url}` : logo.src}
              alt={global?.data?.siteName}
            />
          </Link>
          <div className='flex gap-6 items-center'>
            <nav className='flex gap-8'>
              {/* <span
                className={`${pathname === '/services' || navHeader ? 'text-blue-800' : 'hover:text-blue-800 hover:dark:bg-gray-700'} border-b-2 border-transparent flex items-center uppercase text-xs tracking-widest`}
                onClick={goToNextNav}
              >
                Services
              </span>
              <Link href="/studio" className={`${pathname === '/studio' ? 'border-blue-800 text-blue-800' : 'border-transparent hover:text-blue-800 hover:dark:bg-gray-700'} border-b-2 flex items-center uppercase text-xs tracking-widest`}>
                Le studio
              </Link>
              <Link href="/blog" className={`${pathname === '/blog' ? 'border-blue-800 text-blue-800' : 'border-transparent hover:text-blue-800 hover:dark:bg-gray-700'} border-b-2 flex items-center uppercase text-xs tracking-widest`}>
                Blog
              </Link> */}
              <Button asChild size="sm">
                <Link href={`/`} className='text-xs uppercase'>
                  Nous contacter
                  <ArrowRight size={16} className='ml-2' />
                </Link>
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger className='relative h-[20px] w-[20px]'>
                <SunIcon
                  onClick={() => setTheme("dark")}
                  className="absolute right-0 top-0 h-[20px] w-[20px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <MoonIcon
                  onClick={() => setTheme("light")}
                  className="absolute right-0 top-0 h-[20px] w-[20px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span className="sr-only">Toggle theme</span>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
        {/* {navHeader && <div className='bg-blue py-8 shadow-xl'>
          <div className='container'>
            <div className="grid grid-cols-4 gap-8">
              <div className='flex gap-4 bg-white p-4 shadow-xl items-start'>
                <Image src={''} alt={`Logo ${content.name}`} className='bg-blue-200 text-blue-800 p-2 text-sm'  width={50} height={50} />
                <div>
                  <p className='uppercase tracking-wide font-title'>Digital</p>
                  <ul className='grid gap-1 text-sm mt-1'>
                    <li>Maquettes</li>
                    <li>Site vitrine</li>
                    <li>Boutique e-commerce</li>
                    <li>Landing page</li>
                </ul>
                </div>
              </div>
              <div className='flex gap-4 items-start bg-white p-4 shadow-xl'>
                <Image src={''} alt={`Logo ${content.name}`} className='bg-blue-200 text-blue-800 p-2 text-sm' width={50} height={50} />
                <div>
                  <p className='uppercase tracking-wide font-title'>Branding</p>
                  <ul className='grid gap-1 text-sm mt-1'>
                    <li>Logo</li>
                    <li>Charte graphique</li>
                    <li>Supports imprimés</li>
                  </ul>
                </div>
              </div>
              <div className='flex gap-4 items-start bg-white p-4 shadow-xl'>
                <Image src={''} alt={`Logo ${content.name}`} className='bg-blue-200 text-blue-800 p-2 text-sm' width={50} height={50} />
                <div>
                  <p className='uppercase tracking-wide font-title'>Social Media</p>
                  <ul className='grid gap-1 text-sm mt-1'>
                    <li>Montage vidéo</li>
                    <li>Shooting photo</li>
                    <li>Couverture d&apos;événement</li>
                    <li>Stratégie marketing</li>
                  </ul>
                </div>
              </div>
              <div className='flex gap-4 bg-blue-800 text-white p-4 shadow-xl items-center justify-center'>
                <p className=''>Voir tous nos services</p>
              </div>
            </div>
          </div>
        </div>} */}
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
