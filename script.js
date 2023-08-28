document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Populate tasks on page load
    tasks.forEach((task, index) => addTaskToDOM(task, index));

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            const newIndex = tasks.length - 1;
            addTaskToDOM(newTask, newIndex);
            taskInput.value = '';
        }
    });

    // Delete a task
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const taskIndex = event.target.dataset.index;
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            refreshTaskList();
        } else if (event.target.classList.contains('edit-btn')) {
            const taskIndex = event.target.dataset.index;
            const newTaskText = prompt('Edit task:', tasks[taskIndex]);
            if (newTaskText !== null) {
                tasks[taskIndex] = newTaskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                refreshTaskList();
            }
        }
    });

    // Add task to the DOM
    function addTaskToDOM(task, index) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        taskList.appendChild(taskItem);
    }

    // Refresh the task list
    function refreshTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => addTaskToDOM(task, index));
    }
});
