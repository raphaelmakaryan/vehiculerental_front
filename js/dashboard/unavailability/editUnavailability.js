async function apiPutUnavailability(id, data) {
    return await fetch("http://localhost:8080/unavailability/" + id, {
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

async function apiGetUnavailabilityWithId(id) {
    return await fetch("http://localhost:8080/unavailability/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}


function deleteUnavailabilityLocal() {
    localStorage.removeItem("unavailability")
}


function getUnavailabilityLocal() {
    let local = localStorage.getItem("unavailability")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteUnavailabilityLocal()
        window.location.href = "index.html";
    }
}

async function displayResultUnv(data) {
    alert(data.message)
    if (data.success) {
        window.location.href = "../dashboard.html";
    }
}

function displaySelectType(data) {
    let compare = data[0].typeVehicle
    let allChoice = ["Car", "Motorcycle", "Utility"]
    let select = document.getElementById("typeForVehicle")
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < allChoice.length; j++) {
            if (data[i] == allChoice[j]) {
                select.innerHTML += `
        <option value="${compare.toLowerCase()}" selected>${compare}</option>
    `;
            } else {
                select.innerHTML += `
        <option value="${allChoice[j].toLowerCase()}">${allChoice[j]}</option>
    `;
            }
        }
    }
}

function displayData(data) {
    data.forEach(element => {
        document.getElementById("descVehicle").value = element.description
        document.getElementById("timeVehicle").value = element.time
    });
}

async function editUnavailability() {
    try {
        let unavailability = getUnavailabilityLocal();
        let data = await apiGetUnavailabilityWithId(unavailability)
        document.getElementById("id").value = unavailability
        displaySelectType(data)
        displayData(data)
    } catch (error) {
        deleteUnavailabilityLocal()
        window.location.href = "../../../index.html";
    }
}


async function formEditUnavailability() {
    event.preventDefault();
    const id = document.getElementById("id").value
    const typeVehicle = document.getElementById("typeForVehicle").value
    const description = document.getElementById("descVehicle").value;
    const time = parseInt(document.getElementById("timeVehicle").value);
    const unavailabilityData = {
        typeVehicle,
        description,
        time
    };
    await displayResultUnv(await apiPutUnavailability(id, unavailabilityData));
}


editUnavailability()