const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin@123",
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
