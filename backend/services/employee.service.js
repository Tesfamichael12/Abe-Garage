const db = require("../config/db.config");
const bcrypt = require("bcrypt");

async function createEmployee(employee) {
  const {
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    employee_password,
    company_role_id,
  } = employee;

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const hashedPassword = await bcrypt.hash(employee_password, 10);

    const [result] = await connection.execute(
      "INSERT INTO employee (employee_first_name, employee_last_name, employee_phone, employee_email, employee_password_hashed, company_role_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        employee_first_name,
        employee_last_name,
        employee_phone,
        employee_email,
        hashedPassword,
        company_role_id,
      ]
    );

    await connection.commit();
    connection.release();

    return { id: result.insertId, ...employee };
  } catch (error) {
    await connection.rollback();
    connection.release();
    throw new Error("Error creating employee");
  }
}

async function getAllEmployees() {
  try {
    const [rows] = await db.execute("SELECT * FROM employee");
    return rows;
  } catch (error) {
    throw new Error("Error getting all employees");
  }
}

async function getEmployeeById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM employee WHERE employee_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows[0];
  } catch (error) {
    if (error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Error getting employee by id");
  }
}

async function updateEmployee(id, employee) {
  const {
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    company_role_id,
  } = employee;

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.execute(
      "UPDATE employee SET employee_first_name = ?, employee_last_name = ?, employee_phone = ?, employee_email = ?, company_role_id = ? WHERE employee_id = ?",
      [
        employee_first_name,
        employee_last_name,
        employee_phone,
        employee_email,
        company_role_id,
        id,
      ]
    );

    await connection.commit();
    connection.release();

    if (result.affectedRows === 0) {
      throw new Error("Employee not found");
    }
    return { id, ...employee };
  } catch (error) {
    await connection.rollback();
    connection.release();
    if (error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Error updating employee");
  }
}

async function deleteEmployee(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM employee WHERE employee_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Employee not found");
    }
    return { message: "Employee deleted successfully" };
  } catch (error) {
    if (error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Error deleting employee");
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
