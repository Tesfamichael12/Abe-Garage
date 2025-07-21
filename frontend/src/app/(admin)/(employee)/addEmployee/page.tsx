"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { addEmployeeRequest } from "@/types";
import { useAddEmployeeMutation } from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

function AddEmployeePage() {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addEmployeeRequest>();

  const onSubmit: SubmitHandler<addEmployeeRequest> = async (data) => {
    try {
      await addEmployee(data).unwrap();
      toast.success("Employee added successfully!");
      router.push("/employees");
    } catch (error: any) {
      toast.error("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 font-jost mb-8">
        Add New Employee
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("employee_first_name", {
                  required: "First name is required",
                })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
              />
              {errors.employee_first_name && (
                <p className="text-customeRed text-xs mt-1">
                  {errors.employee_first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("employee_last_name", {
                  required: "Last name is required",
                })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
              />
              {errors.employee_last_name && (
                <p className="text-customeRed text-xs mt-1">
                  {errors.employee_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("employee_email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            />
            {errors.employee_email && (
              <p className="text-customeRed text-xs mt-1">
                {errors.employee_email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("employee_phone", {
                required: "Phone number is required",
              })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            />
            {errors.employee_phone && (
              <p className="text-customeRed text-xs mt-1">
                {errors.employee_phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("company_role_id", { required: "Role is required" })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            >
              <option value={1}>Employee</option>
              <option value={2}>Admin</option>
            </select>
            {errors.company_role_id && (
              <p className="text-customeRed text-xs mt-1">
                {errors.company_role_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("employee_password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            />
            {errors.employee_password && (
              <p className="text-customeRed text-xs mt-1">
                {errors.employee_password.message}
              </p>
            )}
          </div>

          <div>
            <button
              disabled={isLoading}
              className="w-full flex justify-center items-center px-6 py-3 rounded-lg bg-customeRed text-white hover:bg-customeHover disabled:bg-red-300"
              type="submit"
            >
              {isLoading ? (
                <PulseLoader size={10} color="#fff" />
              ) : (
                <>
                  <FiUserPlus className="mr-2" /> Add Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeePage;
