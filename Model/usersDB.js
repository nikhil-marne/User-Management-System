import mongoose from "mongoose";
import userSchema from "../Schema/userSchema.js";

// Ensure the model is only compiled once
const User = mongoose.models.list || mongoose.model("lists", userSchema);

/**
 * Retrieves all user documents from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all users.
 */
export const getAllRecords = async () => await User.find();

/**
 * Finds a user matching the provided email and password.
 * Automatically excludes the password field from the returned document.
 * * @param {string} email - The user's email address.
 * @param {string} password - The user's password (plain text/hashed depending on storage).
 * @returns {Promise<Object|null>} The user document without the password, or null if not found.
 */
export async function getUser(email, password) {
  return await User.findOne({ email, password }, "-password");
}

/**
 * Checks if a user exists with the specific ID and password combination.
 * Useful for verifying credentials without fetching the whole document.
 * * @param {string} _id - The user's MongoDB ObjectId.
 * @param {string} password - The password to verify.
 * @returns {Promise<Object|null>} Returns the document _id if found, otherwise null.
 */
export async function verifyPassword(_id, password) {
  return await User.exists({ _id, password });
}

/**
 * Updates a user's information by their ID.
 * * @param {string} _id - The ID of the user to update.
 * @param {Object} updateData - The key-value pairs of data to update.
 * @returns {Promise<Object|null>} The updated user document (excluding password), or null if not found.
 */
export async function updateUser(_id, updateData) {
  return await User.findByIdAndUpdate(_id, updateData, {
    new: true, // Return the modified document rather than the original
    runValidators: true, // Ensure updates follow the Schema rules
  }).select("-password");
}

/**
 * Retrieves a single user document by their unique ID.
 * * @param {string} _id - The user's MongoDB ObjectId.
 * @returns {Promise<Object|null>} The user document, or null if not found.
 */
export const getUserById = async (_id) => await User.findOne({ _id });
