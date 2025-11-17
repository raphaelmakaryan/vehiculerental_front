async function apiGetReservationWithId(id) {
    return await fetch("http://localhost:8080/reservations/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetVehicle() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetClient() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

function getReservationLocal() {
    let local = localStorage.getItem("reservation")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteReservationLocal()
        window.location.href = "index.html";
    }
}

async function apiPutReservation(id, data) {
    return await fetch("http://localhost:8080/reservations/" + id, {
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

function deleteReservationLocal() {
    localStorage.removeItem("reservation")
}

function clientData(data) {
    data.forEach(element => {
        document.getElementById("id").value = element.id
        document.getElementById("idClient").value = element.idClient
        document.getElementById("startReservation").value = element.startReservation
        document.getElementById("endReservation").value = element.endReservation
        document.getElementById("estimatedKm").value = element.estimatedKm
        document.getElementById("priceReservation").value = element.priceReservation
    });
}

function vehicleData(dataAll, dataUser) {
    if (dataAll.length >= 1 && dataUser) {
        let container = document.getElementById("idVehicle")
        dataAll.forEach(element => {
            container.innerHTML += `
            <option value="${element.id}">${element.model}</option>
           `;
        });
    }
}

async function editMainReservation() {
    try {
        let reservation = getReservationLocal();
        let dataReservation = await apiGetReservationWithId(reservation)
        await clientData(dataReservation)
        await vehicleData(await apiGetVehicle(), dataReservation[0].idVehicule)
    } catch (error) {
        deleteReservationLocal()
        window.location.href = "../../../index.html";
    }
}

editMainReservation()


async function displayResultReservation(data) {
    alert(data.message)
    deleteReservationLocal()
    window.location.href = "../dashboard.html";
}


async function formEditReservation() {
    event.preventDefault();
    const id = document.getElementById("id").value
    const idClient = document.getElementById("idClient").value;
    const idVehicule = document.getElementById("idVehicle").value;
    const startReservation = document.getElementById("startReservation").value;
    const endReservation = document.getElementById("endReservation").value;
    const estimatedKm = document.getElementById("estimatedKm").value;
    const priceReservation = document.getElementById("priceReservation").value;
    const reservationData = {
        idClient,
        idVehicule,
        startReservation,
        endReservation,
        estimatedKm,
        priceReservation
    };
    await displayResultReservation(await apiPutReservation(id, reservationData));
}