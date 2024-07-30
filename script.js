document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task event listener
    addTaskButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            // Create task element
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit-button">✎</button>
                <button class="delete-button">✘</button>
            `;
            taskList.appendChild(li);
            
            // Save task to localStorage
            saveTasks();

            // Clear input field
            taskInput.value = '';

            // Add event listeners to new task buttons
            addTaskEventListeners();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.querySelector('.task-text').classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text${task.completed ? ' completed' : ''}">${task.text}</span>
                <button class="edit-button">✎</button>
                <button class="delete-button">✘</button>
            `;
            taskList.appendChild(li);
        });
        addTaskEventListeners();
    }

    function addTaskEventListeners() {
        taskList.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', editTask);
        });
        taskList.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', deleteTask);
        });
        taskList.querySelectorAll('.task-text').forEach(span => {
            span.addEventListener('click', toggleTaskCompletion);
        });
    }

    function editTask(event) {
        const li = event.target.closest('li');
        const taskText = li.querySelector('.task-text');
        const newText = prompt('Edit task:', taskText.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskText.textContent = newText.trim();
            saveTasks();
        }
    }

    function deleteTask(event) {
        const li = event.target.closest('li');
        li.remove();
        saveTasks();
    }

    function toggleTaskCompletion(event) {
        const taskText = event.target;
        taskText.classList.toggle('completed');
        saveTasks();
    }
});
