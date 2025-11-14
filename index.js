/*
/fetch("http://localhost:8083/reservations")
.then(res => res.json())
.then(res => {
    console.log(res)
})


fetch("http://localhost:8083/reservations", {
    method: "POST",
    body: JSON.stringify({
        "idClient": 1,
        "idVehicule": 2,
        "startReservation": "2025-10-25",
        "endReservation": "2025-10-27",
        "estimatedKm": 20
    }),
})
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
        */


fetch("http://localhost:8080/clients")
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })