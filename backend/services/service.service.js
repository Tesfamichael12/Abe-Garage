const { query } = require("../config/db.config");

async function checkIfServiceExist(service_name) {
  const normalizedServiceName = service_name.trim().toLowerCase();

  const sql =
    "SELECT COUNT(*) as count FROM common_services WHERE LOWER(TRIM(service_name))=$1";

  try {
    const result = await query(sql, [normalizedServiceName]);
    return result[0].count > 0;
  } catch (error) {
    console.log("error checking if service exists", error);
    throw new Error(error.message);
  }
}

async function createService(serviceData) {
  const { service_name, service_description } = serviceData;

  const sql =
    "INSERT INTO common_services (service_name,service_description) VALUES($1,$2)";

  try {
    await query(sql, [service_name, service_description]);
    return { status: "true" };
  } catch (error) {
    console.log("error creating service", error);
    throw new Error("Failed to create service");
  }
}

async function getAllServices() {
  const sql = "SELECT * FROM common_services";

  try {
    const services = await query(sql);
    return services;
  } catch (error) {
    console.log("error getting all services", error);
    throw new Error("Failed to get services");
  }
}

async function getServiceById(id) {
  if (isNaN(id)) {
    throw new Error("Invalid id");
  }
  const sql = "SELECT * FROM common_services WHERE service_id=$1";

  try {
    const service = await query(sql, [id]);
    return service[0];
  } catch (error) {
    console.log("error getting service by id", error);
    throw new Error("Failed to get service");
  }
}

async function updateService(serviceData) {
  const { service_id, service_name, service_description } = serviceData;

  const sql =
    "UPDATE common_services SET service_name=$1,service_description=$2 WHERE service_id=$3";

  try {
    await query(sql, [service_name, service_description, service_id]);
    return { status: "true" };
  } catch (error) {
    console.log("error updating service", error);
    throw new Error("Failed to update service");
  }
}

async function deleteService(id) {
  if (isNaN(id)) {
    throw new Error("Invalid id");
  }

  try {
    const checkOrdersSql =
      "SELECT COUNT(*) as count FROM order_services WHERE service_id=$1";
    const result = await query(checkOrdersSql, [id]);
    if (result[0].count > 0) {
      throw new Error("Cannot delete service that is associated with an order");
    }

    const sql = "DELETE FROM common_services WHERE service_id=$1";
    await query(sql, [id]);
    return { status: "true" };
  } catch (error) {
    console.log("error deleting service", error);
    throw new Error(error.message || "Failed to delete service");
  }
}

module.exports = {
  createService,
  checkIfServiceExist,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
