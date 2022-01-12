var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetnap.org/{z})/{x}/{y}-prg",{
    attribution: "&copy: ca href-'https://w.openstreetnap.org/copyright'>0penstreetlapc/a> contributors"
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);