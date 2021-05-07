import { useState, useEffect } from "react";
import { getUsers, addUser } from "../Services/users";

export default function useSignupForm(validateSignup, submitSignupForm) {
  const [inputName, setInputName] = useState("");
  const [signupErrors, setSignupErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [users, setUsers] = useState([])

  const handleSignupChange = (e) => {
    setInputName(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let errors = await validateSignup(inputName);
    console.log("ERRORS: ", errors);
    setIsSubmitting(true);
    setSignupErrors(errors);
  };

  useEffect(() => {
    if (Object.keys(signupErrors).length === 0 && isSubmitting) {
      console.log("Submitting");

      submitSignupForm(inputName);
    }
  }, [signupErrors]);

  return { inputName, signupErrors, handleSignupChange, handleSignupSubmit };
}
