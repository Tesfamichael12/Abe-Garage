"use client";
import { useSelector } from "react-redux";
import KpiSection from "@/components/KpiSection";
import OrderTrends from "@/components/OrderTrends";
import RevenueBreakdown from "@/components/RevenueBreakdown";
import { RootState } from "@/store/store";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-jost">
          Welcome back, {user.employee_first_name || "Admin"}!
        </h1>
        <p className="text-gray-500">
          Here&apos;s a snapshot of your garage&apos;s performance.
        </p>
      </div>

      <KpiSection />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderTrends />
        <RevenueBreakdown />
      </div>
    </div>
  );
};

export default Dashboard;
