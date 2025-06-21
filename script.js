const lista = document.getElementById("lista");

// Escucha cuando se hace click, para luego tomar ese valor
document.getElementById("botonAgregar").addEventListener("click", () => {
  const input = document.getElementById("input").value;

  const tarea = document.createElement("li");
  tarea.textContent = input;

  lista.appendChild(tarea);
});
