async function apiPostClient(data) {
    return await fetch("http://localhost:8080/clients", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        mode: 'cors'
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function displayResultClient(data) {
    alert(data.message)
    if (data.success) {
        window.location.href = "../dashboard.html";
    }
}

async function formAddClient() {
    event.preventDefault();
    const first_name = document.getElementById("firstNameClient").value
    const last_name = document.getElementById("LastNameClient").value;
    const birthday = document.getElementById("birthdayClient").value;
    const number_license = document.getElementById("numberLicenseClient").value;
    const obtaining_license = document.getElementById("obtainingLicense").value;
    const clientData = {
        first_name,
        last_name,
        birthday,
        number_license,
        obtaining_license
    };
    await displayResultClient(await apiPostClient(clientData));
}