import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  password: String,
  email: String,
  profileImage: String,
});

export default userSchema;
