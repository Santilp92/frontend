const getPatientUrl = 'https://aplicacionhospitalencasa.herokuapp.com/auxiliar/paciente/';
//const getPatientUrl = 'http://127.0.0.1:8000/auxiliar/paciente/';


function getPatients() {
  const parsedUrl =new URL (window.location.href)
  const id = parsedUrl.searchParams.get("id")
  console.log(id)
  //const id = 2;
  // Petición HTTP
  fetch(getPatientUrl + id)
    .then(response => {
      console.log(response);
      if (response.ok || response.status == 400)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      if (data.includes("No existe paciente con esta cédula")){
        handleError(data)
      }
      patient = JSON.parse(data);
      handlePatient(patient);
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handlePatient(person) {
  const personInfo = document.createElement('div')
  personInfo.innerHTML = `
     <h3>Cedula: ${person.id}</h4>
     <h3>Nombre: ${person.nombres}</h3>
     <h3>Apellido: ${person.apellidos}</h3>
     <h3>Telefono: ${person.celular}</h3>
     <h3>Direccion: ${person.paciente[0].direccion}</h3>
     <h3>Ciudad: ${person.paciente[0].ciudad}</h3>
     <h3>Fecha nacimiento: ${person.paciente[0].fechaNacimiento}</h3>
     <h3>Paciente numero: ${person.paciente[0].numPaciente}</h3>
     <h3>Id doctor: ${person.paciente[0].idDoctor}</h3>
  `
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-paciente");
  info.appendChild(personInfo);
  
  // const personInfo = `
  //   <tr>
  //   <td>${person.id}</td>
  //   <td>${person.nombres}</td>
  //   <td>${person.apellidos}</td>
  //   <td>${person.celular}</td>
  //   <td>${person.paciente[0].direccion}</td>
  //   <td>${person.paciente[0].ciudad}</td>
  //   <td>${person.paciente[0].fechaNacimiento}</td>
  //   <td>${person.paciente[0].numPaciente}</td>
  //   <td>${person.paciente[0].idDoctor}</td>
  //   <tr>
  // `
  // document.getElementById("cargando").remove();
  // const info = document.getElementById("info-paciente");

  // const table = document.createElement("table");
  // table.innerHTML = `
  //   <tr>
  //     <th>Cédula</th>
  //     <th>Nombre</th>
  //     <th>Apellido</th>
  //     <th>Dirección</th>
  //     <th>Ciudad</th>
  //     <th>Celular</th>
  //     <th>Fecha de nacimiento</th>
  //     <th>Paciente número</th>
  //     <th>Id doctor asignado</th>
  //   </tr>`;
  // table.innerHTML += personInfo;
  // info.appendChild(table);
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

//-----------------------------------

document.addEventListener("DOMContentLoaded", getPatients);