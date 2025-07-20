const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function query(text, params) {
  const start = Date.now();
  const { rows } = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: rows.length });
  return rows;
}

module.exports = { query };
