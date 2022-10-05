const newDoctor = 'https://aplicacionhospitalencasa.herokuapp.com/auxiliar/nuevoDoctor';
//const newDoctor = 'http://127.0.0.1:8000/auxiliar/nuevoDoctor';

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
    const registro = document.registro.registro.value.trim();
    const especialidad = document.registro.especialidad.value.trim();

    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
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
    result = validate_letter(especialidad);
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
    result = validate_amount(especialidad);
    if (!result) {
        alert('El apellido no es válido. Debe tener menos de 50 caracteres.');
        return;
    }


    const doctor = {
        id: id,
        nombres: nombres,
        apellidos: apellidos,
        celular: celular,
        registro: registro,
        especialidad: especialidad,
    }
    console.log(doctor);
    const dataToSend = JSON.stringify(doctor);
    saveDoctor(dataToSend);
}

function saveDoctor(data) {
    // Petición HTTP
    fetch(newDoctor, {
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
    message.innerText = "Doctor creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el doctor. Intente luego.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.registro.addEventListener("submit", collectData);