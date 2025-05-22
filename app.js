const apiUrl = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

const taskList = document.getElementById("taskList");

// Función para renderizar tareas con checkbox
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Checkbox para marcar done
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => updateTask(task.id, checkbox.checked));

    const span = document.createElement("span");
    span.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(span);

    taskList.appendChild(li);
  });
}

// Función para actualizar tarea (PUT)
async function updateTask(id, done) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    });

    if (!response.ok) throw new Error("Error al actualizar la tarea");

    console.log(`Tarea ${id} actualizada a done = ${done}`);
  } catch (error) {
    console.error(error);
  }
}

// Ejemplo: cargar tareas (puedes implementarlo luego)
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error(error);
  }
}

// Al cargar la página, traer tareas
fetchTasks();
