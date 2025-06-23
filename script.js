const input = document.getElementById("input");
const lista = document.getElementById("lista");

// Escucha cuando se hace click, para luego tomar ese valor
document.getElementById("boton-agregar").addEventListener("click", () => {
  const value = input.value.trim(); // Para que no acepte espacios en blanco

  if (value != "") {
    agregarTarea(value);
    input.value = "";
  }
});

function agregarTarea(input) {
  const tarea = {
    id: Date.now(),
    texto: input,
    estado: "incompleta",
    fechaCreacion: null,
  };

  let tareas = leerTareas();
  tareas.push(tarea);
  guardarTareas(tareas);

  const tareaLi = document.createElement("li");
  tareaLi.dataset.id = tarea.id;

  const btnEliminar = document.createElement("button"); // Botón para eliminar la tarea
  btnEliminar.textContent = "-";
  btnEliminar.className = "btn-eliminar";

  const btnCompletar = document.createElement("button"); // Botón para marcar la tarea como completada
  btnCompletar.className = "btn-completar";

  // Lógica para eliminar la tarea
  btnEliminar.addEventListener("click", () => {
    eliminarTarea(tareaLi);
  });

  // Lógica para completar la tarea
  btnCompletar.addEventListener("click", () => {
    completarTarea(tareaLi);
  });

  // Agregar los elementos
  tareaLi.appendChild(btnCompletar);
  tareaLi.appendChild(document.createTextNode(" " + tarea.texto + " "));
  tareaLi.appendChild(btnEliminar);
  lista.appendChild(tareaLi);
}

function eliminarTarea(tarea) {
  lista.removeChild(tarea);

  let tareas = leerTareas();
  tareas = tareas.filter((t) => t.id !== Number(tarea.dataset.id));
  guardarTareas(tareas);
}

function completarTarea(tarea) {
  tarea.classList.toggle("completada");

  let tareas = leerTareas();
  // Busca la tarea por id y cambia su estado
  tareas = tareas.map((t) =>
    t.id === Number(tarea.dataset.id)
      ? {
          ...t,
          estado: t.estado === "completada" ? "incompleta" : "completada",
        }
      : t
  );
}

function leerTareas() {
  const tareasGuardadas = localStorage.getItem("tareas");
  if (!tareasGuardadas) return [];
  try {
    return JSON.parse(tareasGuardadas);
  } catch {
    return [];
  }
}

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderiza las tareas guardadas al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const tareas = leerTareas();
  tareas.forEach((tarea) => {
    const tareaLi = document.createElement("li");
    tareaLi.dataset.id = tarea.id;
    if (tarea.estado === "completada") tareaLi.classList.add("completada");

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "-";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.addEventListener("click", () => eliminarTarea(tareaLi));

    const btnCompletar = document.createElement("button");
    btnCompletar.className = "btn-completar";
    btnCompletar.addEventListener("click", () => completarTarea(tareaLi));

    tareaLi.appendChild(btnCompletar);
    tareaLi.appendChild(document.createTextNode(" " + tarea.texto + " "));
    tareaLi.appendChild(btnEliminar);
    lista.appendChild(tareaLi);
  });
});