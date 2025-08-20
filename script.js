let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let todoUserInput = document.getElementById("todoUserInput");

// Load from localStorage or empty list
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let todosCount = todoList.length;

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Delete todo
function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  if (todoElement) {
    todoItemsContainer.removeChild(todoElement);
  }
  let deleteIndex = todoList.findIndex(each => "todo" + each.uniqueNo === todoId);
  if (deleteIndex !== -1) {
    todoList.splice(deleteIndex, 1);
  }
}

// Toggle checked
function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);

  let todoIndex = todoList.findIndex(each => "todo" + each.uniqueNo === todoId);
  if (todoIndex !== -1) {
    todoList[todoIndex].isChecked = checkboxElement.checked;
  }

  labelElement.classList.toggle("checked", checkboxElement.checked);
}

// Create and append todo item
function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoWrapper = document.createElement("div");
  todoWrapper.classList.add("todo-wrapper");
  todoWrapper.id = todoId;

  // Checkbox (outside container, left)
  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };

  // Inner todo container (dark card)
  let todoElement = document.createElement("div");
  todoElement.classList.add("todo-item-container");

  // Label
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("todo-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked) {
    labelElement.classList.add("checked");
  }

  // Delete icon
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  // Append inside todoElement
  todoElement.appendChild(labelElement);
  todoElement.appendChild(deleteIcon);

  // Wrapper → checkbox + todoElement
  todoWrapper.appendChild(inputElement);
  todoWrapper.appendChild(todoElement);

  todoItemsContainer.appendChild(todoWrapper);
}

// Add new todo
function onAddTodo() {
  let userInputValue = todoUserInput.value.trim();
  if (userInputValue === "") {
    alert("Enter a valid task!");
    return;
  }
  todosCount += 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  todoUserInput.value = "";
}

// Attach events
addTodoButton.onclick = onAddTodo;
saveTodoButton.onclick = saveTodos;

// Render saved todos on load
for (let todo of todoList) {
  createAndAppendTodo(todo);
}
