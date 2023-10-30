
// Get references to the input field, buttons, and task list
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const saveBtn = document.getElementById('saveBtn');

// Create an empty array to store tasks
let tasks = [];

// Function to render the task list
function renderTasks() {
  // Clear the existing task list
  taskList.innerHTML = '';

  // Loop through the tasks array and create list items
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    // Add a delete button to each list item
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      // Remove the task from the array
      tasks.splice(index, 1);
      // Re-render the task list
      renderTasks();
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteBtn);

    // Append the list item to the task list
    taskList.appendChild(listItem);
  });
}

// Function to handle adding a new task
function addTask() {
  const task = taskInput.value.trim();

  // Check if the task is not empty
  if (task !== '') {
    // Add the task to the array
    tasks.push(task);
    // Clear the input field
    taskInput.value = '';
    // Re-render the task list
    renderTasks();
  }
}

// Event listener for the add task button
addTaskBtn.addEventListener('click', addTask);

// Event listener for the enter key in the input field
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for the save button
saveBtn.addEventListener('click', saveTasks);

// Function to load tasks from local storage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

// Load tasks when the page loads
loadTasks();