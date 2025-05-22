# Guía para Contributors de Web To-Do List

Este documento está dirigido exclusivamente a los **contributors** que colaborarán en el proyecto **Web To-Do List**. Encontrarás el flujo de trabajo, cómo sincronizar tu fork y ramas, así como las pautas para enviar y mantener actualizados tus cambios.

---

## 1. Configuración inicial

1. **Clona tu fork** (o el repositorio si tienes permisos de escritura directa). Puedes usar:
   ```bash
   # Con Git tradicional:
   git clone https://github.com/<tu-usuario>/web-todo.git

   # O (recomendado) con GitHub CLI:
   gh repo clone <tu-usuario>/web-todo

   cd web-todo
   ```
2. **Configura el upstream** (solo si trabajas con fork):
   ```bash
   git remote add upstream https://github.com/<owner-usuario>/web-todo.git
   git fetch upstream
   ```

---

## 2. Sincronizar tu fork con el repositorio original

Antes de empezar nuevos cambios y periódicamente para mantener tu fork actualizado:

1. Trae los cambios del original:
   ```bash
   git fetch upstream
   ```
2. Cámbiate a tu rama principal local:
   ```bash
   git switch main
   ```
3. Incorpora los cambios de `upstream/main` a tu `main`:
   ```bash
   # Con merge:
   git merge upstream/main

   # O con rebase para historial lineal:
   git rebase upstream/main
   ```
4. Envía tu `main` actualizado a tu fork:
   ```bash
   git push origin main
   ```

> **Tip:** Si tu fork está muy desfasado, usa rebase y luego:
> ```bash
> git push --force-with-lease origin main
> ```

---

## 3. Sincronizar una rama específica

Para mantener tus ramas de feature alineadas con la misma rama en el original:

1. Trae cambios del original:
   ```bash
   git fetch upstream
   ```
2. Cámbiate a tu rama de trabajo:
   ```bash
   git switch feature/<tu-acción>
   ```
3. Fusiona o rebasea con la rama upstream:
   ```bash
   # Merge:
   git merge upstream/feature/<tu-acción>

   # Rebase (historial limpio):
   git rebase upstream/feature/<tu-acción>
   ```
4. Resolver posibles conflictos (ver sección de Merge Conflicts).
5. Push de la rama sincronizada:
   ```bash
   git push origin feature/<tu-acción>
   ```

---

## 4. Flujo de trabajo por rama

Para cada nueva funcionalidad sigue este patrón:

1. **Actualiza `main`** (ver sección 2).
2. **Crea una rama específica**:
   ```bash
   git switch -c feature/<acción>
   ```
3. **Desarrolla tu feature**:
   - Implementa solo la funcionalidad asignada.
   - Mantén commits atómicos y claros:
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
   - Título y descripción claros.

---

## 5. Ramas de desarrollo (una por cada acción CRUD)

| Rama                          | Acción                          |
|-------------------------------|---------------------------------|
| `feature/bootstrap-ui`        | Estructura inicial (HTML/CSS/JS)|
| `feature/create-task`         | Crear tarea (`POST /tasks`)     |
| `feature/read-tasks`          | Listar tareas (`GET /tasks`)    |
| `feature/update-task`         | Actualizar tarea (`PUT /tasks/:id`) |
| `feature/delete-task`         | Eliminar tarea (`DELETE /tasks/:id`) |
| `feature/merge-conflict-demo` | Demo y resolución de merge conflict |

---

## 6. Resolución de Merge Conflicts

Si al hacer merge, rebase o pull aparecen conflictos:

1. Git marca los archivos con:
   ```diff
   <<<<<<< HEAD
   (tu código)
   =======
   (código en main o upstream)
   >>>>>>> <rama>
   ```
2. Edita manualmente para elegir o combinar cambios.
3. Marca el archivo como resuelto:
   ```bash
   git add <archivo>
   ```
4. Si estabas en merge:
   ```bash
   git commit -m "fix: resolver merge conflict en <archivo>"
   ```
   Si estabas en rebase:
   ```bash
   git rebase --continue
   ```
5. Envía tu rama limpia:
   ```bash
   git push origin feature/<tu-acción>
   ```

---

## 7. Buenas prácticas

- **Commits atómicos**: un solo cambio lógico por commit.
- **Mensajes claros**: sigue [Conventional Commits](https://www.conventionalcommits.org/).
- **PRs pequeñas**: hacen la revisión más sencilla.
- **Sincroniza frecuentemente**: evita desfasajes y reduces conflictos.

---

¡Gracias por tu aporte al proyecto **Web To-Do List**! 🎉