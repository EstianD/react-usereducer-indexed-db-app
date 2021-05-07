import Localbase from "localbase";
import { v4 as uuidv4 } from "uuid";

let db = new Localbase("todo-db");
// db.config.debug = false;

// Get todos function
export async function getTodos(id) {
  try {
    let filteredTodos = [];
    const todos = await db.collection("todos").get();

    if (todos) {
      filteredTodos = todos.filter((todo) => {
        return todo.userId === id;
      });
      return filteredTodos;
    }
  } catch (error) {}
}

// Add todo functon
export async function addTodo(id, title) {
  try {
    // Create todo object
    const todoObj = {
      id: uuidv4(),
      title: title,
      priority: 2,
      completed: false,
      userId: id,
    };

    // Add todo
    const todoRes = await db.collection("todos").add(todoObj);

    console.log("TODO_RES: ", todoRes);

    if (todoRes.success) {
      console.log("RES:  ", todoRes.data.data);
      let todoObj = todoRes.data.data;

      return todoObj;
    }
  } catch (error) {
    console.log("INPUT ERROR: ", error);
  }
}

// Toggle todo status function
export async function toggleTodo(id, status) {
  console.log("TOGGLE: ", id);

  try {
    //   Update todo with id
    let toggleRes = await db.collection("todos").doc({ id: id }).update({
      completed: !status,
    });
    //  If request was successful
    if (toggleRes.success) {
      return toggleRes.data;
    }
  } catch (err) {
    console.log("TOGGLE ERROR: ", err);
  }
}

export async function deleteTodo(id) {
  console.log("ID: ", id);

  try {
    const deleteRes = await db.collection("todos").doc({ id: id }).delete();
    if (deleteRes.success) return deleteRes;
  } catch (err) {
    console.log("DELETE ERROR: ", err);
  }
}
