//const updateRelative = 'https://aplicacionhospitalencasa.herokuapp.com/actualizarFamiliar/';
const updateRelative = 'http://127.0.0.1:8000/actualizarFamiliar/';

const userId = sessionStorage.getItem("personaId");
//console.log(userId);


function collectData(evt) {
    evt.preventDefault();

    const celular = document.actualizar.celular.value.trim();
    const email = document.actualizar.email.value.trim();
    const password = document.actualizar.password.value.trim(); 
    const parentesco = document.actualizar.parentesco.value.trim();

    const familiar = {}
    if(celular){
        familiar.celular = celular;
    }
    if (email){
        familiar.email = email;
    }
    if (password){
        familiar.password = password;
    }
    if (parentesco){
        familiar.parentesco = parentesco;
    }
        
    console.log(familiar);
    const dataToSend = JSON.stringify(familiar);
    console.log(dataToSend)
    update(dataToSend);
}

function update(data) {
    const accessToken = sessionStorage.getItem("accessToken");

    // Petición HTTP
    fetch(updateRelative + userId, {
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
    window.location.href = './familiar.html?id=' + userId;
}

function showOldData(){
    const oldCelular = sessionStorage.getItem("celular");
    const oldEmail = sessionStorage.getItem("email");
    const oldParentesco = sessionStorage.getItem('parentesco');

    document.actualizar.celular.placeholder = oldCelular;
    document.actualizar.email.placeholder = oldEmail;
    document.actualizar.parentesco.placeholder = oldParentesco;
}

// --------------------
document.actualizar.addEventListener("submit", collectData);
document.addEventListener('DOMContentLoaded', showOldData);
