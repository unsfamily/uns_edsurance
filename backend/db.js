const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS, // do not fallback to default password
  database: process.env.DB_NAME || "edsurance",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL database: ", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
