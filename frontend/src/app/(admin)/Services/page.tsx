"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";
import { PulseLoader } from "react-spinners";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
} from "@/features/api/apiSlice";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useRouter } from "next/navigation";

function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const router = useRouter();

  const { data: servicesData, isLoading: isLoadingServices } =
    useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = servicesData?.services ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !serviceDescription) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setErrorMessage("");
      await createService({
        service_name: serviceName,
        service_description: serviceDescription,
      }).unwrap();
      setServiceName("");
      setServiceDescription("");
      alert("Service added successfully!");
    } catch (error: any) {
      console.error(error);
      if (error?.data?.message) {
        setErrorMessage(error.data.message);
        alert(`Error: ${error.data.message}`);
      } else {
        const errorMessageText =
          "Sorry, something went wrong. Please try again.";
        setErrorMessage(errorMessageText);
        alert(errorMessageText);
      }
    }
  };

  const onConfirmDelete = async () => {
    if (serviceId !== null) {
      try {
        setDeleteErrorMessage("");
        await deleteService({ service_id: serviceId }).unwrap();
        setIsModalOpen(false);
        setServiceId(null);
      } catch (error: any) {
        console.error(error);
        if (error.data && error.data.error) {
          setDeleteErrorMessage(error.data.error);
        } else {
          setDeleteErrorMessage(
            "Sorry, something went wrong. Please try again."
          );
        }
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setServiceId(id);
    setDeleteErrorMessage("");
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 font-jost mb-8">
        Manage Services
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 font-jost mb-4">
              Available Services
            </h2>
            {isLoadingServices ? (
              <div className="text-center">
                <PulseLoader color="#4A90E2" />
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.service_id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {service.service_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.service_description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          router.push(`Services/edit/${service.service_id}`)
                        }
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(service.service_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 font-jost mb-4">
              Add New Service
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="serviceName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Name
                </label>
                <input
                  id="serviceName"
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g., Oil Change"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="serviceDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="serviceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Describe the service..."
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  rows={4}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300"
                disabled={isCreating}
              >
                {isCreating ? (
                  <PulseLoader size={10} color="#fff" />
                ) : (
                  <>
                    <FiPlusCircle className="mr-2" /> Add Service
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onConfirmDelete}
        message="Are you sure you want to delete this service?"
        errorMessage={deleteErrorMessage}
      />
    </div>
  );
}

export default ServicesPage;
