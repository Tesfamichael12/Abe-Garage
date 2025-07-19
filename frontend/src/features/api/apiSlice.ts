import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  OrderResponse,
  customersResponse,
  vehicleResponse,
  serviceResponse,
  CreateOrderRequest,
  AddCustomerRequest,
  getCustomersResponse,
  vehicle,
  customerResponse,
  updateCustomerInfoRequest,
  employeeResponse,
  updateEmployeeInfoRequest,
  getEmployeeByIdResponse,
  addEmployeeRequest,
  service,
  serviceUpdate,
  getServiceByIdResponse,
  kpis,
  orderTrand,
  revenue,
  updateOrderRequest,
} from "@/types";
import { RootState } from "@/store/store";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "Order",
    "Customer",
    "Vehicle",
    "Service",
    "Employee",
    "Dashboard",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      let token = state.auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/orders?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ order_id }) => ({
                type: "Order" as const,
                id: order_id,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    getcustomersByKeyword: builder.query<
      customersResponse,
      { keyword: string }
    >({
      query: ({ keyword }) => `/customer/search?keyword=${keyword}`,
      providesTags: (result) =>
        result && result.customers
          ? [
              ...result.customers.map(({ customer_id }) => ({
                type: "Customer" as const,
                id: customer_id,
              })),
              { type: "Customer", id: "LIST" },
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
    getVehiclesByCustomerId: builder.query<
      vehicleResponse,
      { customer_id: number }
    >({
      query: ({ customer_id }) => `/vehicle/customer/${customer_id}`,
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ vehicle_id }) => ({
                type: "Vehicle" as const,
                id: vehicle_id,
              })),
              { type: "Vehicle", id: "LIST" },
            ]
          : [{ type: "Vehicle", id: "LIST" }],
    }),
    getServices: builder.query<serviceResponse, void>({
      query: () => "/service",
      providesTags: (result) =>
        result && result.services
          ? [
              ...result.services.map(({ service_id }) => ({
                type: "Service" as const,
                id: service_id,
              })),
              { type: "Service", id: "LIST" },
            ]
          : [{ type: "Service", id: "LIST" }],
    }),
    getServiceById: builder.query<
      getServiceByIdResponse,
      { service_id: number }
    >({
      query: ({ service_id }) => `/service/${service_id}`,
      providesTags: (result, error, arg) => [
        { type: "Service", id: arg.service_id },
      ],
    }),

    createService: builder.mutation<void, service>({
      query: (newService) => ({
        url: "/service",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
    updateService: builder.mutation<void, serviceUpdate>({
      query: (newService) => ({
        url: "/service",
        method: "PUT",
        body: newService,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Service", id: arg.service_id },
        { type: "Service", id: "LIST" },
      ],
    }),
    deleteService: builder.mutation<void, { service_id: number }>({
      query: ({ service_id }) => ({
        url: `/service/${service_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),

    createOrder: builder.mutation<void, CreateOrderRequest>({
      query: (newOrder) => ({
        url: "/order",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }, "Dashboard"],
    }),
    addCustomer: builder.mutation<void, AddCustomerRequest>({
      query: (newCustomer) => ({
        url: "/customer",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }, "Dashboard"],
    }),
    getCustomers: builder.query<
      getCustomersResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/customer?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result && result.customers
          ? [
              ...result.customers.map(({ customer_id }) => ({
                type: "Customer" as const,
                id: customer_id,
              })),
              { type: "Customer", id: "LIST" },
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
    addVehicle: builder.mutation<void, vehicle>({
      query: (newVehicle) => ({
        url: "/vehicle",
        method: "POST",
        body: newVehicle,
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),
    getOrdersPerCustomer: builder.query<OrderResponse, { customer_id: number }>(
      {
        query: ({ customer_id }) => `/orders/customer/${customer_id}`,
        providesTags: (result) =>
          result && result.data
            ? [
                ...result.data.map(({ order_id }) => ({
                  type: "Order" as const,
                  id: order_id,
                })),
              ]
            : [],
      }
    ),

    getcustomerById: builder.query<customerResponse, { customer_id: number }>({
      query: ({ customer_id }) => `/customer/${customer_id}`,
      providesTags: (result, error, arg) => [
        { type: "Customer", id: arg.customer_id },
      ],
    }),

    updateCutomerInfo: builder.mutation<void, updateCustomerInfoRequest>({
      query: (newCustomerInfo) => ({
        url: "/customer",
        method: "PUT",
        body: newCustomerInfo,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Customer", id: arg.customer_id },
        { type: "Customer", id: "LIST" },
      ],
    }),
    getEmpoyees: builder.query<
      employeeResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/employees?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result && result.employees
          ? [
              ...result.employees.map(({ employee_id }) => ({
                type: "Employee" as const,
                id: employee_id,
              })),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    employeeUpdateInfo: builder.mutation<void, updateEmployeeInfoRequest>({
      query: (newEmployeeInfo) => ({
        url: "/employee",
        method: "PUT",
        body: newEmployeeInfo,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employee", id: arg.employee_id },
        { type: "Employee", id: "LIST" },
      ],
    }),
    getEmployeeById: builder.query<
      getEmployeeByIdResponse,
      { employee_id: number }
    >({
      query: ({ employee_id }) => `/employee/${employee_id}`,
      providesTags: (result, error, arg) => [
        { type: "Employee", id: arg.employee_id },
      ],
    }),
    deleteEmployee: builder.mutation<void, { employee_id: number }>({
      query: ({ employee_id }) => ({
        url: `/employee/${employee_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    addEmployee: builder.mutation<void, addEmployeeRequest>({
      query: (newEmployee) => ({
        url: "/employee",
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }, "Dashboard"],
    }),
    updateOrder: builder.mutation<void, updateOrderRequest>({
      query: (updatedOrder) => ({
        url: `/order/${updatedOrder.order_id}`,
        method: "PUT",
        body: { order_status: updatedOrder.order_status },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: arg.order_id },
        { type: "Order", id: "LIST" },
      ],
    }),
    getKpis: builder.query<kpis, void>({
      query: () => `/dashboard/kpis`,
      providesTags: ["Dashboard"],
    }),
    getOrderTrend: builder.query<orderTrand[], void>({
      query: () => `/dashboard/order-trends`,
      providesTags: ["Dashboard"],
    }),
    getRevenue: builder.query<revenue[], void>({
      query: () => `/dashboard/revenue-breakdown`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetcustomersByKeywordQuery,
  useGetVehiclesByCustomerIdQuery,
  useGetServicesQuery,
  useCreateOrderMutation,
  useAddCustomerMutation,
  useGetCustomersQuery,
  useAddVehicleMutation,
  useGetOrdersPerCustomerQuery,
  useGetcustomerByIdQuery,
  useUpdateCutomerInfoMutation,
  useGetEmpoyeesQuery,
  useEmployeeUpdateInfoMutation,
  useGetEmployeeByIdQuery,
  useDeleteEmployeeMutation,
  useAddEmployeeMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useGetKpisQuery,
  useGetOrderTrendQuery,
  useGetRevenueQuery,
  useUpdateOrderMutation,
} = apiSlice;
