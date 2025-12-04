import express from "express";
import path from "node:path";
import connectDB from "./Models/connectDB.js";
import {
  adduser,
  deleteUserById,
  getAllUsers,
  getUserByid,
  updateUserById,
} from "./Controllers/UserController.js";

// DEFINING CONSTANTS
const PORT = 5800;
const BASE_DIR = path.resolve(".");
const app = express();

// CONNECTING DATABASE
await connectDB();

// SETTING UP APP ENVIROMENTS
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(BASE_DIR, "public")));

// APP ROUTE START

// HOMEPAGE, USERSLIST ROUTE
app.get("/", async (req, res) => {
  res.render("usersList", { users: await getAllUsers() });
});

// DELETE USER ROUTE
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app
  .route("/update/user/:id")
  .get(async (req, res) => {
    res.render("updateUser", { user: await getUserByid(req.params.id) });
  })
  .post(async (req, res) => {
    const result = await updateUserById(req.params.id, req.body);
    if (result) {
      res.send("User Update Succussfully ! <a href='/'>Users List</a>");
    } else {
      res.send(
        `Update Failed! <a href="/update/user/${req.params.id}">Try Again!</a>`
      );
    }
  });

// ADDING LISTENER TO APP
app.listen(PORT, () => {
  console.log("ExpressJs Running at http://localhost:" + PORT);
});
