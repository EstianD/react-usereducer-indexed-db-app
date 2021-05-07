import { getUsers } from "../Services/users";

async function validateSignup(username) {
  let errors = {};

  if (username === "") {
    errors.name = "Username cannot be empty!";
  }

  if (username.length < 5) {
    errors.name = "Username needs to be atleast 5 characters!";
  }

  if (username.length > 15) {
    errors.name = "Username cannot be more than 15 characters";
  }

  // CHeck if username exist in DB
  if (Object.keys(errors).length === 0) {
    // Get users
    const users = await getUsers();
    console.log("users: ", users);

    //  Check if users exist
    if (users.length !== 0) {
      let user = users.filter((user) => {
        // Filter users for specified user
        return user.username === username;
      });
      // Check if user exist
      if (user.length) {
        errors.name = "Username allready exists!";
      }
    }
  }

  return errors;
}

export default validateSignup;
