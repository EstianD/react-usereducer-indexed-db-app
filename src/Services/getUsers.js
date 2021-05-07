import Localbase from "localbase";

async function getUsers() {
  let db = new Localbase("todo-db");
  const users = await db.collection("users").get();

  return users;
}

export default getUsers;
