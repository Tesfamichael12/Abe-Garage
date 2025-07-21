const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(employee) {
  const { employee_email, employee_password } = employee;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM employee WHERE employee_email = ?",
      [employee_email]
    );

    if (rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = rows[0];

    const passwordMatches = await bcrypt.compare(
      employee_password,
      user.employee_password_hashed
    );

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        employee_id: user.employee_id,
        employee_email: user.employee_email,
        employee_first_name: user.employee_first_name,
        employee_role: user.company_role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token };
  } catch (error) {
    if (error.message === "Invalid email or password") {
      throw error;
    }
    throw new Error("Error during login");
  }
}

module.exports = {
  login,
};
