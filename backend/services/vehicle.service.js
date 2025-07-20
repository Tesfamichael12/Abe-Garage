const { query } = require("../config/db.config");

async function getVehicleBySerial(serial) {
  const sql =
    "SELECT * FROM customer_vehicle_info WHERE vehicle_serial=$1 AND active_vehicle=1";
  const rows = await query(sql, [serial]);
  return rows;
}

async function createVehicle(vehicle) {
  try {
    const sql = `
        INSERT INTO customer_vehicle_info (
            customer_id, 
            vehicle_year, 
            vehicle_make, 
            vehicle_model, 
            vehicle_type, 
            vehicle_mileage, 
            vehicle_tag, 
            vehicle_serial, 
            vehicle_color,
            active_vehicle
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    const {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      active_vehicle,
    } = vehicle;

    await query(sql, [
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      active_vehicle,
    ]);

    return true;
  } catch (error) {
    console.log("Error in createVehicle service", error);
    throw new Error(error.message);
  }
}

async function getVehicleId(id) {
  const sql = "SELECT * FROM customer_vehicle_info WHERE vehicle_id=$1";
  const rows = await query(sql, [id]);
  return rows;
}

async function updateVehicle(vehicle) {
  const sql = `
    UPDATE customer_vehicle_info 
    SET 
        
        vehicle_year=$1, 
        vehicle_make=$2, 
        vehicle_model=$3, 
        vehicle_type=$4, 
        vehicle_mileage=$5, 
        vehicle_tag=$6, 
        vehicle_serial=$7, 
        vehicle_color=$8,
        active_vehicle=$9
    WHERE vehicle_id=$10;
`;
  const {
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
    active_vehicle,
    vehicle_id,
  } = vehicle;

  try {
    await query(sql, [
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      active_vehicle,
      vehicle_id,
    ]);
    return true;
  } catch (error) {
    console.log("Error in updateVehicle service", error);
    throw new Error(error.message);
  }
}

async function getVehicleByCustomerId(customer_id) {
  const sql =
    "SELECT * FROM customer_vehicle_info WHERE customer_id=$1 AND active_vehicle=true";
  const rows = await query(sql, [customer_id]);
  return rows;
}
module.exports = {
  getVehicleBySerial,
  createVehicle,
  getVehicleId,
  updateVehicle,
  getVehicleByCustomerId,
};
