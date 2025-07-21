"use client";
import React, { useState } from "react";
import {
  useGetEmpoyeesQuery,
  useDeleteEmployeeMutation,
} from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiUserPlus,
} from "react-icons/fi";
import ConfirmationModal from "@/components/ConfirmationModal";
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import toast from "react-hot-toast";

function EmployeesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const {
    data: employeesData,
    isLoading,
    isError,
    error,
  } = useGetEmpoyeesQuery({ page, limit: 10 });

  const employees = employeesData?.employees ?? [];

  const handleDeleteClick = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployee !== null) {
      try {
        await deleteEmployee({ employee_id: selectedEmployee }).unwrap();
        setIsModalOpen(false);
        setSelectedEmployee(null);
        toast.success("Employee deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete employee. Please try again.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <PuffLoader color="#4A90E2" />
      </div>
    );

  if (isError) {
    toast.error("Error fetching employees. Please try again later.");
    return <div>Error fetching employees. Please try again later.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-jost">
          Manage Employees
        </h1>
        <Link href="/addEmployee">
          <button className="flex items-center px-4 py-2 rounded-lg bg-customeRed text-white hover:bg-customeHover">
            <FiUserPlus className="mr-2" />
            Add Employee
          </button>
        </Link>
      </div>

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
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {employee.employee_first_name}{" "}
                      {employee.employee_last_name}
                    </td>
                    <td className="px-6 py-4">{employee.employee_email}</td>
                    <td className="px-6 py-4">{employee.employee_phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          employee.company_role_id === 2
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {employee.company_role_id === 2 ? "Admin" : "Employee"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          employee.active_employee
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-customeRed"
                        }`}
                      >
                        {employee.active_employee ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center space-x-4">
                        <button
                          onClick={() =>
                            router.push(
                              `/employees/edit/${employee.employee_id}`
                            )
                          }
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteClick(employee.employee_id)
                          }
                          className="text-customeRed hover:text-customeHover"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No employees found.
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
          disabled={employees.length < 10}
        >
          Next
          <FiChevronRight className="ml-2" />
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </div>
  );
}

export default EmployeesPage;
