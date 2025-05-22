// URL única para todas las operaciones
const API_URL = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

// SELECTORES
const addBtn    = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList  = document.getElementById("taskList");

// FUNCIONALIDAD: leer tareas
async function listarTareas() {
  try {
    const response = await fetch(API_URL);
    const tareas   = await response.json();
    taskList.innerHTML = "";

    tareas.forEach((tarea) => {
      const item = document.createElement("li");
      item.textContent = `${tarea.text} - ${
        tarea.done ? "✔️ Completada" : "❌ Pendiente"
      }`;
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

// EVENTOS
addBtn.addEventListener("click", createTask);

// Al cargar la página, listamos tareas
listarTareas();
