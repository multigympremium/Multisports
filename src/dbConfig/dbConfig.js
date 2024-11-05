// dbConfig.js
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "multi_sports" ,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if server is not available
      socketTimeoutMS: 120000,  
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // process.exit(1);
  }
};

export default connectDB;
