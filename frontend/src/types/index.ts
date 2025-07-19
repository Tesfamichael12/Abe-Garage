export * from "./api";
export * from "./auth";
export * from "./customer";
export * from "./employee";

export interface updateOrderRequest {
  order_id: number;
  order_status: number;
}
