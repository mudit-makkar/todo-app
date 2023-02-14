import styles from "./style.module.css";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Task from "../Task/Task";
export default function TodoList({ todos, dispatch, handleEditClick }) {
  const [value, setValue] = useState("All"); //state variable for dropdown

  //task status change
  const handleTaskStatusChange = (id) => {
    dispatch({
      type: "statusChange",
      taskId: id,
    });
  };

  //updating todos array in case of deletion of tasks
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "delete",
      taskId: id,
    });
  };

  const deleteCompletedTasks = () => {
    dispatch({
      type: "deleteCompletedTasks",
    });
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
            <li className={styles.links} key="links">
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
                    handleEditClick={handleEditClick}
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
