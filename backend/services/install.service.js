const conn = require("../config/db.config");
const fs = require("fs");

async function install() {
  const queryfile = __dirname + "/sql/initial-queries.pgsql";

  let finalmessage = {};

  try {
    const queryText = fs.readFileSync(queryfile, "utf-8");
    await conn.query(queryText);

    finalmessage.status = 200;
    finalmessage.message = "Tables created successfully";
  } catch (error) {
    finalmessage.status = 500;
    finalmessage.message = `Error creating tables: ${error.message}`;
    console.error(error);
  }

  return finalmessage;
}

module.exports = { install };
