async function apiPostUnavailability(data) {
    return await fetch("http://localhost:8080/unavailability", {
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


async function displayResultUnv(data) {
    alert(data.message)
    if (data.success) {
        window.location.href = "../dashboard.html";
    }
}

async function formAddUnavailability() {
    event.preventDefault();
    const typeVehicle = document.getElementById("typeForVehicle").value
    const description = document.getElementById("descVehicle").value;
    const time = parseInt(document.getElementById("timeVehicle").value);
    const unavailabilityData = {
        typeVehicle,
        description,
        time
    };
    await displayResultUnv(await apiPostUnavailability(unavailabilityData));
}
