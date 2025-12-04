import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState > 0) return;

  try {
    await mongoose.connect("mongodb://localhost:27017/usersList");
  } catch (err) {
    console.log(`❌ MongoDB Conneciton Failed! Error : ${err}`);
    process.exit(1);
  }
}
