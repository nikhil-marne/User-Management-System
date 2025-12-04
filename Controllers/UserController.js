import mongoose from "mongoose";
import Users from "../Models/Users.js";

export async function getAllUsers() {
  const users = await Users.find();
  return users;
}

export async function adduser(userData) {
  const users = await Users.create(userData);
  return users;
}

export async function deleteUserById(userId) {
  if (!mongoose.isValidObjectId(userId)) {
    return { status: false, message: "INVALID USER ID FORMAT" };
  }

  const users = await Users.findByIdAndDelete(userId);
  return users;
}

export async function getUserByid(userId) {
  if (!mongoose.isValidObjectId(userId)) {
    return { status: false, message: "INVALID USER ID FORMAT" };
  }

  const users = await Users.findById(userId);
  return users;
}

export async function updateUserById(userId, userData) {
  if (!mongoose.isValidObjectId(userId)) {
    return { status: false, message: "INVALID USER ID FORMAT" };
  }

  try {
    const result = await Users.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return result;
  } catch (err) {
    console(`Update Error : ${err}`);
    return { status: false, message: "Update Failed!" };
  }
}
