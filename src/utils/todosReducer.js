export default function todosReducer(todos, action) {
  let updatedTodos = null;

  //set todos from local storage
  if (action.type === "set") {
    updatedTodos = action.todos;
  }
  //add task in the list
  else if (action.type === "add") {
    updatedTodos = [action.task, ...todos];
  }
  //delete task from the list
  else if (action.type === "delete") {
    let id = action.taskId;
    updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
  }
  //edit task in the list
  else if (action.type === "edit") {
    let id = action.task.id;
    let task = action.task;
    updatedTodos = todos.map((todo) => {
      if (todo.id === id) return task;
      else return todo;
    });
  }
  //status of task is changed
  else if (action.type === "statusChange") {
    let id = action.taskId;
    return todos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      else return todo;
    });
  }
  //delete completed tasks from the list
  else if (action.type === "deleteCompletedTasks") {
    updatedTodos = todos.filter((todo) => {
      return todo.completed === false;
    });
  }
  //invalid action
  else {
    updatedTodos = todos;
  }

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return updatedTodos;
}
