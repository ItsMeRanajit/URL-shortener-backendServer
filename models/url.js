const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], //array of object of timestamps of number type
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // giving a type of objectid
      ref: "users",
    },
  },
  { timestamp: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
