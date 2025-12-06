import { getUser } from "../Model/usersDB.js";

export async function validateUser(email, password) {
  const user = await getUser(email, password);
  if (user) {
    return { login: true, user };
  } else {
    return { login: false, user: false };
  }
}
