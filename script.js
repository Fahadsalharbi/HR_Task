// تحميل المهام من localStorage عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadTasks);

// إضافة المهمة الجديدة
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

// دالة لإضافة المهمة
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;

    const task = {
        name: taskName,
        priority: taskPriority
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('task-name').value = ''; // تفريغ الحقل
    updateTable();
}

// دالة لتحميل المهام المخزنة عند فتح الصفحة
function loadTasks() {
    updateTable();
}

// دالة لتحديث الجدول بعد إضافة أو حذف مهمة
function updateTable() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    // تفريغ الجدول الحالي
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        
        // إنشاء عمود المهمة
        const taskCell = document.createElement('td');
        taskCell.textContent = task.name;
        row.appendChild(taskCell);

        // إنشاء عمود الأهمية
        const priorityCell = document.createElement('td');
        priorityCell.textContent = getPriorityText(task.priority);
        priorityCell.setAttribute('data-priority', task.priority);
        row.appendChild(priorityCell);

        // إنشاء عمود زر الحذف
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteTask(index);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // إضافة الصف إلى الجدول
        taskList.appendChild(row);
    });
}

// دالة لحذف المهمة
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTable(); // تحديث الجدول بعد الحذف
}

// دالة لتحويل قيمة الأولوية إلى نص قابل للقراءة
function getPriorityText(priority) {
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
