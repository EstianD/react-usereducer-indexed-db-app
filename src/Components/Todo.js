import React from "react";
import { toggleTodo, deleteTodo } from "../Services/todos";
import { ACTIONS } from "../Components/Dashboard";

function Todo({ todo, dispatch }) {
  // Toggle todo status
  const handleTodoToggle = async (id, status) => {
    const statusRes = await toggleTodo(id, status);
    if (statusRes) {
      dispatch({
        type: ACTIONS.TOGGLE_TODO,
        payload: { id: id, status: statusRes },
      });
    }
    console.log(statusRes);
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    //  console.log("ID: ", id);
    const deleteRes = await deleteTodo(id);
    if (deleteRes) {
      dispatch({
        type: ACTIONS.DELETE_TODO,
        payload: { id: id },
      });
    }
  };

  return (
    <div className="todo-container">
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "green" : "black",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => handleTodoToggle(todo.id, todo.completed)}>
        Toggle
      </button>
      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default Todo;
