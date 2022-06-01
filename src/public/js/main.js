var map = L.map('map-template').setView([-17.382535, -66.145793],17)


const socket = io();

//Function for get serial data

socket.on('temp', function (data) {
    console.log(data);
    let temp = document.getElementById('temperature')
    temp.innerHTML = `Pos ${data}`
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', e =>{
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('You are here!');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng);
})

socket.on('newUserCoordinates', function(coords){
    console.log('New user is connected')
    const marker = L.marker([coords.lat, coords.lng]);
    marker.bindPopup('Hello There!');
    map.addLayer(marker);
});

// const marker = L.marker([-17.384, -66.146]);
// marker.bindPopup('Hello There!');
// map.addLayer(marker);