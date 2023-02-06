import styles from "./style.module.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Task from "../Task/Task";
export default function TodoList({ todos, setTodos, editTodo }) {
  const [value, setValue] = useState("All"); //state variable for dropdown

  //task status change
  const handleTaskStatusChange = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      else return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); //updating in local storage too
  };

  //updating todos array in case of deletion of tasks
  const handleDeleteTodo = (id) => {
    let updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); //updating in local storage too..
    setTodos(updatedTodos);
  };

  const deleteCompletedTasks = () => {
    let updatedTodos = todos.filter((todo) => {
      return todo.completed === false;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); //updating in local storage too..
    setTodos(updatedTodos);
  };

  return (
    <>
      {" "}
      {todos.length === 0 ? (
        <h2
          style={{ color: "seagreen", textAlign: "center", marginTop: "50px" }}
        >
          No tasks in the list . . . . .{" "}
        </h2>
      ) : (
        <div className={styles.container}>
          <ul className={styles.todoList}>
            <li className={styles.links}>
              <Dropdown value={value} setValue={setValue} /> &nbsp;
              <button
                onClick={deleteCompletedTasks}
                className={styles.deleteButton}
              >
                Delete Completed Tasks
              </button>
            </li>

            {todos.map((todo) => {
              if (
                value === "All" ||
                (value === "Completed" && todo.completed) ||
                (value === "Pending" && !todo.completed)
              ) {
                return (
                  <Task
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleTaskStatusChange={handleTaskStatusChange}
                    editTodo={editTodo}
                  />
                );
              } else {
                return "";
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
}
