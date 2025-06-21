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

  botonEliminar.addEventListener("click", () => {
    lista.removeChild(tarea);
  });

  // Se agregan los elementos
  tarea.appendChild(botonEliminar);
  tarea.appendChild(texto);
  lista.appendChild(tarea);

  input.value = ""
});
