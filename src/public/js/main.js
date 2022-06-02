var map = L.map('map-template').setView([-17.383952, -66.157116],17)


const socket = io();

//Funcion para obtener datos por puerto serial

socket.on('temp', function (data) {

    //console.log(data);
    //let potenciometroDer = document.getElementById('potenciometroDer');
    let potenciometroDerGrados = document.getElementById('potenciometroDerGrados');
    let potenciometroIzqGrados = document.getElementById('potenciometroIzqGrados');
    let ritmoCardiaco = document.getElementById('ritmoCardiaco');
    let saturacion = document.getElementById('saturacion')
    //temp.innerHTML = `Pos ${data}`
    const serialData = data;
    const obj = JSON.parse(serialData);
    ritmoCardiaco.innerHTML = obj.ritmoCardiaco;
    //potenciometroDer.innerHTML = obj.sensorValor1;
    potenciometroDerGrados.innerHTML = obj.sensorValorGrados1 + " °";
    potenciometroIzqGrados.innerHTML = obj.sensorValorGrados2 + " °"
    // potenciometroIzq.innerHTML = obj.sensorValor2;
    saturacion.innerHTML = obj.sp02;
    if(obj.sensorValorGrados1 >= 89 || obj.sensorValorGrados2 >= 89 || obj.ritmoCardiaco >=110){
        
        Swal.fire({
            
            icon: 'warning',
            title: 'Valores fuera del parametro normal',
            showConfirmButton: false,
            timer: 2000
          })
          
    }
    //console.log(obj);
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({enableHighAccuracy: true});
map.on('locationfound', e =>{
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    //console.log(coords)
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