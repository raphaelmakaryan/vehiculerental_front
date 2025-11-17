async function apiGetReservation() {
    return await fetch("http://localhost:8080/reservations")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetClientWithId(id) {
    return await fetch("http://localhost:8080/clients/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetVehicleWithId(id) {
    return await fetch("http://localhost:8080/vehicles/" + id)
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

async function apiGetClients() {
    return await fetch("http://localhost:8080/clients")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetMaintenance() {
    return await fetch("http://localhost:8080/maintenance")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetUnavailability() {
    return await fetch("http://localhost:8080/unavailability")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function transformData(data) {
    let newData = []
    for (let index = 0; index < data.length; index++) {
        let dataClient = await apiGetClientWithId(data[index].idClient)
        let dateVehicle = await apiGetVehicleWithId(data[index].idVehicule)

        let id = data[index].id
        let clientName = `${dataClient[0].firstName} ${dataClient[0].lastName}`
        let vehiculeName = dateVehicle[0].model
        let estimatedKm = data[index].estimatedKm
        let startReservation = data[index].startReservation
        let endReservation = data[index].endReservation
        let priceReservation = data[index].priceReservation
        let json = {
            id,
            clientName,
            vehiculeName,
            estimatedKm,
            startReservation,
            endReservation,
            priceReservation
        }
        newData.push(json)
    }
    return newData
}

/*
function displayReservation(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfReservation")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
      <td>${element.clientName}</td>
      <td>${element.vehiculeName}</td>
      <td>${element.estimatedKm} km</td>
      <td>${element.startReservation}</td>
      <td>${element.endReservation}</td>
            <td>${element.priceReservation} €</td>
      <td style="display:flex;flex-direction:column;align-items:center">
      <a href="reservations/editReservation.html">
      <button class="edit" style="margin-bottom:5px;" onclick="editReservation(${element.id})">Modifier</button>
      </a>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
      </td>`;
        });
    }
}
*/


function displayReservation(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfReservation")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
      <td>${element.clientName}</td>
      <td>${element.vehiculeName}</td>
      <td>${element.estimatedKm} km</td>
      <td>${element.startReservation}</td>
      <td>${element.endReservation}</td>
            <td>${element.priceReservation} €</td>
      <td style="display:flex;flex-direction:column;align-items:center">
      <button class="edit" style="margin-bottom:5px;" onclick="editReservation(${element.id})">Modifier</button>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
      </td>`;
        });
    }
}

function displayVehicle(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfVehicles")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.type}</td>
            <td>${element.model}</td>
            <td>${element.color}</td>
            <td>${element.cylinder}</td>
            <td>${element.horsePower}</td>
            <td>${element.volume}</td>
            <td>${element.registration}</td>
            <td>${element.defaultPrice}</td>
            <td>${element.pricePerKilometer}</td>
            <td>
      <button class="edit" style="margin-bottom:5px;">Modifier</button>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
            </td>`
                ;
        });
    }
}

function displayClients(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfClients")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.numberLicense}</td>
            <td>${element.birthday}</td>
            <td>${element.obtaining_license}</td>
            <td>
      <button class="edit" style="margin-bottom:5px;">Modifier</button>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
            </td>`
                ;
        });
    }
}

function displayMaintenance(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfMaintenance")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.idVehicule}</td>
            <td>${element.idUnavailability}</td>
            <td>
      <button class="edit" style="margin-bottom:5px;">Modifier</button>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
            </td>`
                ;
        });
    }
}

function displayUnavailability(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfUnavailability")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.typeVehicle}</td>
            <td>${element.description}</td>
            <td>${element.time} days</td>
            <td>
      <button class="edit" style="margin-bottom:5px;">Modifier</button>
      <button class="delete" style="margin-top:5px;">Supprimer</button>
            </td>`
                ;
        });
    }
}

async function allData() {
    displayReservation(await transformData(await apiGetReservation()))
    displayVehicle(await apiGetVehicle())
    displayClients(await apiGetClients())
    displayMaintenance(await apiGetMaintenance())
    displayUnavailability(await apiGetUnavailability())
}

function editReservation(id) {
    if (localStorage.getItem("reservation") === null) {
        localStorage.setItem("reservation", id)
    }
    window.location.href = "reservations/editReservation.html";
}

allData()