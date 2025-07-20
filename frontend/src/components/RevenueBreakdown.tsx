"use client";
import React from "react";
import { useGetRevenueQuery } from "@/features/api/apiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function RevenueBreakdown() {
  const { data: revenueData, error, isLoading } = useGetRevenueQuery();

  if (error)
    return (
      <div className="text-center p-4 text-red-500">
        Error loading revenue data.
      </div>
    );
  if (isLoading) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 font-jost">
        Monthly Revenue Breakdown
      </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={revenueData || []}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueBreakdown;
