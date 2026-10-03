let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}"
                  onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <button class="delete-btn"
                    onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("total").textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    document.getElementById("completed").textContent = completed;

    document.getElementById("pending").textContent =
        tasks.length - completed;
}

displayTasks();