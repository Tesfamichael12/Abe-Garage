"use client";
import AdminMenu from "@/components/adminMenu/AdminMenu";
import React from "react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="sticky top-[70px] h-[calc(100vh-70px)]">
        <AdminMenu />
      </div>
      <main className="flex-grow p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
