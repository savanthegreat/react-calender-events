const express = require("express");

const morgan = require("morgan");
const cors = require("cors");

const eventRouter = require("./routes/eventRoute");

const connectDB = require("./server");
console.log("HERE...");
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(cors({ origin: true, credentials: true }));

app.use(eventRouter);

app.listen(8000, () => {
  console.log("WE ARE AVAILABLE AT 8000....");
});
