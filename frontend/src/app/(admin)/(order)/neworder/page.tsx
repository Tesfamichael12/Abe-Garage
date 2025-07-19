"use client";
import { HiSearch, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import {
  useGetcustomersByKeywordQuery,
  useGetVehiclesByCustomerIdQuery,
  useCreateOrderMutation,
} from "@/features/api/apiSlice";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Customer, vehicle, CreateOrderRequest } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query/react";
import ServiceSelection from "@/components/services/ServiceSelection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PulseLoader } from "react-spinners";

function NewOrderPage() {
  const [step, setStep] = useState(1);
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

  const customerId = selectedCustomer?.customer_id;
  const {
    data: vehiclesResult,
    isLoading: isVehicleLoading,
    error: vehicleError,
  } = useGetVehiclesByCustomerIdQuery(
    customerId ? { customer_id: customerId } : skipToken
  );

  const customers = useMemo(
    () => customersResult?.customers || [],
    [customersResult]
  );
  const vehicles = useMemo(() => vehiclesResult?.data || [], [vehiclesResult]);

  const handleNextStep = () => {
    if (step === 1 && !selectedCustomer) {
      setErrorMessage("Please select a customer to continue.");
      return;
    }
    if (step === 2 && !selectedVehicle) {
      setErrorMessage("Please select a vehicle to continue.");
      return;
    }
    setErrorMessage(null);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleSubmitOrder = async () => {
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

    const newOrder: CreateOrderRequest = {
      employee_id: employee_id!,
      customer_id: selectedCustomer!.customer_id,
      vehicle_id: selectedVehicle!.vehicle_id!,
      order_total_price: price,
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 1: Find Customer
            </h2>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 p-4 rounded-md pr-10 focus:ring-2 focus:ring-customBlue"
                placeholder="Search by name or email..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>

            {isCustomerLoading && (
              <p className="mt-4 text-gray-600">Searching...</p>
            )}
            {customerError && (
              <p className="mt-4 text-red-500">Error fetching customers.</p>
            )}
            {customers.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr
                        key={customer.customer_id}
                        onClick={() => setSelectedCustomer(customer)}
                        className={`cursor-pointer hover:bg-customBlue hover:text-white ${
                          selectedCustomer?.customer_id === customer.customer_id
                            ? "bg-customBlue text-white"
                            : ""
                        }`}
                      >
                        <td className="py-2 px-4 border-b">{`${customer.customer_first_name} ${customer.customer_last_name}`}</td>
                        <td className="py-2 px-4 border-b">
                          {customer.customer_email}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {customer.customer_phone_number}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 2: Select Vehicle for {selectedCustomer?.customer_first_name}
            </h2>
            {isVehicleLoading && (
              <p className="mt-4 text-gray-600">Loading vehicles...</p>
            )}
            {vehicleError && (
              <p className="mt-4 text-red-500">Error fetching vehicles.</p>
            )}
            {vehicles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b">Year</th>
                      <th className="py-2 px-4 border-b">Make</th>
                      <th className="py-2 px-4 border-b">Model</th>
                      <th className="py-2 px-4 border-b">Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr
                        key={vehicle.vehicle_id}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={`cursor-pointer hover:bg-customBlue hover:text-white ${
                          selectedVehicle?.vehicle_id === vehicle.vehicle_id
                            ? "bg-customBlue text-white"
                            : ""
                        }`}
                      >
                        <td className="py-2 px-4 border-b">
                          {vehicle.vehicle_year}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {vehicle.vehicle_make}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {vehicle.vehicle_model}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {vehicle.vehicle_tag}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No vehicles found for this customer.
              </p>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 3: Add Services & Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
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
                    className="block text-lg font-medium text-gray-700"
                  >
                    Additional Requests
                  </label>
                  <textarea
                    id="additionalRequest"
                    rows={4}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customBlue"
                    value={additionalRequest}
                    onChange={(e) => setAdditionalRequest(e.target.value)}
                    placeholder="e.g., Check for noise in the front right wheel."
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Total Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customBlue"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                    placeholder="Enter total price"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-customBlue mb-2">
          Create New Order
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-customBlue h-2.5 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {renderStep()}

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center font-semibold">
            {errorMessage}
          </p>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="flex items-center bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition"
            >
              <HiArrowLeft className="mr-2" /> Previous
            </button>
          )}

          <div className="flex-grow"></div>

          {step < 3 && (
            <button
              onClick={handleNextStep}
              className="flex items-center bg-customBlue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Next <HiArrowRight className="ml-2" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleSubmitOrder}
              disabled={isLoading}
              className="bg-customeRed text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition"
            >
              {isLoading ? (
                <PulseLoader size={8} color="#fff" />
              ) : (
                "Submit Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewOrderPage;
