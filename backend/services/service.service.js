const db = require("../config/db.config");

async function checkServiceExists(serviceName) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM service WHERE service_name = ?",
      [serviceName]
    );
    return rows.length > 0;
  } catch (error) {
    throw new Error("Error checking if service exists");
  }
}

async function createService(service) {
  try {
    const [result] = await db.execute(
      "INSERT INTO service (service_name, service_description) VALUES (?, ?)",
      [service.service_name, service.service_description]
    );
    return { id: result.insertId, ...service };
  } catch (error) {
    throw new Error("Error creating service");
  }
}

async function getAllServices() {
  try {
    const [rows] = await db.execute("SELECT * FROM service");
    return rows;
  } catch (error) {
    throw new Error("Error getting all services");
  }
}

async function getServiceById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM service WHERE service_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Service not found");
    }
    return rows[0];
  } catch (error) {
    if (error.message === "Service not found") {
      throw error;
    }
    throw new Error("Error getting service by id");
  }
}

async function updateService(id, service) {
  try {
    const [result] = await db.execute(
      "UPDATE service SET service_name = ?, service_description = ? WHERE service_id = ?",
      [service.service_name, service.service_description, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Service not found");
    }
    return { id, ...service };
  } catch (error) {
    if (error.message === "Service not found") {
      throw error;
    }
    throw new Error("Error updating service");
  }
}

async function deleteService(id) {
  try {
    const [result] = await db.execute(
      "DELETE FROM service WHERE service_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Service not found");
    }
    return { message: "Service deleted successfully" };
  } catch (error) {
    if (error.message === "Service not found") {
      throw error;
    }
    throw new Error("Error deleting service");
  }
}

module.exports = {
  checkServiceExists,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
