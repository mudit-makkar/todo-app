import { toast } from "react-toastify";
import styles from "./style.module.css";

export default function AddTodo(props) {
  const { task, setTask, dispatch, editing, setEditing, inputRef } = props;
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    //editing a task
    if (editing) {
      dispatch({
        type: "edit",
        task: task,
      });
      setEditing(false);
      toast.success("Task edited!");
    }
    //adding new task
    else {
      dispatch({
        type: "add",
        task: task,
      });
      toast.success("Task added!");
    }

    //setting task to initial value
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
              ref={inputRef}
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
