import React from "react";

function SignupButton({ handleSignupView }) {
  return (
    <div>
      <button onClick={handleSignupView}>Create</button>
    </div>
  );
}

export default SignupButton;
