//const getDocPatientsUrl = 'https://aplicacionhospitalencasa.herokuapp.com/doctor/pacientes/';
const getDocPatientsUrl = 'http://127.0.0.1:8000/doctor/pacientes/';

const id = sessionStorage.getItem("personaId");
const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");
console.log("Aca entre el otro archivo: " + id);
console.log("Aca entre el otro archivo: " + accessToken);
console.log("Aca entre el otro archivo: " + refreshToken);

patients = [];

function getPatients() {
  fetch(getDocPatientsUrl + id, {
    headers:{
      "Authorization": "Bearer " + accessToken
    }
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
      patients = JSON.parse(data);
      handlePatients();
    })
    .catch(error => {
      //console.error("ERROR: ", error.message);
      handleError();
    });
}

function handlePatients() {
  const divs = [];
  patients.forEach((pat) => {
    const patData = `
      <tr><td>${pat.id}</td>
      <td>${pat.nombres}</td>
      <td>${pat.apellidos}</td></tr>
      `;
    divs.push(patData);
  });
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-pacientes");

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>cedula</th>
      <th>Nombre</th>
      <th>Apellido</th>
    </tr>`;
  divs.forEach(div => table.innerHTML += div);
  info.appendChild(table);
}

function handleError() {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-customers");
  info.appendChild(message);
}

//-----------------------------------

document.addEventListener("DOMContentLoaded", getPatients);