"use client";
import { useState } from "react";
import {
  useGetcustomersByKeywordQuery,
  useGetCustomersQuery,
} from "@/features/api/apiSlice";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight, FiUserPlus } from "react-icons/fi";
import Link from "next/link";

const LIMIT = 10;

function CustomersPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: customersData,
    isLoading,
    isError,
    error,
  } = useGetCustomersQuery({ page, limit: LIMIT });
  const { data: searchCustomersData, isLoading: isSearchLoading } =
    useGetcustomersByKeywordQuery({ keyword }, { skip: !keyword });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1); // Reset to first page on new search
    setKeyword(e.target.value);
  };

  const customers = keyword
    ? searchCustomersData?.customers
    : customersData?.customers;
  const totalPages = customersData
    ? Math.ceil(customersData.totalCustomers / LIMIT)
    : 0;

  if (isLoading && !keyword)
    return (
      <div className="flex justify-center items-center h-64">
        <PuffLoader color="#4A90E2" />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading customers.
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-jost">
          Manage Customers
        </h1>
        <Link href="/addCustomer">
          <button className="flex items-center px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
            <FiUserPlus className="mr-2" />
            Add Customer
          </button>
        </Link>
      </div>

      <div className="relative mb-8">
        <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          className="w-full border border-gray-300 p-4 pl-12 rounded-lg focus:ring-2 focus:ring-red-500"
          placeholder="Search by name, email, or phone..."
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>

      {isSearchLoading ? (
        <div className="flex justify-center items-center h-64">
          <PuffLoader color="#4A90E2" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers && customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      onClick={() =>
                        router.push(`/customers/${customer.customer_id}`)
                      }
                      className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {customer.customer_first_name}{" "}
                        {customer.customer_last_name}
                      </td>
                      <td className="px-6 py-4">{customer.customer_email}</td>
                      <td className="px-6 py-4">
                        {customer.customer_phone_number}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            customer.active_customer_status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {customer.active_customer_status
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!keyword && totalPages > 1 && (
        <div className="flex justify-end mt-6 items-center">
          <button
            className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 text-gray-700 font-semibold disabled:opacity-50 flex items-center"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <FiChevronLeft className="mr-2" />
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 text-gray-700 font-semibold disabled:opacity-50 flex items-center"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
            <FiChevronRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
