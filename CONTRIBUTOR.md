# Guia para Contributors de Web To-Do List

Este documento está dirigido exclusivamente a los **contributors** que colaborarán en el proyecto **Web To-Do List**. Aquí encontrarás el flujo de trabajo, las ramas de desarrollo y las pautas para enviar tus cambios.

---

## 1. Configuración inicial

1. **Clona tu fork** (o el repositorio si tienes permisos de escritura directa). Puedes usar:
   ```bash
   # Con Git tradicional:
   git clone https://github.com/<tu-usuario>/web-todo.git

   # O (recomendado) con GitHub CLI para mayor facilidad:
   gh repo clone <tu-usuario>/web-todo

   cd web-todo
   ```
2. **Configura el upstream** (solo si trabajas con fork):
   ```bash
   git remote add upstream https://github.com/<owner-usuario>/web-todo.git
   git fetch upstream
   ```

---

## 2. Flujo de trabajo por rama

Para cada funcionalidad, sigue este patrón:

1. **Actualiza `main`**:
   ```bash
   git switch main
   git pull upstream main  # o `git pull origin main` si no usas fork
   ```
2. **Crea una rama específica**:
   ```bash
   git switch -c feature/<acción>  # ejemplo: feature/create-task
   ```
3. **Desarrolla tu feature**:
   - Implementa solo la funcionalidad asignada.
   - Mantén commits atómicos y claros.
     ```bash
     git add <archivos>
     git commit -m "feat: descripción clara de tu cambio"
     ```
4. **Envía tus cambios al remoto**:
   ```bash
   git push origin feature/<acción>
   ```
5. **Abre un Pull Request** en GitHub:
   - Base: `owner-usuario/web-todo:main`  
   - Compare: tu rama `feature/<acción>`  
   - Título: breve y descriptivo (`feat: create task endpoint`)  
   - Descripción: explica qué hace tu cambio y cómo probarlo.

---

## 3. Ramas de desarrollo (una por cada acción CRUD)

| Rama                          | Acción                          |
|-------------------------------|---------------------------------|
| `feature/bootstrap-ui`        | Estructura inicial (HTML/CSS/JS)|
| `feature/create-task`         | Crear tarea (`POST /tasks`)     |
| `feature/read-tasks`          | Listar tareas (`GET /tasks`)    |
| `feature/update-task`         | Actualizar tarea (`PUT /tasks/:id`) |
| `feature/delete-task`         | Eliminar tarea (`DELETE /tasks/:id`) |
| `feature/merge-conflict-demo` | Demo y resolución de merge conflict |

---

## 4. Resolución de Merge Conflicts

Si al hacer merge o al actualizar tu rama aparecen conflictos:

1. Git marcará el archivo con secciones:
   ```diff
   <<<<<<< HEAD
   (tu código)
   =======
   (código en main)
   >>>>>>> main
   ```
2. Edita manualmente para elegir o combinar cambios.
3. Marca el conflicto como resuelto:
   ```bash
   git add <archivo>
   git commit -m "fix: resolver merge conflict en <archivo>"
   git push origin feature/<acción>
   ```

---

## 5. Buenas prácticas

- **Commits atómicos**: cada commit debe contener un solo cambio lógico.  
- **Mensajes claros**: sigue [Conventional Commits](https://www.conventionalcommits.org/).  
- **PRs pequeñas**: facilita la revisión.  
- **Sincroniza frecuentemente**: actualiza `main` antes de crear ramas y antes de abrir PR.

---

¡Gracias por tu aporte al proyecto **Web To-Do List**! 🎉
