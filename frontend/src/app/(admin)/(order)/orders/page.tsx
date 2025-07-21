"use client";
import { useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/features/api/apiSlice";
import { Order, updateOrderRequest } from "@/types";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { toast } from "react-hot-toast";

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
      await updateOrder({ order_id, order_status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update order status. Please try again.");
    }
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { text: "Pending", color: "bg-yellow-100 text-yellow-800" };
      case 1:
        return { text: "In Progress", color: "bg-blue-100 text-blue-800" };
      case 2:
        return { text: "Completed", color: "bg-green-100 text-green-800" };
      case 3:
        return { text: "Cancelled", color: "bg-red-100 text-customeRed" };
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-800" };
    }
  };

  const orders = ordersResult?.data ?? [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <PuffLoader color="#4A90E2" />
      </div>
    );
  if (isError) {
    toast.error("Failed to fetch orders. Please try again later.");
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 font-jost mb-6">
        Manage Orders
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Received By
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => {
                  const statusInfo = getStatusInfo(order.order_status);
                  return (
                    <tr
                      key={order.order_id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {order.order_id}
                      </td>
                      <td className="px-6 py-4">{order.customer_name}</td>
                      <td className="px-6 py-4">{order.vehicle_model}</td>
                      <td className="px-6 py-4">
                        ${Number(order.order_total_price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{order.employee_name}</td>
                      <td className="px-6 py-4">
                        <div className="relative cursor-pointer">
                          <select
                            value={order.order_status}
                            onChange={(e) =>
                              handleStatusChange(
                                order.order_id,
                                parseInt(e.target.value)
                              )
                            }
                            disabled={isUpdating}
                            className={`w-full text-center px-3 py-1 rounded-md text-xs font-semibold border-none outline-none appearance-none ${statusInfo.color} cursor-pointer`}
                            style={{ minWidth: "120px" }}
                          >
                            <option value={0}>Pending</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Completed</option>
                            <option value={3}>Cancelled</option>
                          </select>
                          <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-6 items-center">
        <button
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 text-gray-700 font-semibold disabled:opacity-50 flex items-center"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <FiChevronLeft className="mr-2" />
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">Page {page}</span>
        <button
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 text-gray-700 font-semibold disabled:opacity-50 flex items-center"
          onClick={() => setPage(page + 1)}
          disabled={orders.length < 10}
        >
          Next
          <FiChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
