const apiURL = "https://682f9602f504aa3c70f4833b.mockapi.io/api/todo/task";

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");

async function createTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  const newTask = {
    text: taskText,
    done: false,
  };

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      const createdTask = await response.json();
      console.log("Tarea creada:", createdTask);
      taskInput.value = ""; // Limpiar el input
      alert("Tarea agregada correctamente ✅");
    } else {
      throw new Error("Error al crear tarea");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al agregar la tarea ❌");
  }
}

addBtn.addEventListener("click", createTask);
