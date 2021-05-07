// import { useState, useEffect } from "react";
import Localbase from "localbase";

async function addUser(username) {
  //   const [users, setUsers] = useState(null);
  let db = new Localbase("todo-db");
  //  db.collection("users").add({
  //    id: 1,
  //    name: "Bill",
  //    age: 47,
  //  });
  console.log("username: ", username);
  // console.log("GET USERS");
  // GEt users
  const users = await db.collection("users").get();
  if (!users.find(username)) {
    console.log("nope");
  }

  console.log("done");
  // return users;
  // db.collection("users")
  //   .get()
  //   .then((users) => {
  //     console.log("here");
  //     return users;
  //   });
}

export default addUser;
