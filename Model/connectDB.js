import "dotenv/config";
import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState > 0) return;
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 45000,
      heartbeatFrequencyMS: 15000,
      socketTimeoutMS: 60000,
    });
  } catch (error) {
    console.log(`DB Error: ${error}`);
    process.exit(1);
  }
}
