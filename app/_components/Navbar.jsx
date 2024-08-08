"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import DashboardHeader from "./DashboardHeader";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const links = [
    {
      id: 1,
      link: "dashboard",
    },
    {
      id: 2,
      link: "data",
    },
    {
      id: 3,
      link: "profile",
    },
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
      {/* <div><span style="text-white text-5xl font-thin font-['Sofia Sans']">NIRN</span><span style="text-white text-5xl font-black font-['Sofia Sans']">AI</span></div>
       */}
      <div className="flex flex-col justify-center">
        <ul className="hidden md:flex justify-center">
          {links.map(({ id, link }) => (
            <li
              key={id}
              // className={`nav-links px-4 cursor-pointer capitalize text-xl font-semibold font-mono opacity-50 text-gray-100 duration-200 link-underline flex flex-col justify-center hover:scale-110 ${
              //   pathname === `/${link}`? "scale-105 text-white opacity-100": ""
              // }`}
              className={`nav-links px-4 cursor-pointer capitalize text-xl font-semibold w-full flex justify-center hover:scale-110 ${
                pathname === `/${link}` ? "text-white" : ""
              }`}
            >
              <Link href={`/${link}`} className="flex flex-col justify-center border-blue-900 border-opacity-30 hover:border-b-2">{link}</Link>
            </li>
          ))}
          <li
            key={"dashboardHeader"}
            className="nav-links cursor-pointer flex flex-col justify-center"
          >
            <DashboardHeader />
          </li>
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-20 text-gray-300 md:hidden"
        >
          {/* close button */}
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="z-10 flex flex-col justify-center items-center absolute top-0 right-0 w-100 h-100 bg-blue-100 border-2 border-blue-900 text-gray-500 mt-14 mr-6 rounded-md">
            {/* <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500"> */}
            {links.map(({ id, link }) => (
              <li
                key={id}
                className={`px-4 cursor-pointer capitalize py-6 text-lg font-mono hover:text-lg hover:text-blue-900 hover:bg-blue-200 w-full item-center ${
                  pathname === `/${link}` ? "text-black" : ""
                }`}
              >
                <Link onClick={() => setNav(!nav)} href={`/${link}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
