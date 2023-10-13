//obtener la informacion del DOM
//Campos compartidos entre pacientes y medicos
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const especialidad = document.getElementById("especialidad");
//campo propio de medicos
const consultorio = document.getElementById("consultorio");
const correo = document.getElementById("correo");
//campos propios de los pacientes
const edad = document.getElementById("edad");
//llamado de los formularios
const formularioMedicos = document.getElementById("registro-medicos-form");
const formularioPacientes = document.getElementById("registro-pacientes-form");

class Usuario{
    constructor(nombres, apellidos, cedula, telefono, especialidad ){
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.cedula=cedula;
        this.especialidad=especialidad;
        this.telefono=telefono;

    }
}

const mostrarMedicos = function(){
    let medicos = [];
    let cuerpoTabla = document.getElementById("cuerpo-tabla-medicos")
    let localMedicos = localStorage.getItem("medicos");
    if(localMedicos){
        medicos = JSON.parse(localMedicos);
    }
    medicos.forEach(medico => {
        let fila = document.createElement("tr");
        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdaCedula = fila.insertCell();
        let celdaConsultorio = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaCorreo = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaPaciente = fila.insertCell();

        celdaNombres.textContent = medico.nombres;
        celdaApellidos.textContent = medico.apellidos;
        celdaCedula.textContent = medico.cedula;
        celdaConsultorio.textContent = medico.consultorio;
        celdaTelefono.textContent = medico.telefono;
        celdaCorreo.textContent = medico.correo;
        celdaEspecialidad.textContent = medico.especialidad;
        celdaPaciente.textContent = "Sin Asignar";

        cuerpoTabla.appendChild(fila);
        
    });
}

const mostrarPacientes = function(){
    let pacientes = [];
    let cuerpoTabla = document.getElementById("cuerpo-tabla-pacientes");
    let localPacientes = localStorage.getItem("pacientes");
    if(localPacientes){
        pacientes = JSON.parse(localPacientes);
    }
    pacientes.forEach(paciente => {
        let fila = document.createElement("tr");
        let celdaNombres = fila.insertCell();
        let celdaApellidos = fila.insertCell();
        let celdaCedula = fila.insertCell();
        let celdaEdad = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        let celdaEspecialidad = fila.insertCell();
        let celdaMedico = fila.insertCell();

        celdaNombres.textContent = paciente.nombres;
        celdaApellidos.textContent = paciente.apellidos;
        celdaCedula.textContent = paciente.cedula;
        celdaEdad.textContent = paciente.edad;
        celdaTelefono.textContent = paciente.telefono;
        celdaEspecialidad.textContent = paciente.especialidad;
        celdaMedico.textContent = "Sin Asignar";

        cuerpoTabla.appendChild(fila);
        
    });
}


if(window.location.href.endsWith("listado-medicos.html")){
    mostrarMedicos();
}

if(window.location.href.endsWith("listado-pacientes.html")){
    mostrarPacientes();
}

if(window.location.href.endsWith("registro-medicos.html")){
    //El evento para formularioMedicos va a ser de tipo submit o enviar.
formularioMedicos.addEventListener("submit", function(event){
    //Previene que la pagina se recarge, sin antes hacer la logica de addevenlistener
    event.preventDefault()

    let valorNombres = nombres.value;
    let valorApellidos = apellidos.value;
    let valorCedula = cedula.value;
    let valorConsultorio = consultorio.value;
    let valorTelefono = telefono.value;
    let valorCorreo = correo.value;
    let valorEspecialidad = especialidad.value;
    
    const medico = new Usuario(valorNombres, valorApellidos, valorCedula, valorEspecialidad, valorTelefono)
    medico.consultorio = valorConsultorio;
    medico.correo = valorCorreo;

    let medicos = [];

    let localMedicos = localStorage.getItem("medicos")
    // Si localMedicos no esta vacio lo convierte en objeto para hacer el push
    if(localMedicos){
        medicos = JSON.parse(localMedicos);
    }
    medicos.push(medico);
    localStorage.setItem("medicos", JSON.stringify(medicos));
    alert("medico registrado")
})
}

//Acceso al formulario pacientes
if(window.location.href.endsWith("registro-pacientes.html")){
    //El evento para formularioMedicos va a ser de tipo submit o enviar.
formularioPacientes.addEventListener("submit", function(event){
    //Previene que la pagina se recarge, sin antes hacer la logica de add event listener
    event.preventDefault()

    let valorNombres = nombres.value;
    let valorApellidos = apellidos.value;
    let valorCedula = cedula.value;
    let valorEdad = edad.value;
    let valorTelefono = telefono.value;
    let valorEspecialidad = especialidad.value;
    
    const paciente = new Usuario(
        valorNombres, 
        valorApellidos, 
        valorCedula,
        valorTelefono,
        valorEspecialidad);

    paciente.edad = valorEdad;

    let pacientes = [];

    let localPacientes = localStorage.getItem("pacientes")
    // Si localPacientes no esta vacio lo convierte en objeto para hacer el push
    if(localPacientes){
        pacientes = JSON.parse(localPacientes);
    }
    pacientes.push(paciente);
    //guardar la información de pacientes en local storage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    alert("paciente registrado")
})
}
