"use client";
import { useGetKpisQuery } from "@/features/api/apiSlice";
import { FiUsers, FiClipboard, FiDollarSign, FiArrowUp } from "react-icons/fi";
import { IconType } from "react-icons";

interface KpiCardProps {
  Icon: IconType;
  title: string;
  value: string | number;
  change?: string;
  bgColor: string;
  iconColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  Icon,
  title,
  value,
  change,
  bgColor,
  iconColor,
}) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${bgColor}`}
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl`}>
        <Icon size={28} className={`${iconColor}`} />
      </div>
      {change && (
        <div className="flex items-center text-sm font-semibold text-green-500">
          <FiArrowUp className="mr-1" />
          <span>{change}</span>
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 font-jost">{title}</p>
    </div>
  </div>
);

function KpiSection() {
  const { data: kpiData, isLoading, error } = useGetKpisQuery();

  if (error) return <div>Error loading KPIs.</div>;
  if (isLoading) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <KpiCard
        Icon={FiUsers}
        title="Total Customers"
        value={kpiData?.total_customers ?? 0}
        bgColor="bg-blue-50"
        iconColor="text-blue-500"
      />
      <KpiCard
        Icon={FiClipboard}
        title="Active Orders"
        value={kpiData?.active_orders ?? 0}
        bgColor="bg-yellow-50"
        iconColor="text-yellow-500"
      />
      <KpiCard
        Icon={FiDollarSign}
        title="Total Revenue"
        value={`$${(kpiData?.total_revenue ?? 0).toLocaleString()}`}
        bgColor="bg-green-50"
        iconColor="text-green-500"
      />
    </div>
  );
}

export default KpiSection;
