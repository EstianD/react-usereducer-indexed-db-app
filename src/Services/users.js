import Localbase from "localbase";
import { v4 as uuidv4 } from "uuid";

let db = new Localbase("todo-db");
db.config.debug = false;

// Get users
export async function getUsers() {
  try {
    const users = await db.collection("users").get();
    console.log("GETTING USERS", users);
    if (users) return users;
    return [];
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// Add user
export async function addUser(username) {
  console.log("ADDING USER");

  const user = {
    id: uuidv4(),
    username: username,
    loggedIn: 1,
  };

  try {
    const addUserResponse = await db.collection("users").add(user);
    console.log("INPUT RES: ", addUserResponse);
    if (addUserResponse.success) return user;
  } catch (error) {
    console.log("Signup error: ", error);
  }
}

// Login user
export async function loginUser(id) {
  console.log("LOGIN", id);
  //   Update user with provided id
  try {
    const updateRes = await db.collection("users").doc({ id: id }).update({
      loggedIn: 1,
    });

    if (updateRes.success) {
      console.log("LOGGED IN");

      //  Return logged in user
      const user = await db.collection("users").doc({ id: id }).get();

      return user;
    }
  } catch (error) {
    console.log("Login error: ", error);
  }
}

// Check if user authenticated
export async function checkAuth() {
  console.log("CHECKING AUTH");
  try {
    const authUser = await db.collection("users").doc({ loggedIn: 1 }).get();
    console.log("AUTH: ", authUser);
    if (authUser) return authUser;
    return {};
  } catch (error) {
    console.log("ERROR AUTH: ", error);
  }
}

// Logout user
export async function logoutUser(id) {
  console.log("LOGOUT");
  const logoutRes = await db.collection("users").doc({ id: id }).update({
    loggedIn: 0,
  });
  console.log("LOGOUT RES: ", logoutRes);
}
