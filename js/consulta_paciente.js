//const getPatientUrl = 'https://aplicacionhospitalencasa.herokuapp.com/auxiliar/paciente/';
const getPatientUrl = 'http://127.0.0.1:8000/auxiliar/paciente/';


function getPatient() {
  const parsedUrl =new URL (window.location.href)
  const id = parsedUrl.searchParams.get("id")
  //console.log(id)
  //const id = 2;
  // Petición HTTP
  fetch(getPatientUrl + id)
    .then(response => {
      //console.log(response);
      if (response.ok || response.status == 400)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      //console.log("Datos: " + data);
      if (data.includes("No existe paciente con esta cédula")){
        handleError(data)
      }
      patient = JSON.parse(data);
      handlePatient(patient);
    })
    .catch(error => {
      //console.error("ERROR: ", error.message);
      handleError();
    });
}

function handlePatient(person) {
  const personInfo = `
    <tr>
    <td>${person.id}</td>
    <td>${person.nombres}</td>
    <td>${person.apellidos}</td>
    <td>${person.celular}</td>
    <td>${person.paciente.direccion}</td>
    <td>${person.paciente.ciudad}</td>
    <td>${person.paciente.fechaNacimiento}</td>
    <td>${person.paciente.numPaciente}</td>
    <td>${person.paciente.idDoctor}</td>
    <tr>
  `
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-paciente");

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Cédula</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Dirección</th>
      <th>Ciudad</th>
      <th>Celular</th>
      <th>Fecha de nacimiento</th>
      <th>Paciente número</th>
      <th>Id doctor asignado</th>
    </tr>`;
  table.innerHTML += personInfo;
  info.appendChild(table);
};

function handleError(err) {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  if(err)
    message.innerText = err;
  else
    message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-paciente");
  info.appendChild(message);
}

function collectData(evt){
  evt.preventDefault();

  const idDoctor = document.doctor.id.value;

  console.log(idDoctor)
  const paciente = {}
  if(idDoctor){
    paciente.idDoctor = idDoctor;
  }
  console.log(paciente);

   const dataToSend = JSON.stringify(paciente);
   console.log(dataToSend)
   updateDoctor(dataToSend);
}


function updateDoctor(data){ 
  //const getPatientUrl = 'https://aplicacionhospitalencasa.herokuapp.com/auxiliar/asignarDoctor/';
  const updateDoctorUrl = 'http://127.0.0.1:8000/auxiliar/asignarDoctor/'

  const parsedUrl =new URL (window.location.href)
  const id = parsedUrl.searchParams.get("id")
  console.log(id)
  console.log(data)

  fetch(updateDoctorUrl + id, {
    method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
  })
  
    .then(response => {
      //console.log(response);
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      //console.log("Datos: " + data);
      alert('Datos actualizados.');
      window.location.href = window.location.href;
    })
    .catch(error => {
      //console.error("ERROR: ", error.message);
      alert('Error al actualizar datos');
      window.location.href = window.location.href;
    });
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", getPatient);
document.doctor.addEventListener("submit", collectData);
