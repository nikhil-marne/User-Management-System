import express from "express";
import path from "node:path";
import multer from "multer";
import session from "express-session";
import connectDB from "./Models/connectDB.js";
import {
  deleteUserById,
  getAllUsers,
  getUserByid,
  updateUserById,
} from "./Controllers/UserController.js";

// DEFINING CONSTANTS
const PORT = 5800;
const BASE_DIR = path.resolve(".");
const app = express();

// SETTING UP MULTER
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.resolve(BASE_DIR, "fileUploads")),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const multerApp = multer({ storage: storageConfig });
// CONNECTING DATABASE
await connectDB();

// SETTING UP APP ENVIROMENTS
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(BASE_DIR, "public")));
app.use(
  session({
    secret: "pratiksha",
    resave: false, // resave session
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
  })
);

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

app.get("/file", (req, res) => {
  res.render("fileForm");
});

app.post("/file/upload", multerApp.single("file"), (req, res) => {
  res.send({ message: req.file });
});

app.get("/user/login", (req, res) => {
  res.render("login");
});

app.post("/user/profile", (req, res) => {
  res.render("profile");
  req.session.data = req.body;
  console.log(req.session.data);
});

// ADDING LISTENER TO APP
app.listen(PORT, () => {
  console.log("ExpressJs Running at http://localhost:" + PORT);
});
