import { updateUser, verifyPassword } from "../Model/usersDB.js";

export default async function editProfile(req) {
  try {
    const userId = req.session.user._id;
    const { name, age, email, currentPassword, newPassword } = req.body;

    const response = await verifyPassword(userId, currentPassword);

    if (!response) return { success: false, message: "Invalid Password!" };

    const updateData = { name, age: Number.parseInt(age), email };

    if (newPassword) updateData.password = newPassword;

    if (req.file) updateData.profileImage = `/images/${req.file.filename}`;

    const updatedUser = await updateUser(userId, updateData);

    req.session.user = {
      _id: updatedUser._id,
      name: updatedUser.name,
      age: updatedUser.age,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
    };
    req.session.save();

    return {
      success: true,
      message: "Profile Updated!",
      user: req.session.user,
    };
  } catch (err) {
    console.log(`Updating Error: ${err}`);
    return { success: false, message: err.message };
  }
}
