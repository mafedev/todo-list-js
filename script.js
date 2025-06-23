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

  const tareaLi = document.createElement("li");

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
}

function completarTarea(tarea) {
  tarea.classList.toggle("completada");
}
