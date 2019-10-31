import UI from './ui';
import Storage from './storage';

// Event: Display Tasks
document.addEventListener('DOMcontentLoaded', UI.displayTasks());

// Event: Add a Task
document.querySelector('.task-form').addEventListener('submit', (el) => {
  UI.createTask(el);
});

// Event: Remove task
document.querySelector('.task-list').addEventListener('click', (e) => {
  UI.deleteTask(e.target);
  Storage.removeTask(e.target);
});

// Event: Show task menu
document.querySelector('.task-list').addEventListener('click', (e) => {
  UI.showTaskMenu(e.target);
});

// Event: Show modal window
document.addEventListener('click', (e) => {
  UI.showModalWindow(e.target);
});

// Event: Add Done mark
document.addEventListener('click', (e) => {
  UI.doneTask(e.target);
  Storage.doneTask(e.target);
});

// Event: Search
document.querySelector('.tool-bar__search').addEventListener('keyup', (e) => {
  UI.taskSearch(e.target.value);
});

// Event: Done filter
document.querySelector('.tool-bar__state').addEventListener('change', (e) => {
  UI.doneFilter(e.target);
});

// Event: Priority filter
document.querySelector('.tool-bar__priority').addEventListener('change', (e) => {
  UI.priorityFilter(e.target);
});

// Event: Edit
document.addEventListener('click', (e) => {
  UI.editTask(e.target);
});
