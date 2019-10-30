/* eslint-disable no-param-reassign */
import Storage from './storage';
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
    tasks.filter((task) => {
      if (task.title === input) {
        UI.addTaskToList(task);
      }
      if (input === '') {
        UI.clearList();
        UI.displayTasks();
      }
      return null;
    });
  }

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
          <input class="task__option-btn" type="button" value="..." />
          <ul class="task__option-list">
              <li class="task__option-item js-task-done">done</li>
              <li class="task__option-item">edit</li>
              <li class="task__option-item js-task-delete">delete</li>
          </ul>
        </div>
      </div>
    `;

    taskList.appendChild(newTask);
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
      document.querySelector('.modal-window').style.display = 'flex';
    }
    if (el.classList.contains('js-close-modal') || el.classList.contains('modal-window')) {
      document.querySelector('.modal-window').style.display = 'none';
      UI.clerForm();
    }
  }

  // Show task menu
  static showTaskMenu(el) {
    if (el.classList.contains('task__option-btn')) {
      el.nextElementSibling.style.display = (el.nextElementSibling.style.display === 'block') ? 'none' : 'block';
    }
  }

  // Form clear
  static clerForm() {
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
}
