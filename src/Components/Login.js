import React, { useState, useEffect } from "react";
import UserSelect from "./UserSelect";

import { getUsers, loginUser } from "../Services/users";

function Login({ setLoggedUser, users, setView }) {
  //   const [users, setUsers] = useState([]);

  const handleLogin = async (e) => {
    if (e.target.value !== 0) {
      //  Login
      const user = await loginUser(e.target.value);
      setLoggedUser(user);
      setView("");
    }
  };

  return (
    <div>
      {users.length !== 0 && (
        <UserSelect users={users} handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default Login;
