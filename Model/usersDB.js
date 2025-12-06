import mongoose from "mongoose";
import userSchema from "../Schema/userSchema.js";

const User = mongoose.models.list || mongoose.model("lists", userSchema);

export const getAllRecords = async () => await User.find();

export async function getUser(email, password) {
  return await User.findOne({ email, password }, "-password");
}

export async function verifyPassword(_id, password) {
  return await User.exists({ _id, password });
}

export async function updateUser(_id, updateData) {
  return await User.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
}
