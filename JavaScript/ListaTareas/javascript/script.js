const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const tasksList = document.getElementById("tasks-list");
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("La tarea no puede estar vacía");
        return;
    }

    addTask(taskText);
    taskInput.value = "";
});

function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    tasksList.appendChild(li);
}
function addTask(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");

    // Marcar como completada
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    // Borrar tarea
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    tasksList.appendChild(li);
}
