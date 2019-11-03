/* eslint-disable no-param-reassign */
import Storage from './storage';
import Task from './task';

// UI Class
export default class UI {
  static displayTasks() {
    const tasks = Storage.getTask();
    tasks.forEach((task, id) => UI.addTaskToList(task, id));
  }

  // Search
  static taskSearch(input) {
    const tasks = Storage.getTask();
    UI.clearList();
    document.querySelector('.tool-bar__priority').value = 'all';
    document.querySelector('.tool-bar__state').value = 'all';
    tasks.forEach((task, id) => {
      if (task.title.toLowerCase().includes(input.toLowerCase())) { UI.addTaskToList(task, id); }
    });
  }

  // Filter done
  static doneFilter(el) {
    const tasks = Storage.getTask();
    const done = (el.value === 'done');
    UI.clearList();
    document.querySelector('.tool-bar__priority').value = 'all';
    tasks.forEach((task, id) => {
      if (done === task.done && el.value !== 'all') { UI.addTaskToList(task, id); }
      if (el.value === 'all') { UI.addTaskToList(task, id); }
    });
  }

  // Filter prority
  static priorityFilter(el) {
    const tasks = Storage.getTask();
    UI.clearList();
    document.querySelector('.tool-bar__state').value = 'all';
    tasks.forEach((task, id) => {
      if (el.value === task.priority && el.value !== 'all') { UI.addTaskToList(task, id); }
      if (el.value === 'all') { UI.addTaskToList(task, id); }
    });
  }

  // Create task form
  static createTask(el) {
    el.preventDefault();
    // Get form val
    const title = document.querySelector('.task-form__title').value;
    const text = document.querySelector('.task-form__text').value;
    const priority = document.querySelector('.task-form__priority').value;
    const done = false;
    // Init task
    const task = new Task(title, text, priority, done);
    // Add task to LocalStorage
    Storage.addTask(task);
    // Add task to UI
    if (title !== '' || text !== '') { UI.addTaskToList(task); }
    // Clear form
    UI.clearForm();
    document.querySelector('.modal-window').style.display = 'none';
  }

  // Add task to DOM
  static addTaskToList(task, id) {
    const taskList = document.querySelector('.task-list');
    const newTask = document.createElement('div');
    const tasks = Storage.getTask();

    if (id === undefined) {
      id = tasks.length - 1;
    }

    newTask.classList.add('task');
    newTask.dataset.task = id;

    if (task.done) {
      newTask.classList.add('task--done');
    }

    newTask.innerHTML = `
      <h3 class="task__title">${task.title}</h3>
      <p class="task__text">${task.text}</p>
      <div class="task__menu">
        <span class="task__priority task__priority--${task.priority}">${task.priority}</span>
        <div class="task__option">
          <i class="fas fa-ellipsis-v task__option-btn"></i>
          <ul class="task__option-list">
              <li class="task__option-item js-task-done">
                <i class="fas fa-check-circle"></i> done
              </li>
              <li class="task__option-item js-task-edit">
              <i class="fas fa-pencil-alt"></i> edit
              </li>
              <li class="task__option-item js-task-delete">
              <i class="fas fa-trash-alt"></i> delete
              </li>
          </ul>
        </div>
      </div>
    `;

    taskList.appendChild(newTask);
  }

  // Edit task
  static editTask(el) {
    if (el.classList.contains('js-task-edit')) {
      const tasks = Storage.getTask();
      const taskID = el.parentElement.parentElement.parentElement.parentElement.dataset.task;
      const oldTask = {
        title: tasks[taskID].title,
        text: tasks[taskID].text,
        priority: tasks[taskID].priority,
      };
      console.log(oldTask);

      const title = document.querySelector('.task-form__title');
      const text = document.querySelector('.task-form__text');
      const priority = document.querySelector('.task-form__priority');

      // Modal-form manipulation
      document.querySelector('.modal-window').style.display = 'flex';
      document.querySelector('.js-save-modal').style.display = 'block';
      document.querySelector('.js-create-modal').style.display = 'none';

      // Get field value
      title.value = oldTask.title;
      text.value = oldTask.text;
      priority.value = oldTask.priority;

      document.querySelector('.js-save-modal').addEventListener('click', () => {
        document.querySelector('.modal-window').style.display = 'none';
        tasks[taskID].title = title.value;
        tasks[taskID].text = text.value;
        tasks[taskID].priority = priority.value;
        localStorage['.tasks'] = JSON.stringify(tasks);
        UI.clearList();
        UI.displayTasks();
      });
    }
  }

  // Delete task
  static deleteTask(el) {
    if (el.classList.contains('js-task-delete')) {
      el.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }

  // Show modal window
  static showModalWindow(el) {
    if (el.classList.contains('js-open-modal')) {
      UI.clearForm();
      document.querySelector('.modal-window').style.display = 'flex';
      document.querySelector('.js-create-modal').style.display = 'block';
      document.querySelector('.js-save-modal').style.display = 'none';
    }
    if (el.classList.contains('js-close-modal') || el.classList.contains('modal-window')) {
      document.querySelector('.modal-window').style.display = 'none';
      UI.clearForm();
    }
  }

  // Show task menu
  static showTaskMenu(el) {
    if (el.classList.contains('task__option-btn')) {
      el.nextElementSibling.style.display = (el.nextElementSibling.style.display === 'block') ? 'none' : 'block';
    } else if (el.classList.contains('js-task-edit') || el.classList.contains('js-task-done')) {
      el.parentElement.style.display = 'none';
    } else {
      document.querySelectorAll('.task__option-list').forEach((menu) => {
        menu.style.display = 'none';
      });
    }
  }

  // Form clear
  static clearForm() {
    document.querySelector('.task-form__title').value = '';
    document.querySelector('.task-form__text').value = '';
    document.querySelector('.task-form__priority').value = 'low';
  }

  // Done task
  static doneTask(el) {
    if (el.classList.contains('js-task-done')) {
      const task = el.parentElement.parentElement.parentElement.parentElement;
      task.classList.toggle('task--done');
    }
  }

  // Clear task-list
  static clearList() {
    document.querySelector('.task-list').innerHTML = '';
  }

  // Theme switch
  static themeSwitch(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      console.log('Dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      console.log('Light');
      localStorage.setItem('theme', 'light');
    }
  }

  // Current theme
  static currentTheme() {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        document.querySelector('.theme-switch input[type="checkbox"]').checked = true;
      }
    }
  }
}
