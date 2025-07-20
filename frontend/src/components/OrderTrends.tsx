"use client";
import { useGetOrderTrendQuery } from "@/features/api/apiSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";

function OrderTrends() {
  const { data: orderTrends, isLoading, error } = useGetOrderTrendQuery();

  if (error)
    return (
      <div className="text-center p-4 text-red-500">
        Error loading order trends.
      </div>
    );
  if (isLoading) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 font-jost">
        Monthly Order Trends
      </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={orderTrends || []}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OrderTrends;
