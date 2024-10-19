document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // استرجاع بيانات المهمة
    const taskInput = document.getElementById('task-input').value;
    const priority = document.getElementById('priority-select').value;

    // إنشاء صف جديد للمهمة
    const tableBody = document.querySelector('#task-table tbody');
    const newRow = document.createElement('tr');

    // إضافة خلية المهمة
    const taskCell = document.createElement('td');
    taskCell.textContent = taskInput;
    newRow.appendChild(taskCell);

    // إضافة خلية الأولوية مع تلوينها حسب الأهمية
    const priorityCell = document.createElement('td');
    if (priority === 'high') {
        priorityCell.textContent = 'مهم';
        newRow.classList.add('priority-high');
    } else if (priority === 'medium') {
        priorityCell.textContent = 'متوسط';
        newRow.classList.add('priority-medium');
    } else {
        priorityCell.textContent = 'عادي';
        newRow.classList.add('priority-low');
    }
    newRow.appendChild(priorityCell);

    // إضافة زر الحذف
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'حذف';
    deleteButton.classList.add('delete-btn');
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);

    // إضافة الصف الجديد إلى الجدول
    tableBody.appendChild(newRow);

    // إعادة تعيين المدخلات بعد الإضافة
    document.getElementById('task-input').value = '';
    
    // إضافة حدث للحذف
    deleteButton.addEventListener('click', function() {
        tableBody.removeChild(newRow);
    });
});
