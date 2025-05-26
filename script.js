const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const alumnoEditIndex = document.getElementById("editIndex");


document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value;

    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date) {
        alert("Error: ingrese los datos correctamente");
        return;
    }

    const student = { name, lastName, grade, date };//date, para tomar la fecha del formulario//

    if (alumnoEditIndex.value=== "") {
        // Add new student
        students.push(student);
        addStudentToTable(student);
    }    else{
        const index = parseInt(alumnoEditIndex.value);
        students[index] = student;
        updateStudentRow(index, student);
        alumnoEditIndex.value = ""; // Clear the edit index after updating
        
    }
    calcularPromedio();
    this.reset();
});

function addStudentToTable(student, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td><button onclick="editStudent(${index})">Editar</button></td>
        <td><button onclick="deleteStudent(${index})">Eliminar</button></td>
    `;
            
            

    tableBody.appendChild(row);
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso: N/A";
        return;
    }
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const prom = total / students.length;
    averageDiv.textContent = `Promedio General del Curso: ${prom.toFixed(2)}`;
}