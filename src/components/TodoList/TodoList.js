import styles from "./style.module.css";
import { useMemo, useState } from "react";
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

  //filtering todos based on dropdown value
  let filteredTodos = useMemo(() => {
    if (value === "All") {
      return todos;
    } else if (value === "Completed") {
      return todos.filter((task) => {
        return task.completed === true;
      });
    } else if (value === "Pending") {
      return todos.filter((task) => {
        return task.completed === false;
      });
    }
  }, [value, todos]);

  return (
    <>
      {" "}
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
          {filteredTodos.length !== 0 ? (
            filteredTodos.map((todo) => {
              return (
                <Task
                  todo={todo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleTaskStatusChange={handleTaskStatusChange}
                  handleEditClick={handleEditClick}
                />
              );
            })
          ) : (
            <h2
              style={{
                color: "seagreen",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              No tasks in the list . . . . .{" "}
            </h2>
          )}
        </ul>
      </div>
    </>
  );
}
