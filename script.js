const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

let studentEditingIndex = null;

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastName || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar Datos")
        return
    }

 if (studentEditingIndex !== null) {
        students[studentEditingIndex] = { name, lastName, grade };
        studentEditingIndex = null; // salir del modo edición
    } else {
        const student = { name, lastName, grade };
        students.push(student);
    }

    actualizarTabla(); // actualiza toda la tabla
    calcularPromedio();
    actualizarEstadisticas(); 
    this.reset();
});

function actualizarTabla() {
    tableBody.innerHTML = ""; // borrar todo
    students.forEach((student) => {
        addStudentToTable(student);
    });
}

//Funcion para Que los datos se pongan en la tabla
function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="delete-btm">Eliminar</button>
        <button class="editar-btm">Editar</button></td>`;

//Se Agrega boton delete para eliminar datos
    row.querySelector(".delete-btm").addEventListener("click",function(){
        deleteEstudiante(student,row);
    });
    row.querySelector(".editar-btm").addEventListener("click",function(){
        editarEstudiante(student,row);
    });
    
    tableBody.appendChild(row);
}

//funcion para eliminar estudiante
function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index>-1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
        actualizarEstadisticas(); 
       
    }
}

function editarEstudiante(student) {
    const index = students.indexOf(student);
    if (index > -1) {
        document.getElementById("name").value = student.name;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("grade").value = student.grade;
        studentEditingIndex = index;
    }
}


//funcion para calcular el promedio de notas
function calcularPromedio(){
    if (students.length==0){
        averageDiv.textContent="Promedio General del Curso : N/A"
        return
    }
    const total=students.reduce((sum,student)=>sum +student.grade,0);
    const prom=total/students.length;

    averageDiv.textContent="Promedio General del Curso : "+prom.toFixed(2)
}

function actualizarEstadisticas() {
    const total = students.length;
    const aprobados = students.filter(student => student.grade >= 4).length;
    const reprobados = students.filter(student => student.grade < 4).length;

    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = `
        <p>Total de estudiantes: ${total}</p>
        <p>Cantidad de aprobados: ${aprobados}</p>
        <p>Cantidad de reprobados: ${reprobados}</p>
    `;
}