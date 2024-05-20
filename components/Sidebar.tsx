"use client";

import { SidebarProps } from "@/types";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import Box from "./Box";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

const Sidebar: React.FC<SidebarProps> = ({ children, userSongs }) => {
  const pathName = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName !== "/",
        href: "/search",
      },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        `
    flex
    h-full
    `,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className="
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-color
            h-full
            w-[300px]
            p-2
            "
      >
        <Box>
          <div
            className="
                flex
                flex-col
                gap-y-2
                px-5
                py-4
                "
          >
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library userSongs={userSongs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
