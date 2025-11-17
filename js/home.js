async function apiGetVehicle() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}


async function apiPostReservation(data) {
    return await fetch("http://localhost:8080/reservations", {
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

async function displayResultReservation(data) {
    alert(data.message)
    location.reload()
}

async function formAddReservation() {
    event.preventDefault();
    const idClient = document.getElementById("idClient").value;
    const idVehicule = document.getElementById("vehiculeChoose").value;
    const startReservation = document.getElementById("startReservation").value;
    const endReservation = document.getElementById("endReservation").value;
    const estimatedKm = document.getElementById("estimatedKm").value;
    const reservationData = {
        idClient,
        idVehicule,
        startReservation,
        endReservation,
        estimatedKm
    };
    await displayResultReservation(await apiPostReservation(reservationData));
}


function displayVehicle(data) {
    if (data.length >= 1) {
        let container = document.getElementById("vehiculeChoose")
        data.forEach(element => {
            container.innerHTML += `
            <option value="${element.id}">${element.model}</option>
           `;
        });
    }
}

async function vehicle() {
    displayVehicle(await apiGetVehicle())
}

vehicle()