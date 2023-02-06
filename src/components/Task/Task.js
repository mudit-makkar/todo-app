import styles from "./style.module.css";
import Button from "../Button/Button";
export default function Task({
  todo,
  handleTaskStatusChange,
  handleDeleteTodo,
  editTodo,
}) {
  let editButtonDisable = todo.completed ? true : false;

  return (
    <>
      <li key={todo.id} className={styles.task}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            handleTaskStatusChange(todo.id);
          }}
          className={styles.taskStatusCheckbox}
        />
        <div className={styles.taskText}>
          {" "}
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.taskText}
          </span>
          &nbsp; &nbsp;
          <span className={styles.duedate}>{todo.duedate}</span>
          &nbsp; &nbsp;
          {new Date(todo.duedate) < Date.now() && !todo.completed ? (
            <span className={styles.overdue}>Overdue</span>
          ) : (
            ""
          )}
        </div>
        <Button text="Delete" handleClick={() => handleDeleteTodo(todo.id)} />
        &nbsp;
        <Button
          text="Edit"
          handleClick={() => editTodo({ ...todo })}
          disabled={editButtonDisable}
        />
      </li>
    </>
  );
}
