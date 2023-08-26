
window.addEventListener("load", init);

function init(){
    let map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
}

async function fetchData() {

    const response = await fetch('http://localhost:3000/features');
    const data = await response.json();
    let lieu = document.getElementById("lieu");
    lieu.innerText = data[0].properties.name;
    console.log(data[0].properties.name);

    return data;
}

fetchData();

