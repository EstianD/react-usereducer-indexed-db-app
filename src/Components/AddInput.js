import React, { useState } from "react";
import { ACTIONS } from "./Dashboard";
import { addTodo } from "../Services/todos";

function AddInput({ loggedUser, dispatch }) {
  const [todoInput, setTodoInput] = useState("");
  const [inputError, setInputError] = useState({});
  //   console.log("INPUT: ", loggedUser);

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    //  Check if input has a value
    if (todoInput.length === 0) {
      setInputError({ name: "Input can't be empty!" });
    } else {
      //  Clear error
      setInputError({});
      //  Send Add todo request to db
      const todoRes = await addTodo(loggedUser.id, todoInput);
      if (todoRes) {
        dispatch({
          type: ACTIONS.ADD_TODO,
          payload: { todo: todoRes },
        });
        setTodoInput("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          className="todo-input"
          onChange={handleInputChange}
          value={todoInput}
        />
      </form>
      {Object.keys(inputError) && (
        <span className="input-error">{inputError.name}</span>
      )}
    </div>
  );
}

export default AddInput;
