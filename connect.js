const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectMongoDb = async (url) => {
  return await mongoose.connect(url);
};

module.exports = connectMongoDb;
