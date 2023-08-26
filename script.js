
window.addEventListener("load", init);
let map;
let coordinates;
const place = document.getElementById("place");
const coordo = document.getElementById("coordo");
const btn_next = document.getElementById("btn_next");
const btn_play = document.getElementById("btn_play");
const btn_submit = document.getElementById("btn_submit");
let currentMarker;
let circle;

async function init() {
    //console.log(data[0].geometry.coordinates);
    //Code fournit par leaflet pour son utilisation
    map = L.map('map').setView([31.129632, 30.020828], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
    /*setTimeout(function(){
        //do what you need here
        map.flyTo([13.87992, 45.9791], 12);
    }, 10000);*/
    btn_play.addEventListener("click", play);
    
    return map;
}

async function fetchData() { 
    const response = await fetch('http://localhost:3000/features');
    const data = await response.json();
    //console.log(data[0].geometry.coordinates);

    return data;
}

 async function play() {
    let i = 0;
    let first_click = 0;
    const data = await fetchData();
    place.innerText = "Trouve ce lieu sur la carte : " + data[i].properties.name;
    btn_next.addEventListener("click", function (){
        i++;
        next(i);
    });

    map.flyTo(data[i].geometry.coordinates, 7);

    //var marker = L.marker([47.394631, 1.274414]).addTo(map);
    let markerLayer = L.layerGroup().addTo(map);

    circle = L.circle(data[i].geometry.coordinates, {
        color: 'transparent',
        fillColor: 'transparent',
        fillOpacity: 0.5,
        radius: 10000
    }).addTo(map);
    
    map.on('click', onMapClick)
    
    function onMapClick(e) {
       
         coordinates = e.latlng;
         currentMarker = L.marker(coordinates).addTo(markerLayer);
        //alert(i);
         if(first_click != 0){
            markerLayer.removeLayer(previousMarker);
         }

         previousMarker = currentMarker;
         first_click = 1;
         //var marker = L.marker([47.394631, 1.274414]).addTo(map);
        coordo.innerText = "Coordonnées du clic actuel : " + currentMarker.getLatLng();//e.latlng.toString(); 
     }

     btn_submit.addEventListener("click", () => {
        if (circle.getBounds().contains(coordinates)) {
            i++;
            next(i);
            alert(i+"Bonne réponse")
        } else {
            alert(i+"Mauvaise réponse")
        }
    })
    
    
    // map.on('click', onMapClick);

   /*data.map((element, i) => {
    place.innerText = "Trouve ce lieu sur la carte : " + data[i].properties.name;
    
   
    
   });*/


}

async function next(i){
    
    const data = await fetchData();
    alert(i);
    place.innerText = "Trouve ce lieu sur la carte : " + data[i].properties.name;
    console.log(data[i].geometry.coordinates)
    map.flyTo(data[i].geometry.coordinates, 7);
    circle = L.circle(data[i].geometry.coordinates, {
        color: 'transparent',
        fillColor: 'transparent',
        fillOpacity: 0,
        radius: 10000
    }).addTo(map);
    
    
    return i;
}

/*async function attclic (){
    await map.on('click', onMapClick);
}*/

/*function onMapClick(e) {
    coordinates = e.latlng;
    alert(coordinates);
    
}*/

/*async function question(number, answer) {
    const data = await fetchData();
    if (answer === ) {
        // alors c'est la bonne réponse
    } else {
        // réessayez
    }
}*/



