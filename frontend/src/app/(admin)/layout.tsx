"use client";
import AdminMenu from "@/components/adminMenu/AdminMenu";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "white",
            color: "#374151",
          },
        }}
      />
      <div className="sticky top-[70px] h-[calc(100vh-70px)]">
        <AdminMenu />
      </div>
      <main className="flex-grow p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
