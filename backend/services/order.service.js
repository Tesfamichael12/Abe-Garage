const db = require("../config/db.config");

async function createOrder(order) {
  const {
    customer_id,
    order_date,
    order_status,
    order_price,
    order_description,
    services,
    vehicle_id,
  } = order;

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const [orderResult] = await connection.execute(
      "INSERT INTO `order` (customer_id, vehicle_id, order_date, order_status, order_price, order_description) VALUES (?, ?, ?, ?, ?, ?)",
      [
        customer_id,
        vehicle_id,
        order_date,
        order_status,
        order_price,
        order_description,
      ]
    );

    const orderId = orderResult.insertId;

    const servicePromises = services.map((serviceId) => {
      return connection.execute(
        "INSERT INTO order_service (order_id, service_id) VALUES (?, ?)",
        [orderId, serviceId]
      );
    });

    await Promise.all(servicePromises);

    await connection.commit();
    connection.release();

    return { id: orderId, ...order };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error("Error creating order in service");
  }
}

async function getAllOrders(page = 1, limit = 10, status = null) {
  try {
    let query =
      "SELECT o.*, c.customer_first_name, c.customer_last_name, v.vehicle_make, v.vehicle_model FROM `order` o JOIN customer c ON o.customer_id = c.customer_id JOIN vehicle v ON o.vehicle_id = v.vehicle_id";
    const params = [];

    if (status) {
      query += " WHERE o.order_status = ?";
      params.push(status);
    }

    query += " ORDER BY o.order_date DESC LIMIT ? OFFSET ?";
    params.push(limit, (page - 1) * limit);

    const [rows] = await db.execute(query, params);

    const [[{ "COUNT(*)": total }]] = await db.execute(
      `SELECT COUNT(*) FROM \`order\` ${
        status ? "WHERE order_status = ?" : ""
      }`,
      status ? [status] : []
    );

    return {
      orders: rows,
      total,
      page,
      limit,
    };
  } catch (error) {
    throw new Error("Error getting orders");
  }
}

async function getOrderById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT o.*, c.*, v.* FROM `order` o JOIN customer c ON o.customer_id = c.customer_id JOIN vehicle v ON o.vehicle_id = v.vehicle_id WHERE o.order_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Order not found");
    }
    const [services] = await db.execute(
      "SELECT s.* FROM service s JOIN order_service os ON s.service_id = os.service_id WHERE os.order_id = ?",
      [id]
    );
    return { ...rows[0], services };
  } catch (error) {
    if (error.message === "Order not found") {
      throw error;
    }
    throw new Error("Error getting order by id");
  }
}

async function updateOrderStatus(id, status) {
  try {
    const [result] = await db.execute(
      "UPDATE `order` SET order_status = ? WHERE order_id = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Order not found");
    }
    return { message: "Order status updated successfully" };
  } catch (error) {
    if (error.message === "Order not found") {
      throw error;
    }
    throw new Error("Error updating order");
  }
}

async function getOrdersByCustomerId(customerId) {
  try {
    const [rows] = await db.execute(
      "SELECT o.*, v.vehicle_make, v.vehicle_model FROM `order` o JOIN vehicle v ON o.vehicle_id = v.vehicle_id WHERE o.customer_id = ?",
      [customerId]
    );
    return rows;
  } catch (error) {
    throw new Error("Error getting customer orders");
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByCustomerId,
};
