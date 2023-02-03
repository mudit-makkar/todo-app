import { useEffect, useState } from "react";
import TodoList from "../components/TodoList/TodoList";
import AddTodo from "../components/AddTodo/AddTodo";
import styles from "./style.module.css";

export default function App() {
  //state variables
  const [todos, setTodos] = useState([]);
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
      console.log(storedTodos);
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //edit todo -  handler for todo list component
  const editTodo = (task) => {
    setTask(task);
    setEditing(true);
  };

  return (
    <>
      <h1 className={styles.header}>TODO LIST</h1>
      <AddTodo
        task={task}
        setTask={setTask}
        todos={todos}
        setTodos={setTodos}
        editing={editing}
        setEditing={setEditing}
      />
      <TodoList todos={todos} setTodos={setTodos} editTodo={editTodo} />
    </>
  );
}
