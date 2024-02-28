"use client";

export const header = () => {
  return;
};
import { fetchNav } from "@/api";
import { Button } from "@/lib/components/ui/button";
import { HeaderNav } from "@/type/container";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion, useScroll } from "framer-motion";
import { Link, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const Header = () => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  const { data: nav } = useQuery("nav", () => fetchNav("navigation"));
  const { setTheme } = useTheme();

  return (
    <>
      <header className="fixed w-full top-0 flex items-center justify-center py-1 backdrop-blur-sm">
        <nav className="flex rounded-3 bg-offWhite text-sm">
          {nav &&
            nav.map((item: HeaderNav, index: number) => {
              return (
                <React.Fragment key={`navHeader-${index}`}>
                  <Link
                    href={`${item.link}`}
                    className={`block py-1 px-2 rounded-3 uppercase ${
                      pathname === item.link ? "bg-pink" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </React.Fragment>
              );
            })}
        </nav>
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <motion.div
          className="absolute bottom-0 w-screen h-[3px] bg-foreground left-0"
          style={{ scaleX: scrollYProgress }}
        />
      </header>
    </>
  );
};

export default Header;
