"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiShoppingBag,
  FiUserPlus,
  FiUserCheck,
  FiSettings,
  FiMenu,
  FiPackage,
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: FiGrid },
  { name: "Orders", href: "/orders", icon: FiShoppingBag },
  { name: "New Order", href: "/neworder", icon: FiPackage },
  { name: "Employees", href: "/employees", icon: FiUsers },
  { name: "Add Employee", href: "/addEmployee", icon: FiUserPlus },
  { name: "Customers", href: "/customers", icon: FiUsers },
  { name: "Add Customer", href: "/addCustomer", icon: FiUserCheck },
  { name: "Services", href: "/Services", icon: FiSettings },
];

const AdminMenu = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  if (!session) {
    return null;
  }

  return (
    <div
      className={`bg-gray-900 text-gray-300 h-full flex flex-col transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center p-4 border-b border-gray-800 ${
          isMenuOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isMenuOpen && (
          <h1 className="text-2xl font-bold font-jost text-white">Admin</h1>
        )}
        <FiMenu
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      <ul className="flex-1 mt-5 space-y-2 px-4">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link
              href={href}
              className="flex items-center space-x-3 p-3 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
            >
              <Icon className="text-xl" />
              {isMenuOpen && (
                <span className="text-sm font-medium">{name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
