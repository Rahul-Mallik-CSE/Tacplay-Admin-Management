/** @format */
"use client";

import { ChevronDown, User, UserCog, LogOut } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogOutModal";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/features/auth/authAPI";
import { useGetMyProfileQuery } from "@/redux/features/settings/settingsAPI";
import {
  clearAuthTokens,
  getErrorMessage,
  getSuccessMessage,
} from "@/lib/auth";
import { clearAuthSession } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import LanguageSelector from "@/components/CommonComponents/LanguageSelector";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const isAuthPage =
    pathname == "/sign-in" ||
    pathname == "/sign-up" ||
    pathname == "/create-new-pass" ||
    pathname == "/reset-pass" ||
    pathname == "/verify-email" ||
    pathname == "/verify-otp";

  const hasStoredEmail = Boolean(user?.email?.trim());
  const {
    data: myProfileResponse,
    isLoading,
    isFetching,
  } = useGetMyProfileQuery(undefined, {
    skip: isAuthPage || hasStoredEmail,
  });

  const profileUser = myProfileResponse?.data.user;
  const resolvedEmail =
    user?.email?.trim() || profileUser?.email_address?.trim();
  const hasEmail = Boolean(resolvedEmail);
  const displayName =
    user?.full_name?.trim() ||
    profileUser?.full_name?.trim() ||
    t("common.dashboard");
  const profileImage = toAbsoluteMediaUrl(
    user?.profile_image ?? profileUser?.profile_image,
  );
  const isProfileLoading = !hasStoredEmail && (isLoading || isFetching);

  const showProfileImage = hasEmail && Boolean(profileImage);

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      toast.success(getSuccessMessage(response, t("navbar.logout")));
    } catch (error) {
      toast.error(getErrorMessage(error, t("navbar.logout")));
    } finally {
      clearAuthTokens();
      dispatch(clearAuthSession());
      setIsLogoutModalOpen(false);
      router.push("/sign-in");
    }
  };
  if (isAuthPage) return null;
  return (
    <div className="w-full sticky top-0 z-9 ">
      <div className="max-w-625 rounded-2xl mx-auto flex items-center justify-between    py-3">
        <div className="flex gap-2 items-center justify-center">
          {/* mobile menu button */}
          <div className=" rounded-sm ">
            <SidebarTrigger />
          </div>
          {/* Left side - Title */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl font-bold text-primary truncate">
            {t("navbar.title")}
          </h1>
        </div>

        {/* Right side - Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <LanguageSelector />
          {isProfileLoading ? (
            <div className="flex items-center gap-2 rounded-lg px-1 sm:px-2 py-1 shrink-0">
              <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
              <Skeleton className="hidden sm:block h-4 w-24" />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex cursor-pointer border border-transparent hover:border-secondary items-center gap-1 sm:gap-2  rounded-lg px-1 sm:px-2 py-1 transition-colors shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-800 flex items-center justify-center overflow-hidden shrink-0">
                  {showProfileImage ? (
                    <Image
                      src={profileImage as string}
                      alt={displayName}
                      width={40}
                      height={40}
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-primary">
                    {displayName}
                  </p>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-primary hidden sm:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 border border-secondary bg-background rounded-lg shadow-lg"
              >
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                >
                  <UserCog className="w-5 h-5 text-blue-500" />
                  <span className="text-base">{t("navbar.settings")}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="text-base">{t("navbar.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
