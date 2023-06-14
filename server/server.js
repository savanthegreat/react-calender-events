const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./configuration.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log("OOOPSSS...");
    console.log(err.message);
  }
};

module.exports = connectDB;
