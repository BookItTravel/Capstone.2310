const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5433/travel_app",
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };

// const { Client } = require('pg');

// const connectionString = process.env.DATABASE_URL || 'https://localhost:5433/travel_app';

// const client = new Client({
//   connectionString,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// });

// module.exports = client;

