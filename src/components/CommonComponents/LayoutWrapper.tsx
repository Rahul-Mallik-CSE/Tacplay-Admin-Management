/** @format */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/CommonComponents/DashboardSidebar";
import NavBar from "@/components/CommonComponents/NabBar";

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
