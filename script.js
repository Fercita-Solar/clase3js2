// Array para almacenar los alumnos
const students = [];
// Referencias a elementos del DOM
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const editIndexInput = document.getElementById("editIndex");
const form = document.getElementById("studentForm");

// Evento para manejar el envío del formulario
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores de los inputs
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value;

    // Validación de datos
    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date) {
        alert("Error: Por favor, ingrese todos los datos correctamente. La nota debe ser entre 1 y 7.");
        return;
    }

    // Crear objeto alumno
    const student = { name, lastName, grade, date };

    // Si editIndexInput está vacío, agregamos nuevo alumno
    if (editIndexInput.value === "") {
        students.push(student);
    } else {
        // Si no, actualizamos el alumno existente
        const idx = parseInt(editIndexInput.value);
        students[idx] = student;
        editIndexInput.value = ""; // Limpiar el índice de edición
    }

    renderTable();      // Actualizar la tabla
    calcularPromedio(); // Calcular el promedio
    form.reset();       // Limpiar el formulario
});

// Función para mostrar todos los alumnos en la tabla
function renderTable() {
    tableBody.innerHTML = ""; // Limpiar tabla
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td>${formatDate(student.date)}</td>
            <td><button class="editBtn" onclick="editStudent(${index})">Actualizar</button></td>
            <td><button class="deleteBtn" onclick="deleteStudent(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para editar un alumno (carga los datos en el formulario)
window.editStudent = function(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;
    editIndexInput.value = index; // Guardar el índice para actualizar
};

// Función para eliminar un alumno
window.deleteStudent = function(index) {
    if (confirm("¿Estás seguro que deseas eliminar este alumno?")) {
        students.splice(index, 1);
        renderTable();
        calcularPromedio();
    }
};

// Función para calcular y mostrar el promedio general
function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const prom = total / students.length;
    averageDiv.textContent = `Promedio General del Curso: ${prom.toFixed(2)}`;
}

// Función para formatear la fecha a formato local (dd-mm-aaaa)
function formatDate(dateStr) {
    const date = new Date(dateStr);
    // Si la fecha es inválida, retorna el string original
    if (isNaN(date)) return dateStr;
    // Opcional: mostrar también la hora actual al guardar
    const now = new Date();
    const hora = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('es-CL') + " " + hora;
}

// Inicializar tabla y promedio al cargar
renderTable();
calcularPromedio();