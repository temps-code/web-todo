// URL única para todas las operaciones
const API_URL = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

// SELECTORES
const addBtn          = document.getElementById("addBtn");
const taskInput       = document.getElementById("taskInput");
const taskList        = document.getElementById("taskList");
const deleteByIdBtn   = document.getElementById("deleteByIdBtn");
const deleteIdInput   = document.getElementById("deleteIdInput");

// (Opcional) selectores para formulario de actualización por ID
const updateBtn       = document.getElementById("updateBtn");
const updateIdInput   = document.getElementById("updateIdInput");
const updateStatusSel = document.getElementById("updateStatusSelect");

/**
 * Listar tareas y renderizar
 */
async function listarTareas() {
  try {
    const res    = await fetch(API_URL);
    const tareas = await res.json();
    taskList.innerHTML = "";

    tareas.forEach(tarea => {
      const item = document.createElement("li");
      item.className = "list-group-item d-flex justify-content-between align-items-center";

      // Checkbox inline para actualizar estado
      const checkbox = `<input type="checkbox" ${tarea.done ? "checked" : ""} 
        onchange="toggleTaskStatus('${tarea.id}', this.checked)" />`;

      item.innerHTML = `
        <div>
          ${checkbox}
          <span class="${tarea.done ? "text-decoration-line-through" : ""}">
            ${tarea.text}
          </span>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${tarea.id}')">
          Eliminar
        </button>
      `;
      taskList.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
}

/**
 * Crear tarea
 */
async function createTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Por favor, escribe una tarea.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ text, done: false }),
    });
    if (!res.ok) throw new Error("Error al crear tarea");
    taskInput.value = "";
    alert("Tarea agregada ✅");
    listarTareas();
  } catch (err) {
    console.error(err);
    alert("Error al agregar la tarea ❌");
  }
}

/**
 * Eliminar tarea
 */
async function deleteTask(id) {
  if (!confirm("¿Eliminar esta tarea?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar");
    alert("Tarea eliminada ✅");
    listarTareas();
  } catch (err) {
    console.error(err);
    alert("Error al eliminar tarea ❌");
  }
}

/**
 * Actualizar estado de una tarea (PUT)
 */
async function toggleTaskStatus(id, done) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ done }),
    });
    if (!res.ok) throw new Error("Error al actualizar estado");
    listarTareas();
  } catch (err) {
    console.error(err);
    alert("Error al actualizar estado ❌");
  }
}

// (Opcional) Actualizar por formulario
if (updateBtn) {
  updateBtn.addEventListener("click", async () => {
    const id   = updateIdInput.value.trim();
    const done = updateStatusSel.value === "true";
    if (!id) {
      alert("Ingresa un ID válido.");
      return;
    }
    await toggleTaskStatus(id, done);
    updateIdInput.value = "";
  });
}

// EVENTOS
addBtn.addEventListener("click", createTask);
deleteByIdBtn.addEventListener("click", async () => {
  const id = deleteIdInput.value.trim();
  if (!id) {
    alert("Por favor, ingresa un ID válido.");
    return;
  }
  await deleteTask(id);
  deleteIdInput.value = "";
});

// Al cargar la página
listarTareas();
