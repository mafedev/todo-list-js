// --------- AGREGAR TAREA ---------
const input = document.getElementById("input"); // Input para agregar tareas
const lista = document.getElementById("lista"); // Lista donde se mostrarán las tareas

// Agregar la tarea al hacer click en el botón
document.getElementById("boton-agregar").addEventListener("click", () => {
  const value = input.value.trim(); // Para que no acepte espacios en blanco

  if (value != "") {
    agregarTarea(value);
    input.value = ""; // Limpiar el input después de agregar la tarea
  }
});

// Agregar la tarea pulsando el Enter
document.getElementById("input").addEventListener("keypress", function (e){
  if(e.key == "Enter"){
    document.getElementById("boton-agregar").click();
  }
});

// Lógica para agregar una tarea
// Crea un objeto tarea y lo guarda en localStorage
function agregarTarea(input) {
  const tarea = {
    id: Date.now(),
    texto: input,
    estado: "incompleta",
    fechaCreacion: null,
  };

  let tareas = leerTareas(); // Leer las tareas guardadas
  tareas.push(tarea); // Agregar la nueva tarea al array
  guardarTareas(tareas); // Guardar las tareas actualizadas
  filtrarTareas(select.value); // Filtrar las tareas según el estado seleccionado
}

// Lógica para eliminar una tarea
// Elimina la tarea del array y actualiza localStorage
function eliminarTarea(tarea) {
  let tareas = leerTareas(); 
  tareas = tareas.filter((t) => t.id !== Number(tarea.dataset.id)); // Filtrar las tareas para eliminar la seleccionada
  guardarTareas(tareas); // Guardar las tareas actualizadas
  filtrarTareas(select.value); // Filtrar las tareas según el estado seleccionado
}

// Lógica para completar una tarea
// Cambia el estado de la tarea entre "completada" e "incompleta"
function completarTarea(tarea) {
  let tareas = leerTareas();

  tareas = tareas.map((t) => { // Iterar sobre las tareas
    if (t.id === Number(tarea.dataset.id)) { // Buscar la tarea por su ID
      const nuevoEstado = t.estado === "completada" ? "incompleta" : "completada"; // Cambiar el estado de la tarea, si es "completada" pasa a "incompleta" y viceversa

      // Cambiar clase visual en el botón dependiendo del estado
      const btnCompletar = tarea.querySelector(".btn-completar");
      if (nuevoEstado === "completada") {
        tarea.classList.add("completada");
        btnCompletar.classList.add("completada-btn");
      } else {
        tarea.classList.remove("completada");
        btnCompletar.classList.remove("completada-btn");
      }

      return { ...t, estado: nuevoEstado }; // Devuelve la tarea con el nuevo estado
    }
    return t;
  });

  guardarTareas(tareas);
  filtrarTareas(select.value);
}

// Lógica para leer tareas
function leerTareas() {
  const tareasGuardadas = localStorage.getItem("tareas"); // se obtienen las tareas guardadas en localStorage
  if (!tareasGuardadas) return []; // Si no hay tareas guardadas, retorna un array vacío
  try { // Intenta parsear las tareas guardadas
    return JSON.parse(tareasGuardadas); // Si el parseo es exitoso, retorna las tareas
  } catch {
    return []; // Si no, retorna un array vacío
  }
}

// Lógica para guardar tareas
function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas)); // Guarda las tareas en localStorage como un string JSON
}

// --------- FILTRAR TAREAS ---------
// Se ejecuta al cambiar el select de estado
const select = document.getElementById("select-estado");
select.addEventListener("change", () => { // Al cambiar el select, se filtran las tareas
  filtrarTareas(select.value); // Se pasa el valor del select a la función filtrarTareas
});

// Lógica para filtrar las tareas según el estado seleccionado
function filtrarTareas(estadoSelect) {
  const tareas = leerTareas(); // Leer las tareas guardadas
  lista.innerHTML = ""; // Limpiar la lista antes de mostrar las tareas filtradas

  if (estadoSelect != "todas") { // Si el estado seleccionado no es "todas"
    tareas.forEach((tarea) => {
      if (estadoSelect == tarea.estado) { // Si el estado de la tarea coincide con el seleccionado
        crearElementos(tarea);  // Crear los elementos de la tarea
      }
    });
  } else { // Si el estado seleccionado es "todas"
    tareas.forEach((tarea) => {
      crearElementos(tarea); // Crear los elementos de la tarea sin filtrar
    });
  }
}

// Lógica para crear los elementos de la tarea
function crearElementos(tarea){
  const tareaLi = document.createElement("li");
  tareaLi.dataset.id = tarea.id;

  // Botón para eliminar tarea
  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn-eliminar";
  btnEliminar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
    <g clip-path="url(#clip0_35_24)">
      <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
    <g clip-path="url(#clip0_35_22)">
      <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg>
`;

  btnEliminar.addEventListener("click", () => eliminarTarea(tareaLi));

  // Botón para completar tarea
  const btnCompletar = document.createElement("button");
  btnCompletar.className = "btn-completar";

  if (tarea.estado === "completada") {
    tareaLi.classList.add("completada");
    btnCompletar.classList.add("completada-btn");
  }

  btnCompletar.addEventListener("click", () => completarTarea(tareaLi));

  // Texto de la tarea (editable)
  const spanTexto = document.createElement("span");
  spanTexto.textContent = tarea.texto;
  spanTexto.style.cursor = "pointer";

  // Evento para editar al hacer click
  spanTexto.addEventListener("click", function () {
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = tarea.texto;
    inputEdit.className = "input-editar";
    inputEdit.style.width = "70%";
    spanTexto.replaceWith(inputEdit);
    inputEdit.focus();

    // Guardar al presionar Enter o perder foco
    function guardarEdicion() {
      const nuevoTexto = inputEdit.value.trim(); // Para evitar que se guarde un texto vacío
      if (nuevoTexto && nuevoTexto !== tarea.texto) { // Si el nuevo texto no está vacío y es diferente al original
        editarTarea(tarea.id, nuevoTexto); // Actualizar la tarea en localStorage
      }
      // Restaurar el texto (sea que cambió o no)
      inputEdit.replaceWith(spanTexto); // Reemplazar el input por el span de texto
      spanTexto.textContent = nuevoTexto || tarea.texto; // Si el nuevo texto está vacío, se mantiene el texto original
    }

    inputEdit.addEventListener("blur", guardarEdicion);
    inputEdit.addEventListener("keydown", function(e){
      if (e.key === "Enter") {
        inputEdit.blur();
      }
    });
  });

  // Agregar elementos
  tareaLi.appendChild(btnCompletar);
  tareaLi.appendChild(document.createTextNode(" "));
  tareaLi.appendChild(spanTexto);
  tareaLi.appendChild(document.createTextNode(" "));
  tareaLi.appendChild(btnEliminar);
  lista.appendChild(tareaLi);
}

// Para editar tarea en localStorage
function editarTarea(id, nuevoTexto) {
  let tareas = leerTareas();
  tareas = tareas.map(t => // Si la tarea tiene el ID que se quiere editar
    t.id === id ? { ...t, texto: nuevoTexto } : t // Retorna la tarea con el nuevo texto, o la tarea sin cambios
  );
  guardarTareas(tareas);
  filtrarTareas(select.value);
}

// Renderiza las tareas guardadas al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  filtrarTareas(select.value);
});
