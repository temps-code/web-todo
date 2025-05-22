const apiUrl = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

// Mostrar tareas con checkbox para marcar como hechas
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => {
      updateTask(task.id, checkbox.checked);
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.text));
    taskList.appendChild(li);
  });
}

// Actualizar tarea (PUT) en la API
async function updateTask(id, done) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });
    if (!response.ok) throw new Error("Error al actualizar la tarea");
    // Opcional: refrescar la lista para asegurarse que quedó actualizado
    fetchTasks();
  } catch (error) {
    console.error("Error en updateTask:", error);
  }
}

// Crear tarea (POST) en la API
async function createTask(text) {
  try {
    if (!text.trim()) return;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.trim(), done: false }),
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    taskInput.value = "";
    fetchTasks(); // Actualizar la lista
  } catch (error) {
    console.error("Error en createTask:", error);
  }
}

// Obtener tareas (GET) y mostrarlas
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
}

// Evento para el botón "Add Task"
addBtn.addEventListener("click", () => {
  createTask(taskInput.value);
});

// Cargar las tareas cuando se cargue la página
fetchTasks();
