const mongoose = require("mongoose");

const URL = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("MongoDb connection error : ", error);
    process.exit(0);
  }
};

module.exports = connectDb;
