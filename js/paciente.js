//const getPatientUrl = 'https://aplicacionhospitalencasa.herokuapp.com/paciente/';
const getPatientUrl = 'http://127.0.0.1:8000/paciente/';


function getPatients() {
  const parsedUrl =new URL (window.location.href)
  const id = parsedUrl.searchParams.get("id")
  //console.log(id)
  //const id = 2;
  // Petición HTTP
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  // console.log("Aca entre el otro archivo: " + accessToken);
  // console.log("Aca entre el otro archivo: " + refreshToken);


  fetch(getPatientUrl + id, {
    headers:{
      "Authorization": "Bearer " + accessToken
    }
  })
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

function handlePatient(persona) {
  const personInfo = document.createElement('div')
  personInfo.innerHTML = `
     <h3>Cedula: ${persona.id}</h4>
     <h3>Nombre: ${persona.nombres}</h3>
     <h3>Apellido: ${persona.apellidos}</h3>
     <h3>Correo: ${persona.email}</h3>
     <h3>Telefono: ${persona.celular}</h3>
     <h3>Direccion: ${persona.paciente.direccion}</h3>
     <h3>Ciudad: ${persona.paciente.ciudad}</h3>
     <h3>Fecha nacimiento: ${persona.paciente.fechaNacimiento}</h3>
     <h3>Paciente numero: ${persona.paciente.numPaciente}</h3>
     <h3>Id doctor: ${persona.paciente.idDoctor}</h3>
  `
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-paciente");
  info.appendChild(personInfo);

  sessionStorage.setItem("celular", persona.celular);
  sessionStorage.setItem("email", persona.email);
  sessionStorage.setItem("direccion", persona.paciente.direccion);
  //console.log(persona.paciente.direccion);
  //console.log(persona.paciente.ciudad);
  sessionStorage.setItem("ciudad", persona.paciente.ciudad);
}

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