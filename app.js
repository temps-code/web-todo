const API_URL = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

async function listarTareas() {
  try {
    const response = await fetch(API_URL);
    const tareas = await response.json();

    const lista = document.getElementById("taskList");
    lista.innerHTML = "";

    tareas.forEach((tarea) => {
      const item = document.createElement("li");
      item.textContent = `${tarea.text} - ${
        tarea.done ? "✔️ Completada" : "❌ Pendiente"
      }`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
}

listarTareas();
