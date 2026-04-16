/** @format */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/CommonComponents/DashboardSidebar";
import NavBar from "@/components/CommonComponents/NabBar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastContainerProps = {
  position: "top-center" as const,
  autoClose: 4200,
  limit: 4,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  draggablePercent: 60,
  pauseOnHover: true,
  theme: "dark" as const,
  className: "!p-3",
  toastClassName:
    "!bg-card/95 !backdrop-blur-md !border !border-white/10 !text-primary !rounded-xl !shadow-xl !min-h-0",
  bodyClassName: "!p-0 !m-0 !items-start",
  progressClassName: "!bg-custom-red",
};

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-pass",
  "/verify-otp",
  "/reset-pass",
  "/profile-setup",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthPage) {
    return <div className="bg-root-bg min-h-screen">{children}</div>;
  }

  return (
    <SidebarProvider>
      <ToastContainer {...toastContainerProps} />
      <DashboardSidebar />
      <SidebarInset className="overflow-x-hidden">
        <div className="bg-root-bg min-h-screen ">
          <NavBar />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
