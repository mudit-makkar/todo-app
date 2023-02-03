import styles from "./style.module.css";

export default function AddTodo(props) {
  const { task, setTask, todos, setTodos, editing, setEditing } = props;
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    let updatedTodos = null;

    if (editing) {
      updatedTodos = todos.map((element) => {
        if (element.id === task.id) return task;
        else return element;
      });
      setEditing(false);
    } else {
      updatedTodos = [task, ...todos];
    }
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTask({
      id: Math.random(),
      taskText: "",
      duedate: "",
      completed: false,
    });
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.addTaskForm} onSubmit={handleAddTask}>
          <h2>Add some tasks in the list . . . . . . .</h2>
          <div className={styles.taskInput}>
            <label>Task:</label>
            <br />
            <input
              type="text"
              placeholder="Write your task here..."
              name="taskText"
              value={task.taskText}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className={styles.dueDateInput}>
            <label>Due Date:</label>
            <br />
            <input
              type="date"
              name="duedate"
              value={task.duedate}
              onChange={handleChange}
            />
          </div>
          <br />
          <button type="submit">{editing ? "Edit" : "Add"}</button>
        </form>
      </div>
    </>
  );
}
