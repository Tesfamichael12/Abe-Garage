"use client";
import AdminMenu from "@/components/adminMenu/AdminMenu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="sticky top-[70px] h-[calc(100vh-70px)]">
        <AdminMenu />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
