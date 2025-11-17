async function apiPostVehicle(data) {
    return await fetch("http://localhost:8080/vehicles", {
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
            cylinderData.innerText = 0
            volumeDiv.style.display = "block"
            volumeData.setAttribute("required", "");
            break;
        case "motorcycle":
            cylinderDiv.style.display = "block"
            cylinderData.setAttribute("required", "");
            volumeDiv.style.display = "none"
            volumeData.removeAttribute("required", "");
            volumeData.innerText = 0
            break;

        default:
            cylinderDiv.style.display = "none"
            cylinderData.removeAttribute("required", "");
            cylinderData.innerText = 0
            volumeDiv.style.display = "none"
            volumeData.removeAttribute("required", "");
            volumeData.innerText = 0
            break;
    }
}

async function displayResultVehicle(data) {
    alert(data.message)
    window.location.href = "../dashboard.html";
}


async function formAddVehicle() {
    event.preventDefault();
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
    await displayResultVehicle(await apiPostVehicle(vehicleData));
}