//const newRelative = 'https://aplicacionhospitalencasa.herokuapp.com/auxiliar/nuevoFamiliar';
const newRelative = 'http://127.0.0.1:8000/auxiliar/nuevoFamiliar';

function validate_letter(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validate_id(val) {
    if (Number(val) > 0)
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

    const id = document.registro.id.value.trim();
    const nombres = document.registro.nombres.value.trim();
    const apellidos = document.registro.apellidos.value.trim();
    const celular = document.registro.celular.value.trim();
    const email = document.registro.email.value.trim();
    const password = document.registro.password.value.trim();
    const parentesco = document.registro.parentesco.value.trim();
    const idPaciente = document.registro.idPaciente.value.trim();

    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    result = validate_id(id);
    if (!result) {
        alert('id no es válida');
        return;
    }
    result = validate_letter(nombres);
    if (!result) {
        alert('Nombre no es válido');
        return;
    }
    result = validate_letter(apellidos);
    if (!result) {
        alert('Apellido no es válido');
        return;
    }
    result = validate_letter(parentesco);
    if (!result) {
        alert('Apellido no es válido');
        return;
    }
    result = validate_amount(nombres);
    if (!result) {
        alert('El nombre no es válido. Debe tener menos de 50 caracteres.');
        return;
    }
    result = validate_amount(apellidos);
    if (!result) {
        alert('El apellido no es válido. Debe tener menos de 50 caracteres.');
        return;
    }
    result = validate_amount(parentesco);
    if (!result) {
        alert('El apellido no es válido. Debe tener menos de 50 caracteres.');
        return;
    }


    const familiar = {
        id: id,
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        email: email,
        password: password,
        isAdmin: false,
        parentesco: parentesco,
        idPaciente: idPaciente,
    }
    console.log(familiar);
    const dataToSend = JSON.stringify(familiar);
    saveRelative(dataToSend);
}

function saveRelative(data) {
    // Petición HTTP
    fetch(newRelative, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            handleSuccess();
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            handleError();
        });
}

function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Familiar creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el familiar. Intente luego.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.registro.addEventListener("submit", collectData);