# Contributor Guide for Web To-Do List

Este archivo describe los pasos que cada **contributor** debe seguir para participar en el proyecto **Web To-Do List**, junto con el flujo de trabajo y los roles.

---

## 1. Puntos de la Exposición Teórica (para revisar)

1. **¿Qué es Git y qué es GitHub?**  
   - Git: sistema de control de versiones distribuido para gestionar el historial de tu código localmente.  
   - GitHub: plataforma en la nube que aloja repositorios Git y facilita colaboración remota.

2. **Diferencia entre Git y GitHub**  
   - Git es la herramienta de versionado; GitHub es el servicio online que añade funcionalidades sociales (issues, PRs, CI/CD).

3. **Importancia del control de versiones**  
   - Registrar el historial de cambios y poder volver a versiones anteriores.  
   - Trabajo simultáneo sin pisar cambios.  
   - Rastreabilidad de autor y tiempo de cada modificación.

4. **Conceptos clave**  
   - **Branch (rama)**: línea independiente de desarrollo.  
   - **Commit**: instantánea de cambios con mensaje descriptivo.  
   - **Pull Request**: propuesta de fusión de una rama en otra con revisión y discusión.  
   - **Merge Conflict**: conflictos cuando dos ramas modifican las mismas líneas; se resuelven editando manualmente los marcadores `<<<<<<<`.

5. **Trabajo colaborativo**  
   - Cada contributor trabaja en su fork, crea ramas de feature, envía PR y espera revisión.  
   - Revisión de PRs por el Owner: comentarios, ajustes y merge.

6. **Convenciones de codificación**  
   - Nomenclatura uniforme (`feature/`, `fix/`), mensajes de commit con Conventional Commits.  
   - Organización de carpetas (`index.html`, `styles.css`, `app.js`).

---

## 2. Exposición Práctica: Flujo CRUD y Merge Conflict

### 2.1. Preparación del Mock API

- Crear recurso `tasks` en MockAPI.io con campos:
  - `id` (auto)  
  - `text` (string)  
  - `done` (boolean)
- Base URL: `https://<TU_ID>.mockapi.io/api/v1/tasks`

### 2.2. Ramas de desarrollo (una por cada acción)

| Rama                        | Acción CRUD / Demo                   |
|-----------------------------|--------------------------------------|
| `feature/bootstrap-ui`      | Estructura inicial (HTML/CSS/JS)     |
| `feature/create-task`       | Crear tarea (`POST`)                 |
| `feature/read-tasks`        | Listar tareas (`GET`)                |
| `feature/update-task`       | Actualizar tarea (`PUT`)             |
| `feature/delete-task`       | Eliminar tarea (`DELETE`)            |
| `feature/merge-conflict-demo` | Demo y resolución de merge conflict |

Para crear una rama:
```bash
# Desde main actualizado:
git switch main
# Crear rama para tu feature:
git switch -c feature/<tu-acción>
```

### 2.3. Workflow en Equipo (5 Personas)

1. **Owner** (tú):  
   - Crea el repo `web-todo` y añade README, .gitignore, CONTRIBUTING.md y este CONTRIBUTOR.md.  
   - Protege la rama `main` para exigir PRs.

2. **Contributors** (4 compañeros): se asignan rotativamente a las ramas de la sección 2.2.  
   - Desarrollan solo la funcionalidad asignada.  
   - `git add .`, `git commit -m "feat: descripción"` y `git push origin <rama>`.  
   - Abren PR y solicitan revisión.

3. **Merge Conflict Demo**:  
   - Dos ramas cambian la misma línea en `styles.css`.  
   - Se fusiona la primera, luego al fusionar la segunda aparece el conflicto.  
   - Resolver editando `<<<<<<<`, elegir/combiar cambios, `git add` y `git commit`.

4. **Rotación de Roles**:  
   - Tras cada feature, se rota quién es Owner y quién Contributor para que todos experimenten ambos roles.

---

Al finalizar, cada contributor habrá aprendido a:
- Clonar el repo y configurar `upstream`.  
- Crear ramas y aislar funcionalidades.  
- Realizar commits atómicos con mensajes claros.  
- Hacer push y abrir Pull Requests.  
- Revisar PRs y resolver merge conflicts.

¡Gracias por contribuir a **Web To-Do List**! 🎉
