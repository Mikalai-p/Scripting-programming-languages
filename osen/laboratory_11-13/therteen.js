class Task {
        constructor(id, title, isCompleted = false) {
            this.id = id;
            this.title = title;
            this.isCompleted = isCompleted;
        }
    
        changeTitle(newTitle) {
            this.title = newTitle;
        }
    
        toggleCompletion() {
            this.isCompleted = !this.isCompleted;
        }
    }
    
    class Todolist {
        constructor(id, title) {
            this.id = id;
            this.title = title;
            this.tasks = [];
        }
    
        addTask(task) {
            this.tasks.push(task);
        }
    
        removeTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        }
    
        filterTasks(isCompleted) {
            return this.tasks.filter(task => task.isCompleted === isCompleted);
        }
    }
    
    const todoList = new Todolist(1, "Мой список дел");
    
    function addTask() {
    const taskTitle = document.getElementById('taskTitle').value.trim();
    
    if (taskTitle) {
        const taskId = todoList.tasks.length + 1;
        const newTask = new Task(taskId, taskTitle);
        todoList.addTask(newTask);
        document.getElementById('taskTitle').value = '';
        renderTasks();
    } else {
        
        alert('Введите текст задачи');
        
        document.getElementById('taskTitle').focus();
    }
}
    
    function renderTasks(filter = 'all') {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
    
        let tasksToRender = todoList.tasks;
        if (filter === 'completed') {
            tasksToRender = todoList.filterTasks(true);
        } else if (filter === 'notCompleted') {
            tasksToRender = todoList.filterTasks(false);
        }
    
        tasksToRender.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onclick="toggleCompletion(${task.id})">
                <span class="task-title">${task.title}</span>
                <div>
                    <button class="edit-btn" onclick="editTask(${task.id})">Редактировать</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Удалить</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }
    
    function toggleCompletion(taskId) {
        const task = todoList.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleCompletion();
            renderTasks();
        }
    }
    
    function deleteTask(taskId) {
        todoList.removeTask(taskId);
        renderTasks();
    }
    
    function editTask(taskId) {
    let newTitle = prompt('Введите новое название задачи:');
    
    if (newTitle !== null) {
        newTitle = newTitle.trim();
        if (newTitle) {
            const task = todoList.tasks.find(task => task.id === taskId);
            if (task) {
                task.changeTitle(newTitle);
                renderTasks();
            }
        } else {
            alert('Название задачи не может быть пустым');
        }
    }
}
    
    function filterTasks(filter) {
        renderTasks(filter);
    }
    
    document.addEventListener('DOMContentLoaded', renderTasks);