const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTask");
const submitTaskButton = document.getElementById("submitTask");

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load tasks from local storage
  loadTasksFromLocalStorage();
});

// Event listener for adding a task (button click)
submitTaskButton.addEventListener("click", addTask);

// Event listener for pressing Enter key to add a task
newTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to add a new task to the list
function addTask() {
  // Get the task text from the input field
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    // Create a new list item for the task
    const newTask = document.createElement("li");

    // Create a span element for the task text
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    newTask.appendChild(taskTextElement);

    // Add a class for styling and interaction
    newTask.classList.add("clickable");

    // Create buttons for marking as important and deleting the task
    const importantButton = createButton("Mark Important", () => {
      newTask.classList.toggle("important");
      saveTasksToLocalStorage();
    });

    const deleteButton = createButton("Delete", () => {
      newTask.remove();
      saveTasksToLocalStorage();
    });

    // Append buttons to the task
    newTask.appendChild(deleteButton);
    newTask.appendChild(importantButton);

    // Insert the new task at the beginning of the task list
    taskList.insertBefore(newTask, taskList.firstChild);

    // Clear the input field
    newTaskInput.value = "";

    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
}

// Function to create a button with a specified text and click event handler
function createButton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  // Extract task details from the task list and save to local storage
  const tasks = Array.from(taskList.children).map((task) => {
    return {
      text: task.querySelector("span").textContent,
      important: task.classList.contains("important"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage and populate the task list
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((taskDetails) => {
      // Create a new task list item
      const newTask = document.createElement("li");

      // Create a span element for the task text
      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = taskDetails.text;
      newTask.appendChild(taskTextElement);

      // Create buttons for marking as important and deleting the task
      const importantButton = createButton("Mark Important", () => {
        newTask.classList.toggle("important");
        saveTasksToLocalStorage();
      });

      const deleteButton = createButton("Delete", () => {
        newTask.remove();
        saveTasksToLocalStorage();
      });

      // Append buttons to the task
      newTask.appendChild(deleteButton);
      newTask.appendChild(importantButton);

      // Set the "important" class based on the loaded data
      if (taskDetails.important) {
        newTask.classList.add("important");
      }

      // Append the new task to the task list
      taskList.appendChild(newTask);
    });
  }
}
