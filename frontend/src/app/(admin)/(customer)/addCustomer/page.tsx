"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { CustomerFormField } from "@/types";
import { useAddCustomerMutation } from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

function AddCustomerPage() {
  const router = useRouter();
  const [addCustomer, { isLoading }] = useAddCustomerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormField>();

  const onSubmit: SubmitHandler<CustomerFormField> = async (data) => {
    try {
      await addCustomer(data).unwrap();
      toast.success("Customer added successfully!");
      router.push("/customers");
    } catch (error: any) {
      toast.error("Failed to add customer. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 font-jost mb-8">
        Add New Customer
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("customer_first_name", {
                  required: "First name is required",
                })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
              />
              {errors.customer_first_name && (
                <p className="text-customeRed text-xs mt-1">
                  {errors.customer_first_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("customer_last_name", {
                  required: "Last name is required",
                })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
              />
              {errors.customer_last_name && (
                <p className="text-customeRed text-xs mt-1">
                  {errors.customer_last_name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("customer_email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            />
            {errors.customer_email && (
              <p className="text-customeRed text-xs mt-1">
                {errors.customer_email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("customer_phone_number", {
                required: "Phone number is required",
              })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-customeRed"
            />
            {errors.customer_phone_number && (
              <p className="text-customeRed text-xs mt-1">
                {errors.customer_phone_number.message}
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
                  <FiUserPlus className="mr-2" /> Add Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerPage;
