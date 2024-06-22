const addTodoButtonElement = document.getElementById("add-todo-btn");
const saveTodoButtonElement = document.getElementById("save-todo-btn");
const pendingAllClearButtonElement =
  document.getElementById("pending-clear-btn");
const completedAllClearButtonElement = document.getElementById(
  "completed-clear-btn"
);
const inputTodoElement = document.getElementById("input-todo");
const pendingTodosListElement = document.getElementById("pending-todos-list");
const completedTodosListElement = document.getElementById(
  "completed-todos-list"
);
const completedBtnElement = document.getElementById("completed-btn");
const pendingBtnElement = document.getElementById("pending-btn");
const pendingTodosElement = document.getElementById("pending-todos");
const completedTodosElement = document.getElementById("completed-todos");

//
const deleteTodo = (todoId) => {
  const todos = JSON.parse(localStorage.getItem("TODOS"));
  const filteredTodos = todos.filter((todo) => {
    return todo.id !== todoId;
  });
  localStorage.setItem("TODOS", JSON.stringify(filteredTodos));
  document.getElementById(`todo-${todoId}`).remove();
};

//
const editTodo = (todoText, todoId) => {
  inputTodoElement.value = todoText;
  addTodoButtonElement.classList.add("hide");
  saveTodoButtonElement.classList.remove("hide");
  saveTodoButtonElement.addEventListener("click", () => {
    document.getElementById(`todo-text-${todoId}`).innerText =
      inputTodoElement.value;
    const todos = JSON.parse(localStorage.getItem("TODOS"));
    const modifiedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.todoText = inputTodoElement.value;
      }
      return todo;
    });
    localStorage.setItem("TODOS", JSON.stringify(modifiedTodos));
    addTodoButtonElement.classList.remove("hide");
    saveTodoButtonElement.classList.add("hide");
    inputTodoElement.value = "";
  });
};

//
const tickTodo = (todoId) => {
  const todos = JSON.parse(localStorage.getItem("TODOS"));
  const modifiedTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      todo.isDone = true;
    }
    return todo;
  });
  localStorage.setItem("TODOS", JSON.stringify(modifiedTodos));
  document.getElementById(`todo-${todoId}`).remove();
};

//
const showPendingTodo = (todo) => {
  pendingTodosListElement.insertAdjacentHTML(
    "beforeend",
    `<li id="todo-${todo.id}">
    <div class="todo-text" id="todo-text-${todo.id}">${todo.todoText}</div>
    <div class="todo-actions">
        <button type = "button" class="edit-btn">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type = "button" class="delete-btn">
          <i class="fa fa-trash"></i>
        </button>
        <button type = "button" class="tick-btn">
          <i class="fa-solid fa-check-square"></i>
        </button>
    </div>
  </li>`
  );
  const deleteBtnElement =
    pendingTodosListElement.lastElementChild.querySelector(".delete-btn");
  deleteBtnElement.addEventListener("click", () => {
    deleteTodo(todo.id);
  });
  const editBtnElement =
    pendingTodosListElement.lastElementChild.querySelector(".edit-btn");
  editBtnElement.addEventListener("click", () => {
    editTodo(todo.todoText, todo.id);
  });
  const tickBtnElement =
    pendingTodosListElement.lastElementChild.querySelector(".tick-btn");
  tickBtnElement.addEventListener("click", () => {
    tickTodo(todo.id);
    showTodo({ ...todo, isDone: true });
  });
  inputTodoElement.value = "";
};

const showCompletedTodo = (todo) => {
  completedTodosListElement.insertAdjacentHTML(
    "beforeend",
    `<li id="todo-${todo.id}">
    <div class="todo-text" id="todo-text-${todo.id}">${todo.todoText}</div>
    <div class="todo-actions">
        <button type = "button" class="delete-btn">
          <i class="fa fa-trash"></i>
        </button>
       </div>
  </li>`
  );
  const deleteBtnElement =
    completedTodosListElement.lastElementChild.querySelector(".delete-btn");
  deleteBtnElement.addEventListener("click", () => {
    deleteTodo(todo.id);
  });
};

//
function showTodo(todo) {
  todo.isDone ? showCompletedTodo(todo) : showPendingTodo(todo);
}

//
const addTodo = () => {
  const inputTodo = inputTodoElement.value.trim();
  if (!inputTodo) {
    alert("please filll allll");
  } else {
    const id = new Date().getTime().toString();
    const todo = {
      id,
      todoText: inputTodo,
      isDone: false,
    };
    const todos = JSON.parse(localStorage.getItem("TODOS")) || [];
    todos.push(todo);
    localStorage.setItem("TODOS", JSON.stringify(todos));
    showTodo(todo);
  }
};

//
addTodoButtonElement.addEventListener("click", addTodo);

//
pendingAllClearButtonElement.addEventListener("click", () => {
  pendingTodosListElement.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("TODOS"));
  const clearedTodos = todos.filter((todo) => {
    return todo.isDone === true;
  });
  localStorage.setItem("TODOS", JSON.stringify(clearedTodos));
});

//
completedAllClearButtonElement.addEventListener("click", () => {
  completedTodosListElement.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("TODOS"));
  const clearedTodos = todos.filter((todo) => {
    return todo.isDone === false;
  });
  localStorage.setItem("TODOS", JSON.stringify(clearedTodos));
});

//
completedBtnElement.addEventListener("click", () => {
  pendingBtnElement.classList.remove("highlight-btn");
  completedBtnElement.classList.add("highlight-btn");
  pendingTodosElement.classList.add("hide");
  completedTodosElement.classList.remove("hide");
});

//
pendingBtnElement.addEventListener("click", () => {
  pendingBtnElement.classList.add("highlight-btn");
  completedBtnElement.classList.remove("highlight-btn");
  pendingTodosElement.classList.remove("hide");
  completedTodosElement.classList.add("hide");
});

//
window.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("TODOS")) || [];
  if (todos.length) {
    todos.forEach((todo) => {
      showTodo(todo);
    });
  }

});


// no clear all btn
// no pending todos msg