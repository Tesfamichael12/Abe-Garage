const { query } = require("../config/db.config");
const crypto = require("crypto");

const Jwt_secret = process.env.JWT_SECRET; //use this secret to hash the email

async function checkIfCustomerExist(email) {
  const sql = "SELECT * FROM customer_identifier WHERE customer_email=$1";
  const result = await query(sql, [email]);

  return result.length > 0;
}

async function createCustomer(customer) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
  } = customer;
  const newHash = crypto
    .createHash("sha256")
    .update(customer_email + Jwt_secret)
    .digest("hex");

  try {
    const sql1 =
      "INSERT INTO customer_identifier (customer_email,customer_phone_number,customer_hash) VALUES ($1,$2,$3) RETURNING customer_id";
    const result1 = await query(sql1, [
      customer_email,
      customer_phone_number,
      newHash,
    ]);
    const customer_id = result1[0].customer_id;

    const sql2 =
      "INSERT INTO customer_info (customer_id,customer_first_name,customer_last_name,active_customer_status) VALUES ($1,$2,$3,$4)";
    await query(sql2, [
      customer_id,
      customer_first_name,
      customer_last_name,
      1,
    ]);

    return true;
  } catch (error) {
    console.log("Error creating customer", error.message);
    throw new Error("Error creating customer");
  }
}

async function getCustomer(customer_id) {
  const sql = `SELECT 
     ci.customer_id,
    ci.customer_email,
    ci.customer_phone_number,
    ci.customer_added_date,
    ci.customer_hash,
    ci_info.customer_first_name,
    ci_info.customer_last_name,
    ci_info.active_customer_status
    FROM customer_identifier ci
    JOIN customer_info ci_info ON ci.customer_id=ci_info.customer_id
    WHERE ci.customer_id=$1`;

  try {
    const rows = await query(sql, [customer_id]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting customer", error.message);
    throw new Error("Error getting customer");
  }
}

async function getCustomers(page, limit) {
  const sql = `SELECT 
    ci.customer_id,
    ci.customer_email,
    ci.customer_phone_number,
    ci.customer_added_date,
    ci.customer_hash,
    ci_info.customer_first_name,
    ci_info.customer_last_name,
    ci_info.active_customer_status
    FROM customer_identifier ci
    JOIN customer_info ci_info ON ci.customer_id=ci_info.customer_id
    LIMIT $1 OFFSET $2`;
  const sql2 = `SELECT COUNT(*) as total FROM customer_identifier`;

  const offset = (page - 1) * limit;

  try {
    const totalResult = await query(sql2);
    const total = totalResult[0].total;
    const rows = await query(sql, [limit, offset]);

    return { total, data: rows };
  } catch (error) {
    console.log("Error getting customers", error.message);
    throw new Error("Error getting customers");
  }
}

async function updateCustomer(customer) {
  const {
    customer_id,
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
    active_customer_status,
  } = customer;
  const newHash = crypto
    .createHash("sha256")
    .update(customer_email + Jwt_secret)
    .digest("hex");

  try {
    const sql1 =
      "UPDATE customer_identifier SET customer_email=$1,customer_hash=$2,customer_phone_number=$3 WHERE customer_id=$4 ";
    await query(sql1, [
      customer_email,
      newHash,
      customer_phone_number,
      customer_id,
    ]);

    const sql2 =
      "UPDATE customer_info SET customer_first_name=$1,customer_last_name=$2,active_customer_status=$3 WHERE customer_id=$4 ";
    await query(sql2, [
      customer_first_name,
      customer_last_name,
      active_customer_status,
      customer_id,
    ]);

    return true;
  } catch (error) {
    console.log("Error updating customer", error.message);
    throw new Error("Error updating customer");
  }
}
async function searchCustomers(keyword) {
  console.log("keyword", keyword);
  const sql = `SELECT 
      ci.customer_id,
      ci.customer_email,
      ci.customer_phone_number,
      ci.customer_added_date,
      ci.customer_hash,
      ci_info.customer_first_name,
      ci_info.customer_last_name,
      ci_info.active_customer_status
      FROM customer_identifier ci
      JOIN customer_info ci_info ON ci.customer_id = ci_info.customer_id
      WHERE ci_info.customer_first_name LIKE $1 OR ci_info.customer_last_name LIKE $2 OR ci.customer_email LIKE $3`;

  const searchKeyword = `%${keyword}%`;

  try {
    const rows = await query(sql, [
      searchKeyword,
      searchKeyword,
      searchKeyword,
    ]);
    return rows;
  } catch (error) {
    console.log("Error searching customers", error.message);
    throw new Error("Error searching customers");
  }
}

module.exports = {
  checkIfCustomerExist,
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  searchCustomers,
};
