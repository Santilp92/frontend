//const loginUrl = 'https://aplicacionhospitalencasa.herokuapp.com/login/';
const loginUrl = 'http://127.0.0.1:8000/login/';


function collectData(evt) {
    evt.preventDefault();

    const email = document.login.email.value.trim();
    const password = document.login.password.value.trim();


    const paciente = {
        email: email,
        password: password
    }

    //console.log(paciente);
    const dataToSend = JSON.stringify(paciente);
    //console.log(dataToSend)
    login(dataToSend);
}

function login(data) {
    // Petición HTTP
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    })
        .then(response => {
            //console.log(response);
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
    console.log(data.access);
    console.log(data.refresh);
    console.log(data.id)
    sessionStorage.setItem("accessToken", data.access);
    sessionStorage.setItem("refreshToken", data.refresh);
    sessionStorage.setItem("personaId", data.id);
    if (data.rol == "admin"){
        window.location.href = './auxiliar.html';
    } else if (data.rol == "paciente"){
        window.location.href = './paciente.html?id='+ data.id;
    } else if (data.rol == "familiar"){
        window.location.href = './familiar.html?id='+ data.id;
    } else if (data.rol == "doctor"){
        window.location.href = './doctor.html?id='+ data.id;
    }
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
