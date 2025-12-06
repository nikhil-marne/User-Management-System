import "dotenv/config";
import express from "express";
import path from "node:path";
import connectDB from "./Model/connectDB.js";
import { validateUser } from "./Controller/validateUser.js";
import session from "express-session";
import { checkAuth, createSession } from "./middleWare/sessionHandler.js";
import editProfile from "./Controller/editProfile.js";
import { uploadMW } from "./middleWare/uploadMW.js";

await connectDB();

const app = express();
const PORT = process.env.PORT || 5800;
const SECRET_KEY = process.env.SECRET_KEY;
const BASE_DIR = path.resolve(".");

app.use(express.static(path.resolve(BASE_DIR, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/dashboard", checkAuth, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

app.post("/login", async (req, res) => {
  const isValid = await validateUser(req.body.email, req.body.password);

  if (isValid.login) {
    createSession(req, isValid.user);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.clearCookie("connect.sid").sendStatus(200);
    }
  });
});

app.get("/editProfile", checkAuth, (req, res) => {
  res.render("EditProfile", { user: req.session.user });
});

app.post(
  "/api/update-profile",
  checkAuth,
  uploadMW.single("profileImage"),
  async (req, res) => {
    await editProfile(req);
    res.sendStatus(200);
  }
);

app.listen(PORT);
