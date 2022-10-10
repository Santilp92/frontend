//const getDoctorUrl = 'https://aplicacionhospitalencasa.herokuapp.com/doctor/';
const getDoctorUrl = 'http://127.0.0.1:8000/doctor/';


function getDoctor() {
  // const parsedUrl =new URL (window.location.href)
  // const id = parsedUrl.searchParams.get("id")
  // console.log(id)
  //const id = 2;
  // Petición HTTP
  const id = sessionStorage.getItem("personaId");
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  console.log("Aca entre el otro archivo: " + accessToken);
  console.log("Aca entre el otro archivo: " + refreshToken);
  console.log(id)


  fetch(getDoctorUrl + id, {
    headers:{
      "Authorization": "Bearer " + accessToken
    }
  })
    .then(response => {
      console.log(response);
      if (response.ok || response.status == 400)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      if (data.includes("No existe doctor con esta cédula")){
        handleError(data)
      }
      patient = JSON.parse(data);
      handleDoctor(patient);
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handleDoctor(persona) {
  const personInfo = document.createElement('div')
  personInfo.innerHTML = `
     <h3>Cedula: ${persona.id}</h4>
     <h3>Nombre: ${persona.nombres}</h3>
     <h3>Apellido: ${persona.apellidos}</h3>
     <h3>Correo: ${persona.email}</h3>
     <h3>Telefono: ${persona.celular}</h3>
     <h3>Direccion: ${persona.doctor.registro}</h3>
     <h3>Direccion: ${persona.doctor.especialidad}</h3>
  `
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-doctor");
  info.appendChild(personInfo);
}

function handleError(err) {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  if(err)
    message.innerText = err;
  else
    message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-doctor");
  info.appendChild(message);
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", getDoctor);