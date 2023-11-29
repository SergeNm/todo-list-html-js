const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTask");
const submitTaskButton = document.getElementById("submitTask");

submitTaskButton.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    const newTask = document.createElement("li");
    newTask.textContent = taskText;
    newTask.classList.add("clickable");

    const importantButton = document.createElement("button");
    importantButton.textContent = "Mark Important";
    importantButton.addEventListener("click", () => {
      newTask.classList.toggle("important");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      newTask.remove();
    });

    newTask.appendChild(deleteButton);
    newTask.appendChild(importantButton);

    taskList.insertBefore(newTask, taskList.firstChild);
    newTaskInput.value = "";
  }
});
