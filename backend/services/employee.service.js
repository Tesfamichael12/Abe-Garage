const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

async function checkIfEmployeeExist(email) {
  const sql = "SELECT * FROM employee WHERE employee_email=$1";
  const rows = await query(sql, [email]);
  return rows.length > 0;
}

async function createEmployee(employee) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    const query1 =
      "INSERT INTO employee(employee_email, active_employee) VALUES($1,$2) RETURNING employee_id";
    const result1 = await query(query1, [employee.employee_email, 1]);
    const employeeId = result1[0].employee_id;

    const query2 =
      "INSERT INTO employee_info(employee_id, employee_first_name, employee_last_name, employee_phone) VALUES($1,$2,$3,$4)";
    await query(query2, [
      employeeId,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    const query3 =
      "INSERT INTO employee_pass(employee_id, employee_password_hashed) VALUES($1,$2)";
    await query(query3, [employeeId, hashedPassword]);

    const query4 =
      "INSERT INTO employee_role(employee_id, company_role_id) VALUES($1,$2)";
    await query(query4, [employeeId, employee.company_role_id]);

    return { employeeId };
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw new Error("Error creating employee");
  }
}

async function getEmployeeByEmail(email) {
  const sql = `
    SELECT
        e.employee_id,
        e.employee_email,
        e.active_employee,
        e.added_date,
        ei.employee_first_name,
        ei.employee_last_name,
        ei.employee_phone,
        ep.employee_password_hashed,
        er.company_role_id
    FROM
        employee e
    JOIN
        employee_info ei ON e.employee_id = ei.employee_id
    JOIN
        employee_pass ep ON e.employee_id = ep.employee_id
    JOIN
        employee_role er ON e.employee_id = er.employee_id
    WHERE
        e.employee_email = $1;
`;
  const empoyeeData = await query(sql, [email]);

  return empoyeeData;
}

async function getEmployees(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const sql = `
        SELECT
            e.employee_id,
            e.employee_email,
            e.active_employee,
            e.added_date,
            ei.employee_first_name,
            ei.employee_last_name,
            ei.employee_phone,
            er.company_role_id
        FROM
            employee e
        JOIN
            employee_info ei ON e.employee_id = ei.employee_id
        JOIN
            employee_role er ON e.employee_id = er.employee_id
        LIMIT $1 OFFSET $2;`;

    const sql2 = `SELECT COUNT(*) as total FROM employee`;
    const totalResult = await query(sql2);
    const total = totalResult[0].total;

    const rows = await query(sql, [limit, offset]);

    return { rows, total };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

async function getEmployeeById(id) {
  try {
    const sql = `
        SELECT
            e.employee_id,
            e.employee_email,
            e.active_employee,
            e.added_date,
            ei.employee_first_name,
            ei.employee_last_name,
            ei.employee_phone,
            er.company_role_id
        FROM
            employee e
        JOIN
            employee_info ei ON e.employee_id = ei.employee_id
        JOIN
            employee_role er ON e.employee_id = er.employee_id
        WHERE
            e.employee_id = $1;
        `;

    const employeeData = await query(sql, [id]);

    return employeeData;
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    throw new Error("Something went wrong");
  }
}

async function updateEmployee(employee) {
  try {
    const query1 =
      "UPDATE employee SET employee_email = $1, active_employee = $2 WHERE employee_id = $3";
    await query(query1, [
      employee.employee_email,
      employee.active_employee,
      employee.employee_id,
    ]);

    const query2 =
      "UPDATE employee_info SET employee_first_name = $1, employee_last_name = $2, employee_phone = $3 WHERE employee_id = $4";
    await query(query2, [
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
      employee.employee_id,
    ]);

    const query3 =
      "UPDATE employee_role SET company_role_id = $1 WHERE employee_id = $2";
    await query(query3, [employee.company_role_id, employee.employee_id]);

    return { employeeId: employee.employee_id };
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw new Error("Error updating employee");
  }
}

async function deleteEmployee(id) {
  if (!id) {
    return false;
  }
  try {
    const sql1 = "DELETE FROM employee_role WHERE employee_id = $1";
    await query(sql1, [id]);

    const sql2 = "DELETE FROM employee_info WHERE employee_id = $1";
    await query(sql2, [id]);

    const sql3 = "DELETE FROM employee_pass WHERE employee_id = $1";
    await query(sql3, [id]);

    const sql4 = "DELETE FROM employee WHERE employee_id = $1";
    await query(sql4, [id]);

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting employee");
  }
}

module.exports = {
  checkIfEmployeeExist,
  createEmployee,
  getEmployeeByEmail,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
