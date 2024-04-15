const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "your_connection_string_here";

const connectionOptions = {};

mongoose
  .connect(connectionString, connectionOptions)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

//Models
require("./Category");
require("./Recipe");
