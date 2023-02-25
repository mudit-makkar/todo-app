import { useEffect, useReducer, useRef, useState } from "react";
import TodoList from "../components/TodoList/TodoList";
import AddTodo from "../components/AddTodo/AddTodo";
import styles from "./style.module.css";
import todosReducer from "../utils/todosReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const inputRef = useRef(null);

  //state variables
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [task, setTask] = useState({
    id: Math.random(),
    taskText: "",
    duedate: "",
    completed: false,
  });
  const [editing, setEditing] = useState(false);

  //side effect (getting todos from local storage on first render)
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos != null) {
      dispatch({
        type: "set",
        todos: JSON.parse(storedTodos),
      });
    }
  }, []);

  //edit todo -  handler for todo list component
  const handleEditClick = (task) => {
    setTask(task);
    setEditing(true);
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    inputRef.current.focus();
  };

  return (
    <>
      <h1 className={styles.header}>TODO LIST</h1>
      <AddTodo
        task={task}
        setTask={setTask}
        dispatch={dispatch}
        editing={editing}
        setEditing={setEditing}
        inputRef={inputRef}
      />
      <TodoList
        todos={todos}
        dispatch={dispatch}
        handleEditClick={handleEditClick}
      />
      <ToastContainer autoClose={1000} position="top-right" />
    </>
  );
}
