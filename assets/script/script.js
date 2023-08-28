const taskInput = document.getElementById("new-task"); //new-task
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

const createNewTaskElement = (taskString) => {
  let listItem = document.createElement("li");

  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = () => {
  console.log("Add task");
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  console.log("Edit task");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text");
  let label = listItem.querySelector("label");

  let containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  console.log("Delete task");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const taskCompleted = function () {
  console.log("Task complete");
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Task incomplete");
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("Bind list item events");
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
