const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  temp: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  rain: {
    type: Number,
    required: true,
  },
  light: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("weatherdata", weatherSchema);
