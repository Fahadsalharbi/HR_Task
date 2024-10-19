document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    const taskName = document.getElementById('task-name').value.trim();
    const taskPriority = document.getElementById('task-priority').value;

    if (taskName) {
        addTask(taskName, taskPriority);
        this.reset(); // إعادة تعيين النموذج بعد الإرسال
    }
});

function addTask(name, priority) {
    const taskList = document.getElementById('task-list');

    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td data-priority="${priority}">${getPriorityLabel(priority)}</td>`;

    taskList.appendChild(tr);

    saveTask(name, priority);
}

function getPriorityLabel(priority) {
    switch (priority) {
        case 'high':
            return 'مهم';
        case 'medium':
            return 'متوسط';
        case 'low':
            return 'عادي';
        default:
            return '';
    }
}

function saveTask(name, priority) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name, priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${task.name}</td><td data-priority="${task.priority}">${getPriorityLabel(task.priority)}</td>`;
        taskList.appendChild(tr);
    });
}
