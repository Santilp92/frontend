//const getRelativeUrl = 'https://aplicacionhospitalencasa.herokuapp.com/familiar/';
const getRelativeUrl = 'http://127.0.0.1:8000/familiar/';


function getRelative() {
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


  fetch(getRelativeUrl + id, {
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
      if (data.includes("No existe paciente con esta cédula")){
        handleError(data)
      }
      relative = JSON.parse(data);
      handleRelative(relative);
    })
    .catch(error => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handleRelative(persona) {
  const personInfo = document.createElement('div')
  personInfo.innerHTML = `
     <h3>Cedula: ${persona.id}</h4>
     <h3>Nombre: ${persona.nombres}</h3>
     <h3>Apellido: ${persona.apellidos}</h3>
     <h3>Correo: ${persona.email}</h3>
     <h3>Telefono: ${persona.celular}</h3>
     <h3>Parentesco: ${persona.familiar.parentesco}</h3>
     <h3>Número de paciente: ${persona.familiar.numPaciente}</h3>
  `
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-paciente");
  info.appendChild(personInfo);

  sessionStorage.setItem("celular", persona.celular);
  sessionStorage.setItem("email", persona.email);
  sessionStorage.setItem("parentesco", persona.familiar.parentesco);
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

document.addEventListener("DOMContentLoaded", getRelative);