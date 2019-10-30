// Storage class
export default class Storage {
  static getTask() {
    let tasks;
    if (localStorage.getItem('.tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage['.tasks']);
    }
    return tasks;
  }

  static addTask(task) {
    const tasks = Storage.getTask();
    tasks.push(task);
    localStorage['.tasks'] = JSON.stringify(tasks);
  }

  static removeTask(el) {
    if (el.classList.contains('js-task-delete')) {
      const tasks = Storage.getTask();
      const taskID = el.parentElement.parentElement.parentElement.parentElement.dataset.task;
      tasks.splice(taskID, 1);
      localStorage['.tasks'] = JSON.stringify(tasks);
    }
  }

  // Done task
  static doneTask(el) {
    if (el.classList.contains('js-task-done')) {
      const tasks = Storage.getTask();
      const taskID = el.parentElement.parentElement.parentElement.parentElement.dataset.task;
      const taskDone = tasks[taskID];
      taskDone.done = (taskDone.done === false);
      localStorage['.tasks'] = JSON.stringify(tasks);
    }
  }
}
