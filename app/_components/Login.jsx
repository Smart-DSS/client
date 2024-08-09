"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div
      // className="h-screen pt-[5%] bg-[#4255e0] bg-opacity-90"
      className="h-screen pt-[5%]"
      style={{
        backgroundImage: "url('/background.svg')",
      }}
    >
      <div className="bg-white/90 rounded-2xl w-[90%] h-[90%] mx-auto p-[5%] flex flex-col justify-center">
        {/* left */}
        <div className="flex flex-col justify-evenly h-full">
          <div className="text-center items-center mt-[2%]">
            <Image
              src={"/GOI.svg"}
              width={500}
              height={300}
              alt="logo"
              className="p-5 flex justify-center items-center mx-auto "
              // className="w-[50px] md:w-[60px] p-1"
            />
            {/* <p className="font-bold text-[18px] md:text-[24px] w-[100%] mx-auto">
              NIRNAI
            </p> */}
            <p className="[font-family:'Sofia_Sans-Thin',Helvetica] font-normal text-[24px] w-[100%] mx-auto">
              <span className="font-extralight">NIRN</span>
              <span className="[font-family:'Sofia_Sans-Black',Helvetica] font-black">
                AI
              </span>
            </p>
            <div className="w-full items-center flex justify-center px-[5%] md:px-[20%]">
              <h1 className="text-lg md:text-xl mt-5 text-slate-500 px-4">
                AI-based DSS framework for Disaster preparedness for flood
                management and crowd monitoring.
              </h1>
            </div>
            <div className="flex gap-4 flex-col mt-5">
              <div className="flex justify-center gap-2 md:gap-8 px-2">
                <LoginLink>
                  <Button className="py-5 px-7 md:p-[15%] bg-white text-black hover:text-white shadow-xl rounded-full flex gap-4">
                    <Image src={"/google.svg"} width={30} height={30}></Image>
                    <div className="mr-3">Sign up with Google</div>
                  </Button>
                </LoginLink>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
      </div>
    </div>
  );
};

export default Login;
