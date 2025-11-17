async function apiGetClientWithId(id) {
    return await fetch("http://localhost:8080/clients/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiPutClient(id, data) {
    return await fetch("http://localhost:8080/clients/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        mode: 'cors'
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

function getClientLocal() {
    let local = localStorage.getItem("client")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteClientLocal()
        window.location.href = "index.html";
    }
}

function deleteClientLocal() {
    localStorage.removeItem("client")
}

function clientData(data) {
    data.forEach(element => {
        console.log(element)
        document.getElementById("id").value = element.id
        document.getElementById("firstNameClient").value = element.firstName
        document.getElementById("LastNameClient").value = element.lastName
        document.getElementById("birthdayClient").value = element.birthday
        document.getElementById("obtainingLicense").value = element.obtaining_license
        document.getElementById("numberLicenseClient").value = element.numberLicense
    });
}


async function editMainClient() {
    try {
        let client = getClientLocal();
        let dataClient = await apiGetClientWithId(client)
        clientData(dataClient)
    } catch (error) {
        deleteClientLocal()
        window.location.href = "../../../index.html";
    }
}

editMainClient()


async function displayResultClient(data) {
    alert(data.message)
    deleteClientLocal()
    window.location.href = "../dashboard.html";
}


async function formEditClient() {
    event.preventDefault();
    const id = document.getElementById("id").value
    const firstName = document.getElementById("firstNameClient").value;
    const lastName = document.getElementById("LastNameClient").value;
    const birthday = document.getElementById("birthdayClient").value;
    const obtaining_license = document.getElementById("obtainingLicense").value;
    const numberLicense = document.getElementById("numberLicenseClient").value;
    const clientData = {
        firstName,
        lastName,
        birthday,
        obtaining_license,
        numberLicense
    };
    await displayResultClient(await apiPutClient(id, clientData));
}