//const loginUrl = 'https://aplicacionhospitalencasa.herokuapp.com/login';
const loginUrl = 'http://127.0.0.1:8000/login';


function collectData(evt) {
    evt.preventDefault();

    const correo = document.login.correo.value.trim();
    const clave = document.login.clave.value.trim();


    const paciente = {
        correo: correo,
        clave: clave
    }

    console.log(paciente);
    const dataToSend = JSON.stringify(paciente);
    console.log(dataToSend)
    login(dataToSend);
}

function login(data) {
    // Petición HTTP
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok || response.status == 401)
        return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            if (data.includes("Credenciales inválidas")){
                handleError(data)
            }
            handleSuccess(JSON.parse(data));
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            handleError(error.message);
        });
}

function handleSuccess(data) {  
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Ingreso exitoso. Accediendo a su información...";
    const info = document.getElementById("info");
    info.appendChild(message);
    window.location.href = './paciente.html?id='+ data.id;
}

function handleError(err) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    if(err)
        message.innerText = err;
    else
        message.innerText = "No se pudo cargar la información. Intente más tarde.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.login.addEventListener("submit", collectData);