import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      console.log("🔌 MONGODB_URI:", process.env.MONGODB_URI); // Add this
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "chatapp", // explicitly set db name
      });
      console.log(`✅ Connected to Database: ${conn.connection.host}`);
    } catch (error) {
      console.error("❌ Error while connecting to database:", error);
      process.exit(1);
    }
};