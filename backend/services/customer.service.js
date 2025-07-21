const db = require("../config/db.config");

async function createCustomer(customer) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone,
    customer_address,
  } = customer;

  try {
    const [result] = await db.execute(
      "INSERT INTO customer (customer_first_name, customer_last_name, customer_email, customer_phone, customer_address) VALUES (?, ?, ?, ?, ?)",
      [
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone,
        customer_address,
      ]
    );
    return { id: result.insertId, ...customer };
  } catch (error) {
    throw new Error("Error creating customer");
  }
}

async function getAllCustomers(page = 1, limit = 10) {
  try {
    const [rows] = await db.execute("SELECT * FROM customer LIMIT ? OFFSET ?", [
      limit,
      (page - 1) * limit,
    ]);
    const [[{ "COUNT(*)": total }]] = await db.execute(
      "SELECT COUNT(*) FROM customer"
    );
    return {
      customers: rows,
      total,
      page,
      limit,
    };
  } catch (error) {
    throw new Error("Error getting customers");
  }
}

async function getCustomerById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Customer not found");
    }
    return rows[0];
  } catch (error) {
    if (error.message === "Customer not found") {
      throw error;
    }
    throw new Error("Error getting customer by id");
  }
}

async function updateCustomer(id, customer) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone,
    customer_address,
  } = customer;

  try {
    const [result] = await db.execute(
      "UPDATE customer SET customer_first_name = ?, customer_last_name = ?, customer_email = ?, customer_phone = ?, customer_address = ? WHERE customer_id = ?",
      [
        customer_first_name,
        customer_last_name,
        customer_email,
        customer_phone,
        customer_address,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error("Customer not found");
    }
    return { id, ...customer };
  } catch (error) {
    if (error.message === "Customer not found") {
      throw error;
    }
    throw new Error("Error updating customer");
  }
}

async function deleteCustomer(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM customer WHERE customer_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Customer not found");
    }
    return { message: "Customer deleted successfully" };
  } catch (error) {
    if (error.message === "Customer not found") {
      throw error;
    }
    throw new Error("Error deleting customer");
  }
}

async function searchCustomers(keyword) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM customer WHERE customer_first_name LIKE ? OR customer_last_name LIKE ? OR customer_email LIKE ? OR customer_phone LIKE ?",
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  } catch (error) {
    throw new Error("Error searching customers");
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
};
