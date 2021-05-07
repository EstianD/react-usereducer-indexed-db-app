import React from "react";

function UserSelect({ users, handleLogin }) {
  return (
    <div>
      <select onChange={handleLogin}>
        <option value="0">Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelect;
