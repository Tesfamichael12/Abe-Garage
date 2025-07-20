const { query } = require("../config/db.config");
const crypto = require("crypto");
const Jwt_secret = process.env.JWT_SECRET;

async function createOrder(order) {
  const uniqueString = `${order.employee_id}-${order.customer_id}-${
    order.vehicle_id
  }-${Date.now()}`;
  const order_hash = crypto
    .createHash("sha256")
    .update(uniqueString + Jwt_secret)
    .digest("hex");

  try {
    const sql1 =
      "INSERT INTO orders (employee_id, customer_id,vehicle_id, active_order,order_hash) VALUES ($1,$2,$3,$4,$5) RETURNING order_id";
    const result1 = await query(sql1, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      1,
      order_hash,
    ]);
    const order_id = result1[0].order_id;

    const sql2 =
      "INSERT INTO order_info (order_id,order_total_price,additional_request,additional_requests_completed) VALUES ($1,$2,$3,$4)";
    await query(sql2, [
      order_id,
      order.order_total_price,
      order.additional_request || null,
      order.additional_request ? 0 : null,
    ]);

    if (order?.order_services) {
      const sql3 =
        "INSERT INTO order_services (order_id,service_id,service_completed) VALUES ($1,$2,$3)";
      for (let i = 0; i < order.order_services.length; i++) {
        await query(sql3, [order_id, order.order_services[i].service_id, 0]);
      }
    }

    const sql4 =
      "INSERT INTO order_status (order_id,order_status) VALUES ($1,$2)";
    await query(sql4, [order_id, 0]);

    return true;
  } catch (error) {
    console.error("Error creating order in service:", error);
    throw new Error("Error creating order");
  }
}

async function getOrders(page, limit) {
  const offset = (page - 1) * limit;

  try {
    const sql = `
      SELECT 
        o.order_id,
        o.employee_id,
        CONCAT(ei.employee_first_name, ' ', ei.employee_last_name) AS employee_name,
        o.customer_id,
        o.vehicle_id,
        o.order_date,
        o.active_order,
        o.order_hash,
        oi.order_total_price,
        os.order_status,
        ci.customer_email,
        CONCAT(cinfo.customer_first_name, ' ', cinfo.customer_last_name) AS customer_name,
        v.vehicle_model,
        v.vehicle_tag
FROM
        orders o
      LEFT JOIN 
        order_info oi ON o.order_id = oi.order_id
      LEFT JOIN 
        order_status os ON o.order_id = os.order_id
      LEFT JOIN 
        customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN 
        customer_info cinfo ON o.customer_id = cinfo.customer_id
      LEFT JOIN 
        customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
      LEFT JOIN 
        employee e ON o.employee_id = e.employee_id
      LEFT JOIN 
        employee_info ei ON e.employee_id = ei.employee_id
      LIMIT $1 OFFSET $2;
    `;

    const orders = await query(sql, [limit, offset]);
    return orders;
  } catch (error) {
    console.log("Error getting orders", error.message);
    throw new Error("Error getting orders");
  }
}

async function getOrderByHash(hash) {
  try {
    const sql = `
        SELECT 
            o.order_id,
            o.employee_id,
            o.customer_id,
            o.vehicle_id,
            o.order_date,
            o.active_order,
            o.order_hash,
            oi.order_total_price,
            oi.additional_request,
            oi.additional_requests_completed,
            os.order_status
        FROM 
            orders o
        LEFT JOIN 
            order_info oi ON o.order_id = oi.order_id
        LEFT JOIN 
            order_status os ON o.order_id = os.order_id
        WHERE 
            o.order_hash = $1;
    `;

    const [order] = await query(sql, [hash]);

    if (!order) {
      return false;
    }

    const sql2 = `SELECT 
        os.order_service_id,
        os.service_id,
        os.service_completed,
        cs.service_name,
        cs.service_description
    FROM 
        order_services os
    LEFT JOIN 
        common_services cs ON os.service_id = cs.service_id
    WHERE 
        os.order_id = $1;
`;

    const services = await query(sql2, [order.order_id]);
    order.order_services = services;
    return order;
  } catch (error) {
    console.log("Error getting order by hash", error.message);
    throw new Error("Error getting order by hash");
  }
}

async function updateOrder(order) {
  try {
    const sql1 = "UPDATE orders SET active_order = $1 WHERE order_id = $2";
    await query(sql1, [order.active_order, order.order_id]);

    const sql2 =
      "UPDATE order_info SET order_total_price = $1, additional_request = $2, additional_requests_completed = $3 WHERE order_id = $4";
    await query(sql2, [
      order.order_total_price,
      order.additional_request,
      order.additional_requests_completed,
      order.order_id,
    ]);

    const sql3 =
      "UPDATE order_status SET order_status = $1 WHERE order_id = $2";
    await query(sql3, [order.order_status, order.order_id]);

    const sql4 = "DELETE FROM order_services WHERE order_id = $1";
    await query(sql4, [order.order_id]);

    const sql5 =
      "INSERT INTO order_services (order_id,service_id,service_completed) VALUES ($1,$2,$3)";
    for (let i = 0; i < order.order_services.length; i++) {
      await query(sql5, [
        order.order_id,
        order.order_services[i].service_id,
        order.order_services[i].service_completed,
      ]);
    }

    return true;
  } catch (error) {
    console.error("Error updating order in service:", error);
    throw new Error("Error updating order");
  }
}

async function getCustomerOrders(id) {
  try {
    const sql = `
      SELECT 
        o.order_id,
        o.employee_id,
        CONCAT(ei.employee_first_name, ' ', ei.employee_last_name) AS employee_name,
        o.customer_id,
        o.vehicle_id,
        o.order_date,
        o.active_order,
        o.order_hash,
        oi.order_total_price,
        os.order_status,
        ci.customer_email,
        CONCAT(cinfo.customer_first_name, ' ', cinfo.customer_last_name) AS customer_name,
        v.vehicle_model,
        v.vehicle_tag
FROM
        orders o
      LEFT JOIN 
        order_info oi ON o.order_id = oi.order_id
      LEFT JOIN 
        order_status os ON o.order_id = os.order_id
      LEFT JOIN 
        customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN 
        customer_info cinfo ON o.customer_id = cinfo.customer_id
      LEFT JOIN 
        customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
      LEFT JOIN 
        employee e ON o.employee_id = e.employee_id
      LEFT JOIN 
        employee_info ei ON e.employee_id = ei.employee_id
      WHERE o.customer_id = $1;
    `;
    const orders = await query(sql, [id]);
    return orders;
  } catch (error) {
    console.log("Error getting customer orders", error.message);
    throw new Error("Error getting customer orders");
  }
}

async function updateOrderStatus(order_id, order_status) {
  try {
    const sql = "UPDATE order_status SET order_status = $1 WHERE order_id = $2";
    await query(sql, [order_status, order_id]);
    return true;
  } catch (error) {
    console.log("Error updating order status", error.message);
    throw new Error("Error updating order status");
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderByHash,
  updateOrder,
  getCustomerOrders,
  updateOrderStatus,
};
