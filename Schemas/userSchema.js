import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  city: String,
});

export default UserSchema;
