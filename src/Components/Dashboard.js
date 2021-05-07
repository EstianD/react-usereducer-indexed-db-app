import React, { useState, useReducer, useEffect } from "react";

import Todo from "./Todo";
import AddInput from "./AddInput";

import { addTodo, getTodos } from "../Services/todos";

export const ACTIONS = {
  GET_TODO: "get_todo",
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete_todo",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.GET_TODOS:
      state = action.payload.todos;
      return state;
    case ACTIONS.ADD_TODO:
      return [...state, action.payload.todo];
    case ACTIONS.TOGGLE_TODO:
      console.log("STATE: ", state);
      console.log("PAYLOAD: ", action.payload);
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: action.payload.status.completed };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => {
        return todo.id !== action.payload.id;
      });

    default:
      return state;
  }
}

var initialState = [];

function Dashboard({ handleLogout, loggedUser }) {
  const [todos, dispatch] = useReducer(reducer, initialState);
  console.log("STATE DASHBOARD: ", todos);

  useEffect(() => {
    const handleGetTodos = async (id) => {
      const todosRes = await getTodos(id);
      if (todosRes) {
        dispatch({ type: ACTIONS.GET_TODOS, payload: { todos: todosRes } });
      }
    };
    handleGetTodos(loggedUser.id);
  }, []);

  const renderTodos = () => {
    return todos.map((todo) => (
      <Todo key={todo.id} todo={todo} dispatch={dispatch} />
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="header-container">
        <span className="user-title">{loggedUser.username}</span>

        <button
          className="logout-btn"
          onClick={() => handleLogout(loggedUser.id)}
        >
          Logout
        </button>
      </div>

      <AddInput loggedUser={loggedUser} dispatch={dispatch} />
      <h3>Todos:</h3>
      {renderTodos()}
    </div>
  );
}

export default Dashboard;
