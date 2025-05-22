// URL única para todas las operaciones
const API_URL = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

// SELECTORES
const addBtn        = document.getElementById("addBtn");
const taskInput     = document.getElementById("taskInput");
const taskList      = document.getElementById("taskList");
const deleteByIdBtn = document.getElementById("deleteByIdBtn");
const deleteIdInput = document.getElementById("deleteIdInput");

// FUNCIONALIDAD: leer tareas
async function listarTareas() {
  try {
    const response = await fetch(API_URL);
    const tareas   = await response.json();
    taskList.innerHTML = "";

    tareas.forEach((tarea) => {
      const item = document.createElement("li");
      item.className = "list-group-item d-flex justify-content-between align-items-center";

      item.innerHTML = `
        <span>${tarea.text} - ${tarea.done ? "✔️ Completada" : "❌ Pendiente"}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${tarea.id}')">Eliminar</button>
      `;

      taskList.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
}

// FUNCIONALIDAD: crear tarea
async function createTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Por favor, escribe una tarea.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ text: taskText, done: false })
    });

    if (!response.ok) throw new Error("Error al crear tarea");
    await response.json();
    taskInput.value = "";               // limpiar input
    alert("Tarea agregada correctamente ✅");
    listarTareas();                     // refrescar lista
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al agregar la tarea ❌");
  }
}

// FUNCIONALIDAD: eliminar tarea
async function deleteTask(id) {
  const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar tarea");
    alert("Tarea eliminada correctamente ✅");
    listarTareas(); // refrescar lista
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    alert("Hubo un error al eliminar la tarea ❌");
  }
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
  deleteIdInput.value = ""; // limpiar input después de eliminar
});

// Al cargar la página, listamos tareas
listarTareas();
