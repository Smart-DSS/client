"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  // const [down, setDown] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
    setDown(false); // Close dropdown on logout
  };

  const links = [
    { id: 1, link: "dashboard" },
    // { id: 2, link: "data" },
    { id: 2, link: "profile" },
  ];

  return (
    <div className="flex justify-between w-full h-32 bg-[#4255e0] rounded-b-sm">
      <div className="w-[15%] flex flex-col justify-center mx-10 md:mx-4">
        <p className="[font-family:'Sofia_Sans-Thin',Helvetica] font-normal text-white text-4xl md:text-5xl tracking-[0] leading-[normal] flex justify-center">
          <span className="font-extralight">NIRN</span>
          <span className="[font-family:'Sofia_Sans-Black',Helvetica] font-black">
            AI
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <ul className="hidden md:flex justify-center">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className={`nav-links px-4 cursor-pointer capitalize text-2xl font-mono w-full flex justify-center hover:scale-110 ${
                pathname === `/${link}` ? "text-white" : ""
              }`}
            >
              <Link
                href={`/${link}`}
                className="flex flex-col justify-center border-blue-900 border-opacity-30 hover:border-b-2"
              >
                {link}
              </Link>
            </li>
          ))}
          <li
            key="dashboardHeader"
            className="nav-links cursor-pointer flex flex-col justify-center"
          >
            <div className="px-10">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center float-right h-12 w-20"
                  // onClick={() => setDown(!down)}
                  // aria-expanded={down} // Accessibility improvement
                >
                  <Image
                    src={session.user?.image}
                    alt="User Avatar"
                    width={60}
                    height={60}
                    className="rounded-full h-12 w-12"
                  />
                  {/* {down ? <ChevronUp /> : <ChevronDown />} */}
                </DropdownMenuTrigger>
                {/* {down && ( // Conditionally render the dropdown content */}
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button className="flex gap-2" onClick={logoutHandler}>
                      <LogOut className="h-5 w-5" /> Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                {/* )} */}
              </DropdownMenu>
            </div>
          </li>
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-20 text-gray-300 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="z-10 flex flex-col justify-center items-center absolute top-0 right-0 w-100 h-100 bg-blue-100 border-2 border-blue-900 text-gray-500 mt-14 mr-6 rounded-md">
            {links.map(({ id, link }) => (
              <li
                key={id}
                className={`px-4 cursor-pointer capitalize py-6 text-lg font-mono hover:text-lg hover:text-blue-900 hover:bg-blue-200 w-full item-center bg-opacity-5 ${
                  pathname === `/${link}` ? "text-black" : ""
                }`}
              >
                <Link onClick={() => setNav(!nav)} href={`/${link}`}>
                  {link}
                </Link>
              </li>
            ))}
            <li className="px-4 cursor-pointer capitalize py-2 text-lg font-mono hover:text-lg hover:text-blue-900 bg-blue-300 w-full item-center bg-opacity-20 rounded-t-sm">
              <button className="flex gap-2" onClick={logoutHandler}>
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
