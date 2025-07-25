"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/features/api/apiSlice";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const service_id = parseInt(id as string);

  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const { data: service } = useGetServiceByIdQuery({ service_id });

  useEffect(() => {
    if (service?.service) {
      setServiceName(service.service?.service_name);
      setServiceDescription(service.service?.service_description);
    }
  }, [service]);

  const handleEditClick = async () => {
    if (!serviceName || !serviceDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setErrorMessage("");
      await updateService({
        service_id,
        service_name: serviceName,
        service_description: serviceDescription,
      }).unwrap();
      toast.success("Service updated successfully");
      router.push("/Services");
    } catch (error) {
      toast.error("Failed to update service. Please try again.");
    }
  };

  return (
    <div>
      <div className=" rounded-sm my-5  px-4 py-5">
        <p className="text-4xl font-bold text-customBlue my-10">
          Add a new service
          <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
        </p>

        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          placeholder="Service name"
          className="w-full p-2 my-5 border rounded-md focus:ring focus:ring-blue-300"
        />

        <textarea
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
          placeholder="Service description"
          className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
          rows={3}
        />

        {errorMessage && <p className="text-customeRed mt-2">{errorMessage}</p>}

        <button
          className=" px-10 py-4 mt-5 text-white bg-customeRed rounded-md"
          onClick={handleEditClick}
          disabled={isLoading}
        >
          {isLoading ? <PulseLoader size={8} color="#fff" /> : "Edit Service"}
        </button>
      </div>
    </div>
  );
}

export default EditServicePage;
