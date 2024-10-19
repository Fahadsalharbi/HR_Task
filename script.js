document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskTableBody = document.querySelector('#task-table tbody');

    // استرجاع المهام من Local Storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => addTaskToTable(task));

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const task = {
            name: taskInput.value,
            priority: prioritySelect.value
        };

        addTaskToTable(task);
        storedTasks.push(task); // إضافة المهمة إلى المصفوفة
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // حفظ المهام في Local Storage
        
        taskInput.value = ''; // إعادة تعيين المدخلات
    });

    function addTaskToTable(task) {
        const newRow = document.createElement('tr');

        const taskCell = document.createElement('td');
        taskCell.textContent = task.name;
        newRow.appendChild(taskCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority === 'high' ? 'مهم' : task.priority === 'medium' ? 'متوسط' : 'عادي';
        if (task.priority === 'high') {
            newRow.classList.add('priority-high');
        } else if (task.priority === 'medium') {
            newRow.classList.add('priority-medium');
        } else {
            newRow.classList.add('priority-low');
        }
        newRow.appendChild(priorityCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف';
        deleteButton.classList.add('delete-btn');
        deleteCell.appendChild(deleteButton);
        newRow.appendChild(deleteCell);

        taskTableBody.appendChild(newRow);

        deleteButton.addEventListener('click', function() {
            taskTableBody.removeChild(newRow);
            // حذف المهمة من Local Storage
            const index = storedTasks.indexOf(task);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        });
    }
});
