import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenuDemo } from "@/components/header/Navigation";
import { cookies } from "next/headers";
import { AvatarOption } from "@/components/header/Avatar";
import { clientAccessToken } from "@/utils/api";

function Header() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  // console.log("🚀 ~ Header ~ clientAccessToken:", clientAccessToken)
  return (
    <header className="sticky top-0 h-16 py-0 px-4 z-50 w-full flex items-center justify-center bg-custom-gradient">
      <div className="max-w-[1860px] px-8 w-full h-full flex items-center justify-between">
        <div className="pr-8">
          <Image src={"/logo.png"} width={90} height={40} alt="Logo" />
        </div>
        <div className="flex items-center w-full h-full">
          <div className=" flex-1 flex justify-start  h-full w-full">
            <NavigationMenuDemo />
          </div>
          <div className="flex-1 gap-6 flex justify-end items-center text-white text-base font-medium hover:[&>a]:underline  ">
            <Link className="" href={"/company"}>
              Nhà tuyển dụng
            </Link>
           
              <AvatarOption/>
              
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
