async function apiGetVehicleWithId(id) {
    return await fetch("http://localhost:8080/vehicles/" + id)
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
    if (data.success) {
        window.location.href = "../vehicles/vehicles.html";
    }
}

async function formAddReservation() {
    event.preventDefault();
    const idClient = document.getElementById("idClient").value;
    const idVehicule = document.getElementById("vehiculeChooseId").value;
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


function deleteBookVehicleLocal() {
    localStorage.removeItem("bookVehicle")
}


function getBookVehicleLocal() {
    let local = localStorage.getItem("bookVehicle")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteBookVehicleLocal()
        window.location.href = "../../../index.html";
    }
}


function displayVehicle(data) {
    data.forEach(element => {
        document.getElementById("vehiculeChoose").value = element.model
    });
}

async function bookVehicle() {
    try {
        let bookVehicle = getBookVehicleLocal();
        document.getElementById("vehiculeChooseId").value = bookVehicle
        displayVehicle(await apiGetVehicleWithId(bookVehicle))
    } catch (error) {
        deleteBookVehicleLocal()
        window.location.href = "../../../index.html";
    }
}

bookVehicle()