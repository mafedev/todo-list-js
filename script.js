const lista = document.getElementById("lista");

// Escucha cuando se hace click, para luego tomar ese valor
document.getElementById("boton-agregar").addEventListener("click", () => {
  const input = document.getElementById("input");
  const inputValue = input.value.trim(); // Para que no acepte espacios en blanco
  if (inputValue === "") return;

  const tarea = document.createElement("li");
  const texto = document.createTextNode(inputValue); // nodo de texto

  // Botón para eliminar la tarea
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "-";
  botonEliminar.className = "btn-eliminar";

  // Botón para marcar la tarea como completada
  const botonCompletar = document.createElement("button");
  botonCompletar.className = "btn-completar";

  // Lógica para eliminar la tarea
  botonEliminar.addEventListener("click", () => {
    lista.removeChild(tarea); // Si se da click sobre el botón, elimina la tarea de la lista
  });

  // Lógica para completar la tarea
  botonCompletar.addEventListener('click', () => {
    tarea.classList.toggle('completada'); // Si se da click sobre el botón, la marca como completada
  });

  // Se agregan los elementos
  tarea.appendChild(botonCompletar);
  tarea.appendChild(texto);
  tarea.appendChild(botonEliminar);
  lista.appendChild(tarea);

  input.value = ""
});
