"use client";
import { useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/features/api/apiSlice";
import { Order, updateOrderRequest } from "@/types";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: ordersResult,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery({
    page,
    limit: 10,
  });
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const handleStatusChange = async (order_id: number, newStatus: number) => {
    try {
      await updateOrder({ order_id, order_status: newStatus });
    } catch (err) {
      console.error("Failed to update order status:", err);
      // Optionally, show an error message to the user
    }
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "Pending", color: "bg-yellow-500" };
      case 1:
        return { text: "In Progress", color: "bg-blue-500" };
      case 2:
        return { text: "Completed", color: "bg-green-600" };
      case 3:
        return { text: "Cancelled", color: "bg-red-600" };
      default:
        return { text: "Unknown", color: "bg-gray-500" };
    }
  };

  const orders = ordersResult?.data ?? [];

  const handleNextPage = () => {
    if (orders.length > 0) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading)
    return <div className="text-center text-xl mt-10">Loading orders...</div>;
  if (isError) {
    console.error("Error fetching orders:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading orders. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold text-customBlue mb-6">Manage Orders</h1>
      <div className="flex-grow overflow-auto">
        <table className="w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border text-center">Order ID</th>
              <th className="py-3 px-4 border text-center">Customer</th>
              <th className="py-3 px-4 border text-center">Vehicle</th>
              <th className="py-3 px-4 border text-center">Total Price</th>
              <th className="py-3 px-4 border text-center">Order Date</th>
              <th className="py-3 px-4 border text-center">Received By</th>
              <th className="py-3 px-4 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const statusInfo = getStatusInfo(order.order_status);
                return (
                  <tr
                    key={order.order_id}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="py-3 px-2 border text-center">
                      {order.order_id}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      {order.customer_name}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      {order.vehicle_model}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      ${Number(order.order_total_price).toFixed(2)}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      {order.employee_name}
                    </td>
                    <td className="py-3 px-2 border text-center">
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.order_id,
                            parseInt(e.target.value)
                          )
                        }
                        disabled={isUpdating}
                        className={`px-3 py-1 rounded text-white text-xs font-semibold border-none outline-none ${statusInfo.color}`}
                      >
                        <option
                          value={0}
                          style={{ backgroundColor: "#FBBF24", color: "white" }}
                        >
                          Pending
                        </option>
                        <option
                          value={1}
                          style={{ backgroundColor: "#3B82F6", color: "white" }}
                        >
                          In Progress
                        </option>
                        <option
                          value={2}
                          style={{ backgroundColor: "#10B981", color: "white" }}
                        >
                          Completed
                        </option>
                        <option
                          value={3}
                          style={{ backgroundColor: "#EF4444", color: "white" }}
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-2 border text-center text-customBlue font-semibold"
                >
                  No orders found for this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-6 py-2 rounded-lg border bg-white hover:bg-gray-100 text-customBlue font-semibold disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-6 py-2 rounded-lg border bg-white hover:bg-gray-100 text-customBlue font-semibold disabled:opacity-50"
          onClick={handleNextPage}
          disabled={orders.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
