/** @format */

"use client";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3200} newestOnTop />
      {children}
    </>
  );
}
