# User Management System

A secure and modern user management application built with **Node.js**,
**Express.js**, **MongoDB**, **Mongoose**, and **EJS**.\
Features include login, sessions, profile editing, and image upload.

## 🚀 Features

- User login with session-based authentication\
- Protected dashboard\
- Edit profile:
  - Update name, age, and email\
  - Update password\
  - Upload profile picture\
- Secure session handling\
- MongoDB integration using Mongoose\
- Clean folder structure\
- Fully responsive UI (EJS + CSS)

## 📁 Project Structure

    .
    ├── Controller/
    │   ├── editProfile.js
    │   └── validateUser.js
    ├── Model/
    │   ├── connectDB.js
    │   └── usersDB.js
    ├── Schema/
    │   └── userSchema.js
    ├── middleWare/
    │   ├── sessionHandler.js
    │   └── uploadMW.js
    ├── public/
    │   ├── css/
    │   ├── images/
    │   └── scripts/
    ├── views/
    │   ├── home.ejs
    │   ├── dashboard.ejs
    │   └── EditProfile.ejs
    └── index.js

## 🛠 Tech Stack

- Backend: Node.js, Express.js\
- Database: MongoDB + Mongoose\
- Views: EJS Templates\
- Authentication: express-session\
- Image Upload: Multer

## ⚙️ Environment Variables (.env)

    PORT=5800
    SECRET_KEY=your_session_secret
    DATABASE_URL=mongodb://localhost:27017/userManagement

## 📦 Installation & Setup

    git clone <your-repo-url>
    cd <project-directory>
    npm install
    node index.js

Visit: http://localhost:5800

## 🔐 Authentication Flow

- POST /login\
- Protected routes with checkAuth\
- POST /logout

## 🖼 Profile Editing

POST /api/update-profile\
Supports image upload + updating user info.

## 📡 API Endpoints

Method Endpoint Description

---

GET `/` Login page GET `/dashboard` User dashboard POST `/login` Login POST
`/logout` Logout GET `/editProfile` Edit profile page POST `/api/update-profile`
Update profile

## 🗄 Database Schema

    {
      name: String,
      age: Number,
      email: String,
      password: String,
      profileImage: String
    }

## 📌 Default Credentials

    {
      "name": "Demo User",
      "age": 22,
      "email": "demo@example.com",
      "password": "123"
    }

## 📜 License

MIT License\
Created by Nikhil Marne
