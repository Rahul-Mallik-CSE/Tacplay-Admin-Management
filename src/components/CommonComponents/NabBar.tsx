/** @format */
"use client";

import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogOutModal";
import { SidebarTrigger } from "../ui/sidebar";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLogoutModalOpen(false);
    router.push("/sign-in");
  };
  if (
    pathname == "/sign-in" ||
    pathname == "/sign-up" ||
    pathname == "/create-new-pass" ||
    pathname == "/reset-pass" ||
    pathname == "/verify-email" ||
    pathname == "/verify-otp"
  )
    return null;
  return (
    <div className="w-full sticky top-0 z-9 ">
      <div className="max-w-625 rounded-2xl mx-auto flex items-center justify-between  px-3  py-3">
        <div className="flex gap-2 items-center justify-center">
          {/* mobile menu button */}
          <div className=" rounded-sm ">
            <SidebarTrigger />
          </div>
          {/* Left side - Title */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl font-bold text-primary truncate">
            Dashboard
          </h1>
        </div>

        {/* Right side - Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Notification Bell */}
          <button
            onClick={() => router.push("/notifications")}
            className="cursor-pointer text-secondary hover:text-primary border border-secondary  hover:border-primary relative p-1.5 sm:p-2  rounded-full transition-colors shrink-0"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 " />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-[#E1BD25] rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer border border-transparent hover:border-secondary items-center gap-1 sm:gap-2  rounded-lg px-1 sm:px-2 py-1 transition-colors shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-800 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/logo.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-primary">Moni Roy</p>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-primary hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 border border-secondary bg-background rounded-lg shadow-lg"
            >
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                <UserCog className="w-5 h-5 text-blue-500" />
                <span className="text-base">Setting</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-base">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default NavBar;
