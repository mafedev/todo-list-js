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

// Agregar la tarea pulsando el Enter
document.getElementById("input").addEventListener("keypress", function (e){
  if(e.key == "Enter"){
    document.getElementById("boton-agregar").click();
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
  filtrarTareas(select.value);
}

function eliminarTarea(tarea) {
  //lista.removeChild(tarea);

  let tareas = leerTareas();
  tareas = tareas.filter((t) => t.id !== Number(tarea.dataset.id));
  guardarTareas(tareas);
  filtrarTareas(select.value);

}

function completarTarea(tarea) {
  // tarea.classList.toggle("completada");

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
  guardarTareas(tareas);
  filtrarTareas(select.value);
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

const select = document.getElementById("select-estado");
select.addEventListener("change", () => {
  filtrarTareas(select.value);
});

function filtrarTareas(estadoSelect){
  const tareas = leerTareas();
  lista.innerHTML = "";
  
  tareas.forEach(tarea => {
    if(estadoSelect == tarea.estado){
      crearElementos(tarea);
    }
  });

}

function crearElementos(tarea){
  
  const tareaLi = document.createElement("li");
  tareaLi.dataset.id = tarea.id;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "-";
  btnEliminar.className = "btn-eliminar";
  btnEliminar.addEventListener("click", () => eliminarTarea(tareaLi));

  const btnCompletar = document.createElement("button");
  btnCompletar.className = "btn-completar";
  btnCompletar.addEventListener("click", () => completarTarea(tareaLi));

  agregarElementos(tarea, tareaLi, btnEliminar, btnCompletar);
}

// Agregar los elementos
function agregarElementos(tarea, tareaLi, btnEliminar, btnCompletar) {
  tareaLi.appendChild(btnCompletar);
  tareaLi.appendChild(document.createTextNode(" " + tarea.texto + " "));
  tareaLi.appendChild(btnEliminar);
  lista.appendChild(tareaLi);
}

// Renderiza las tareas guardadas al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  filtrarTareas(select.value);

});
