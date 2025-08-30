document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            renderTask(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create and append a new task element to the DOM
    const renderTask = (text, completed) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add a new task from the input field
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            renderTask(taskText, false);
            taskInput.value = '';
            saveTasks();
        }
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});

