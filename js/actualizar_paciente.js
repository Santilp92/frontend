//const updatePatient = 'https://aplicacionhospitalencasa.herokuapp.com/actualizar/';
const updatePatient = 'http://127.0.0.1:8000/actualizar/';

const userId = sessionStorage.getItem("personaId");
//console.log(userId);

function validate_letter(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validate_amount(val) {
    if (val.length <= 50)
        return true;
    else
        return false;
}

function collectData(evt) {
    evt.preventDefault();

    const celular = document.actualizar.celular.value.trim();
    const email = document.actualizar.email.value.trim();
    const password = document.actualizar.password.value.trim(); 
    const direccion = document.actualizar.direccion.value.trim();
    const ciudad = document.actualizar.ciudad.value.trim();

    let result = true;
    if (ciudad){
        result = validate_letter(ciudad);
        if (!result) {
            return;
        }
        result = validate_amount(ciudad);
        if (!result) {
            alert('Debe tener menos de 50 caracteres.');
            return;
        }
    }

    const paciente = {}

    if(celular){
        paciente.celular = celular;
    }
    if (email){
        paciente.email = email;
    }
    if (password){
        paciente.password = password;
    }
    if (direccion){
        paciente.direccion = direccion;
    }
    if (ciudad){
        paciente.ciudad = ciudad;
    }
    
    //console.log(paciente);
    const dataToSend = JSON.stringify(paciente);
    //console.log(dataToSend)
    update(dataToSend);
}

function update(data) {
    const accessToken = sessionStorage.getItem("accessToken");

    // Petición HTTP
    fetch(updatePatient + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: data
    })
        .then(response => {
            //console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            //console.log(data);
            alert('Datos actualizados.');
            goBack();
        })
        .catch(error => {
            //console.error("ERROR: ", error.message);
            alert('Error al actualizar datos')
            goBack();
        });
}

function goBack(){
    window.location.href = './paciente.html?id=' + userId;
}

function showOldData(){
    const oldCelular = sessionStorage.getItem("celular");
    const oldEmail = sessionStorage.getItem("email");
    const oldDireccion = sessionStorage.getItem("direccion");
    const oldCiudad = sessionStorage.getItem("ciudad");

    document.actualizar.celular.placeholder = oldCelular;
    document.actualizar.email.placeholder = oldEmail;
    document.actualizar.direccion.placeholder = oldDireccion;
    document.actualizar.ciudad.placeholder = oldCiudad ;
}

// --------------------
document.actualizar.addEventListener("submit", collectData);
document.addEventListener('DOMContentLoaded', showOldData);
