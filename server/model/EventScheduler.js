const mongoose = require("mongoose");

const eventSchedulerSchema = new mongoose.Schema({
  event_title: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  event_description: { type: String },
  event_priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "low",
  },
  id_fe: { type: string },
});

eventScheduler = mongoose.model("eventScheduler", eventSchedulerSchema);

module.exports = eventScheduler;
