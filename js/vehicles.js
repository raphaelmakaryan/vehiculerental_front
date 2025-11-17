async function apiGetVehicle() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}


function displayVehicle(data) {
    if (data.length >= 1) {
        displayCar(data)
        displayMoto(data)
        displayUtility(data)
    }
}

function displayCar(data) {
    let exemples = ["Small, economical and comfortable city car.", "A comfortable and elegant car for all your journeys."]
    let container = document.getElementById("mainVehicleCar")
    let newIndex = 0
    for (let index = 0; index < data.length; index++) {
        if (data[index].type === "car") {
            container.innerHTML += `
                <div class="vehicle-card">
                    <img src="../../assets/${data[index].model}.png" alt="">
                    <h3>${data[index].model}</h3>
                    <p>${exemples[newIndex]}</p>
                    <button onclick="chooseBookVehicle(${data[index].id})">To book</button>
                </div>
            `;
            newIndex++
        }
    }
}

function displayMoto(data) {
    let exemples = ["Agile and fast for urban and road journeys.", "Sporty and comfortable, perfect for adventure."]
    let container = document.getElementById("mainVehicleMoto")
    let newIndex = 0
    for (let index = 0; index < data.length; index++) {
        if (data[index].type === "motorcycle") {
            container.innerHTML += `
                <div class="vehicle-card">
                    <img src="../../assets/${data[index].model}.png" alt="">
                    <h3>${data[index].model}</h3>
                    <p>${exemples[newIndex]}</p>
                    <button onclick="chooseBookVehicle(${data[index].id})">To book</button>
                </div>
            `;
            newIndex++
        }
    }
}

function displayUtility(data) {
    let exemples = ["Perfect for transporting your goods easily.", "Large volume, ideal for moving or delivery."]
    let container = document.getElementById("mainVehicleUtilities")
    let newIndex = 0
    for (let index = 0; index < data.length; index++) {
        if (data[index].type === "utility") {
            container.innerHTML += `
                <div class="vehicle-card">
                    <img src="../../assets/${data[index].model}.png" alt="">
                    <h3>${data[index].model}</h3>
                    <p>${exemples[newIndex]}</p>
                    <button onclick="chooseBookVehicle(${data[index].id})">To book</button>
                </div>
            `;
            newIndex++
        }
    }
}
async function vehicle() {
    displayVehicle(await apiGetVehicle())
}


function chooseBookVehicle(id) {
    if (localStorage.getItem("bookVehicle") === null) {
        localStorage.setItem("bookVehicle", id)
    }
    window.location.href = "./reservationsVehicles.html";
}

vehicle()