const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === "") {
    alert("Please enter a task!");
    return;
  }
  todoInput.value = "";
  addTask(newTask);
});

function addTask(task) {
  const listItem = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = task;
  listItem.appendChild(taskText);

  // check button
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  listItem.appendChild(checkBox);

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);

  // edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  listItem.appendChild(editButton);

  todoList.appendChild(listItem);

  // checkbox function
  checkBox.addEventListener("change", function () {
    if (this.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });

  // delete function
  deleteButton.addEventListener("click", function () {
    todoList.removeChild(listItem);
    saveTasksToLocalStorage();
  });

  // edit function
  editButton.addEventListener("click", function () {
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
      const input = listItem.querySelector("input[type='text']");
      taskText.textContent = input.value;
      listItem.removeChild(input);
      listItem.insertBefore(taskText, editButton);
      listItem.classList.remove("editing");
      editButton.textContent = "Edit";
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskText.textContent;
      listItem.classList.add("editing");
      listItem.insertBefore(input, taskText);
      listItem.removeChild(taskText);
      editButton.textContent = "Save";
    }
    saveTasksToLocalStorage();
  });

  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((task) => {
    const taskText = task.querySelector("span").textContent;
    const isCompleted = task.querySelector("input[type='checkbox']").checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const lastTask = todoList.lastElementChild;
      const checkBox = lastTask.querySelector("input[type='checkbox']");
      checkBox.checked = true;
      lastTask.querySelector("span").style.textDecoration = "line-through";
    }
  });
});
