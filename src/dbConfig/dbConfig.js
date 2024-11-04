// dbConfig.js
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "multi_sports" });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1);
  }
};

export default connectDB;
