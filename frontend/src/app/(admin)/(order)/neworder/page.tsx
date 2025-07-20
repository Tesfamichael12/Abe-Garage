"use client";
import { HiSearch, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import {
  useGetcustomersByKeywordQuery,
  useGetVehiclesByCustomerIdQuery,
  useCreateOrderMutation,
  useGetCustomersQuery,
} from "@/features/api/apiSlice";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Customer, vehicle, CreateOrderRequest } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query/react";
import ServiceSelection from "@/components/services/ServiceSelection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PulseLoader } from "react-spinners";
import { FiUser, FiTruck, FiSettings, FiCheckCircle } from "react-icons/fi";

const steps = [
  { id: 1, name: "Find Customer", icon: FiUser },
  { id: 2, name: "Select Vehicle", icon: FiTruck },
  { id: 3, name: "Add Services", icon: FiSettings },
  { id: 4, name: "Confirm Order", icon: FiCheckCircle },
];

function NewOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<vehicle | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const router = useRouter();
  const employee_id = useSelector((state: RootState) => state.auth.employee_id);

  const {
    data: customersResult,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetcustomersByKeywordQuery(keyword ? { keyword } : skipToken);

  const {
    data: defaultCustomersResult,
    isLoading: isDefaultCustomerLoading,
    error: defaultCustomerError,
  } = useGetCustomersQuery(keyword ? skipToken : { page: 1, limit: 10 });

  const customerId = selectedCustomer?.customer_id;
  const {
    data: vehiclesResult,
    isLoading: isVehicleLoading,
    error: vehicleError,
  } = useGetVehiclesByCustomerIdQuery(
    customerId ? { customer_id: customerId } : skipToken
  );

  const customers = useMemo(
    () =>
      keyword
        ? customersResult?.customers || []
        : defaultCustomersResult?.customers || [],
    [customersResult, defaultCustomersResult, keyword]
  );
  const vehicles = useMemo(() => vehiclesResult?.data || [], [vehiclesResult]);

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedCustomer) {
      setErrorMessage("Please select a customer to continue.");
      return;
    }
    if (currentStep === 2 && !selectedVehicle) {
      setErrorMessage("Please select a vehicle to continue.");
      return;
    }
    if (currentStep === 3) {
      if (price === "" || price <= 0) {
        setErrorMessage("Order price must be provided and greater than 0.");
        return;
      }
      if (selectedServices.length === 0 && !additionalRequest) {
        setErrorMessage(
          "Please select at least one service or provide an additional request."
        );
        return;
      }
    }
    setErrorMessage(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmitOrder = async () => {
    const newOrder: CreateOrderRequest = {
      employee_id: employee_id!,
      customer_id: selectedCustomer!.customer_id,
      vehicle_id: selectedVehicle!.vehicle_id!,
      order_total_price: price as number,
      additional_request: additionalRequest || undefined,
      order_services: selectedServices.map((service_id) => ({ service_id })),
    };

    try {
      await createOrder(newOrder).unwrap();
      router.push("/orders");
    } catch (error) {
      console.error("Failed to create order", error);
      setErrorMessage("Failed to create order. Please try again later.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="relative mb-4">
              <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                className="w-full border border-gray-300 p-4 pl-12 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Search by name, email, or phone..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            {(isCustomerLoading || isDefaultCustomerLoading) && (
              <div className="text-center p-4">Searching...</div>
            )}
            {(customerError || defaultCustomerError) && (
              <p className="mt-4 text-red-500">Error fetching customers.</p>
            )}
            <div className="space-y-2">
              {customers.map((customer) => (
                <div
                  key={customer.customer_id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`cursor-pointer p-4 rounded-lg border ${
                    selectedCustomer?.customer_id === customer.customer_id
                      ? "bg-red-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold">{`${customer.customer_first_name} ${customer.customer_last_name}`}</p>
                  <p className="text-sm">{customer.customer_email}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            {isVehicleLoading && (
              <div className="text-center p-4">Loading vehicles...</div>
            )}
            {vehicleError && (
              <p className="mt-4 text-red-500">Error fetching vehicles.</p>
            )}
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.vehicle_id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`cursor-pointer p-4 rounded-lg border ${
                  selectedVehicle?.vehicle_id === vehicle.vehicle_id
                    ? "bg-red-500 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <p className="font-semibold">{`${vehicle.vehicle_year} ${vehicle.vehicle_make} ${vehicle.vehicle_model}`}</p>
                <p className="text-sm">Tag: {vehicle.vehicle_tag}</p>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 font-jost">
                Select Services
              </h3>
              <ServiceSelection
                selectedServices={selectedServices}
                onServiceSelect={(id) =>
                  setSelectedServices((prev) =>
                    prev.includes(id)
                      ? prev.filter((i) => i !== id)
                      : [...prev, id]
                  )
                }
              />
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="additionalRequest"
                  className="block text-lg font-medium text-gray-700 font-jost"
                >
                  Additional Requests
                </label>
                <textarea
                  id="additionalRequest"
                  rows={4}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={additionalRequest}
                  onChange={(e) => setAdditionalRequest(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-lg font-medium text-gray-700 font-jost"
                >
                  Total Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 font-jost mb-4">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold">
                  {selectedCustomer?.customer_first_name}{" "}
                  {selectedCustomer?.customer_last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-semibold">
                  {selectedVehicle?.vehicle_year}{" "}
                  {selectedVehicle?.vehicle_make}{" "}
                  {selectedVehicle?.vehicle_model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-semibold text-2xl text-red-600">${price}</p>
              </div>
              {additionalRequest && (
                <div>
                  <p className="text-sm text-gray-500">Additional Requests</p>
                  <p className="font-semibold">{additionalRequest}</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 font-jost mb-8">
        Create New Order
      </h1>
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 ? "w-full" : ""
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep > step.id
                      ? "bg-red-600 text-white"
                      : currentStep === step.id
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <FiCheckCircle /> : <step.icon />}
                </span>
                <span
                  className={`ml-4 font-medium ${
                    currentStep >= step.id ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 mx-4 ${
                    currentStep > step.id ? "border-red-600" : "border-gray-200"
                  }`}
                ></div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md min-h-[300px]">
        {renderStepContent()}
      </div>

      {errorMessage && (
        <div className="mt-4 text-center text-red-500 bg-red-100 p-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="flex items-center px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <HiArrowLeft className="mr-2" />
          Previous
        </button>
        {currentStep < 4 ? (
          <button
            onClick={handleNextStep}
            className="flex items-center px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Next
            <HiArrowRight className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmitOrder}
            disabled={isLoading}
            className="flex items-center px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300"
          >
            {isLoading ? (
              <PulseLoader size={10} color="#fff" />
            ) : (
              "Submit Order"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default NewOrderPage;
