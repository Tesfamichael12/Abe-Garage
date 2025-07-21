const db = require("../config/db.config");

async function createVehicle(vehicle) {
  const {
    customer_id,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicle;

  try {
    const [result] = await db.execute(
      "INSERT INTO vehicle (customer_id, vehicle_make, vehicle_model, vehicle_year, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        customer_id,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
      ]
    );
    return { id: result.insertId, ...vehicle };
  } catch (error) {
    throw new Error("Error in createVehicle service");
  }
}

async function getAllVehicles() {
  try {
    const [rows] = await db.execute("SELECT * FROM vehicle");
    return rows;
  } catch (error) {
    throw new Error("Error getting all vehicles");
  }
}

async function getVehicleById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM vehicle WHERE vehicle_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Vehicle not found");
    }
    return rows[0];
  } catch (error) {
    if (error.message === "Vehicle not found") {
      throw error;
    }
    throw new Error("Error getting vehicle by id");
  }
}

async function getVehiclesByCustomerId(customerId) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM vehicle WHERE customer_id = ?",
      [customerId]
    );
    return rows;
  } catch (error) {
    throw new Error("Error getting vehicles by customer id");
  }
}

async function updateVehicle(id, vehicle) {
  const {
    customer_id,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = vehicle;

  try {
    const [result] = await db.execute(
      "UPDATE vehicle SET customer_id = ?, vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?",
      [
        customer_id,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error("Vehicle not found");
    }
    return { id, ...vehicle };
  } catch (error) {
    if (error.message === "Vehicle not found") {
      throw error;
    }
    throw new Error("Error in updateVehicle service");
  }
}

async function deleteVehicle(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM vehicle WHERE vehicle_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Vehicle not found");
    }
    return { message: "Vehicle deleted successfully" };
  } catch (error) {
    if (error.message === "Vehicle not found") {
      throw error;
    }
    throw new Error("Error deleting vehicle");
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  getVehiclesByCustomerId,
  updateVehicle,
  deleteVehicle,
};
