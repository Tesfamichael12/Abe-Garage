"use client";
import { useGetKpisQuery } from "@/features/api/apiSlice";
import { FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { IconType } from "react-icons";

interface KpiCardProps {
  Icon: IconType;
  title: string;
  value: string | number;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ Icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-jost">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

function KpiSection() {
  const { data: kpiData, isLoading, error } = useGetKpisQuery();

  if (isLoading) return <div>Loading KPIs...</div>;
  if (error) return <div>Error loading KPIs.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <KpiCard
        Icon={FaUsers}
        title="Total Customers"
        value={kpiData?.total_customers ?? 0}
        color="bg-blue-500"
      />
      <KpiCard
        Icon={FaShoppingCart}
        title="Active Orders"
        value={kpiData?.active_orders ?? 0}
        color="bg-yellow-500"
      />
      <KpiCard
        Icon={FaDollarSign}
        title="Total Revenue"
        value={`$${(kpiData?.total_revenue ?? 0).toLocaleString()}`}
        color="bg-green-500"
      />
    </div>
  );
}

export default KpiSection;
