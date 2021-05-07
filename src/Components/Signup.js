import React, { useState } from "react";
import useSignupForm from "../Hooks/useSignupForm";
import validateSignup from "../Services/validateSignup";
import { addUser } from "../Services/users";

function Signup({ setLoggedUser, setView }) {
  const submitSignupForm = async (inputName) => {
    const user = await addUser(inputName);
    console.log("LOGGDD: ", user);
    if (user) {
      setLoggedUser(user);
      setView("");
    }
  };
  const {
    inputName,
    signupErrors,
    handleSignupChange,
    handleSignupSubmit,
  } = useSignupForm(validateSignup, submitSignupForm);

  // console.log(inputName);

  return (
    <div>
      <h4>Create a username:</h4>
      <form onSubmit={(e) => handleSignupSubmit(e)}>
        <input
          type="text"
          value={inputName}
          onChange={(e) => handleSignupChange(e)}
        />
      </form>
      {/* <button type="submit" onClick={}>Create</button> */}
      <span className="signup-errors">{signupErrors.name}</span>
    </div>
  );
}

export default Signup;
