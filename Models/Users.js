import mongoose from "mongoose";
import UserSchema from "../Schemas/userSchema.js";

const Users = mongoose.models.users || mongoose.model("users", UserSchema);

export default Users;
