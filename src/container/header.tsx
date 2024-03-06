"use client"

import { fetchNav } from "@/api"
import { Button } from "@/lib/components/ui/button"
import { HeaderNav } from "@/type/container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { useQuery } from "react-query"

const Header = () => {
  const pathname = usePathname()

  const { data: nav } = useQuery("nav", () => fetchNav())
  const { setTheme } = useTheme()

  return (
    <>
      <header className="fixed z-10 w-full top-0 flex items-center justify-center py-3 backdrop-blur-sm">
        <nav className="flex rounded-50 p-1 bg-gray-100 dark:bg-gray-800 text-sm font-bold">
          {nav &&
            nav.map((item: HeaderNav, index: number) => {
              return (
                <React.Fragment key={`navHeader-${index}`}>
                  <Link
                    href={`${item.link}`}
                    className={`block py-2 px-4 rounded-50 uppercase text-xs font-extrabold tracking-wide ${pathname === item.link ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {item.name}
                  </Link>
                </React.Fragment>
              )
            })}
        </nav>
        <div className="absolute right-md top-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-none">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-foreground border border-grey mt-xs rounded cursor-pointer text-center"
            >
              <DropdownMenuItem
                className="px-sm py-xs uppercase text-xs text-background focus-visible:border-none"
                onClick={() => setTheme("light")}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-sm py-xs uppercase text-xs border-t border-t-grey text-background focus-visible:ring-0"
                onClick={() => setTheme("dark")}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-sm py-xs uppercase text-xs border-t border-t-grey text-background focus-visible:border-none"
                onClick={() => setTheme("system")}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}

export default Header
