async function apiGetVehicleWithId(id) {
    return await fetch("http://localhost:8080/vehicles/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiPutVehicle(id, data) {
    return await fetch("http://localhost:8080/vehicles/" + id, {
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

function deleteVehicleLocal() {
    localStorage.removeItem("vehicle")
}

function getVehicleLocal() {
    let local = localStorage.getItem("vehicle")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteVehicleLocal()
        window.location.href = "index.html";
    }
}


function typeDisplayVehicle() {
    let select = document.getElementById("typeForVehicle").value
    let cylinderDiv = document.getElementById("cylinder")
    let cylinderData = document.getElementById("cylinderVehicle")
    let volumeDiv = document.getElementById("volume")
    let volumeData = document.getElementById("volumeVehicle")
    switch (select) {
        case "utility":
            cylinderDiv.style.display = "none"
            cylinderData.removeAttribute("required", "");
            volumeDiv.style.display = "block"
            volumeData.setAttribute("required", "");

            break;
        case "motorcycle":
            cylinderDiv.style.display = "block"
            cylinderData.setAttribute("required", "");
            volumeDiv.style.display = "none"
            volumeData.removeAttribute("required", "");
            break;

        default:
            cylinderDiv.style.display = "none"
            cylinderData.removeAttribute("required", "");
            volumeDiv.style.display = "none"
            volumeData.removeAttribute("required", "");
            break;
    }
}

function vehicleData(data) {
    data.forEach(element => {
        document.getElementById("id").value = element.id
        document.getElementById("modelVehicle").value = element.model
        document.getElementById("colorVehicle").value = element.color
        document.getElementById("registrationVehicle").value = element.registration
        document.getElementById("horsepowerVehicle").value = element.horsePower
        document.getElementById("pricePerKilometerVehicle").value = element.pricePerKilometer
        document.getElementById("cylinderVehicle").value = element.cylinder
        document.getElementById("volumeVehicle").value = element.volume

        const typeSelect = document.getElementById("typeForVehicle");
        if (element.type) {
            typeSelect.value = element.type.toLowerCase();
        }

        typeDisplayVehicle();
    });
}

async function displayResultVehicle(data, type) {
    switch (type) {
        case "err":
            alert(data)
            break;

        case "edit":
            alert(data.message)
            window.location.href = "../dashboard.html";
            break;
    }

}

async function editVehicle() {
    try {
        let vehicle = getVehicleLocal()
        let data = await apiGetVehicleWithId(vehicle)
        vehicleData(data)
    } catch (error) {
        displayResultVehicle(error, "err")
        deleteVehicleLocal()
        window.location.href = "../dashboard.html";
    }
}

editVehicle()


async function formEditVehicle() {
    event.preventDefault();
    const id = document.getElementById("id").value
    const type = document.getElementById("typeForVehicle").value
    const model = document.getElementById("modelVehicle").value;
    const color = document.getElementById("colorVehicle").value;
    const registration = document.getElementById("registrationVehicle").value;
    const horse_power = document.getElementById("horsepowerVehicle").value;
    const cylinder = document.getElementById("cylinderVehicle") ? document.getElementById("cylinderVehicle").value : 0;
    const volume = document.getElementById("volumeVehicle") ? document.getElementById("volumeVehicle").value : 0;
    const price_per_kilometer = document.getElementById("pricePerKilometerVehicle").value;
    const vehicleData = {
        type,
        model,
        color,
        registration,
        horse_power,
        cylinder,
        volume,
        price_per_kilometer
    };
    await displayResultVehicle(await apiPutVehicle(id, vehicleData), "edit");
}