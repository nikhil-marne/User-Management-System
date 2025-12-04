# User Management System

A simple CRUD (Create, Read, Update, Delete) application built with Express.js,
MongoDB, and EJS for managing user data.

## Features

- View all users in a table format
- Update user information
- Delete users with real-time UI updates
- MongoDB integration with Mongoose
- RESTful API endpoints
- Server-side rendering with EJS

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Frontend**: Vanilla JavaScript, CSS

## Project Structure

```
.
├── Controllers/
│   └── UserController.js      # User CRUD operations
├── Models/
│   ├── connectDB.js           # Database connection
│   └── Users.js               # User model
├── Schemas/
│   └── userSchema.js          # Mongoose schema definition
├── views/
│   ├── usersList.ejs          # Users list page
│   └── updateUser.ejs         # Update user page
├── public/
│   ├── css/
│   │   └── style.css          # Styles
│   └── scripts/
│       └── users.js           # Client-side JavaScript
└── server.js                  # Main application file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Ensure MongoDB is running on `mongodb://localhost:27017`

4. Start the application:

```bash
node server.js
```

5. Open your browser and navigate to:

```
http://localhost:5800
```

## Dependencies

```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "ejs": "^3.x.x"
}
```

## API Endpoints

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/`                | Display all users                  |
| GET    | `/update/user/:id` | Show update form for specific user |
| POST   | `/update/user/:id` | Update user information            |
| DELETE | `/user/delete/:id` | Delete a user                      |

## Database Schema

```javascript
{
  name: String,
  age: Number,
  email: String,
  city: String
}
```

## Usage

### Viewing Users

Navigate to the home page to see all users displayed in a table.

### Updating a User

1. Click the 🖋️ icon next to a user
2. Modify the user information in the form
3. Click "Update" to save changes

### Deleting a User

Click the ❌ button next to a user to delete them. The user will be removed from
the UI without a page refresh.

## Features in Detail

### Controllers

The `UserController.js` file contains all database operations:

- `getAllUsers()` - Fetch all users
- `adduser(userData)` - Create a new user
- `deleteUserById(userId)` - Delete user by ID
- `getUserByid(userId)` - Get single user by ID
- `updateUserById(userId, userData)` - Update user information

### Database Connection

The application uses MongoDB with automatic connection handling and error
management.

### Client-Side Functionality

The delete operation uses the Fetch API to make asynchronous DELETE requests,
providing a smooth user experience without page reloads.

## Configuration

To change the port or database URL, modify the constants in `server.js`:

```javascript
const PORT = 5800; // Change port here
```

And in `connectDB.js`:

```javascript
await mongoose.connect("mongodb://localhost:27017/usersList"); // Change DB URL here
```

## Error Handling

- Invalid MongoDB ObjectIDs are validated before operations
- Database connection failures exit the process with error code 1
- Client-side errors are displayed via alerts

## Future Enhancements

- Add user creation functionality
- Implement pagination for large datasets
- Add search and filter capabilities
- Include form validation
- Add authentication and authorization
- Environment variable configuration

## License

MIT

## Author

Nikhil Marne

---

**Note**: Make sure MongoDB is running before starting the application.
