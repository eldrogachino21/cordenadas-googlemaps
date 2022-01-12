var config = {
    apiKey: "AIzaSyA32KZubjgB-BBbpoqP_wwnhsRZS5V9EGs",
          authDomain: "mapmarker-703b8.firebaseapp.com",
          projectId: "mapmarker-703b8",
          databaseURL:"https://mapmarker-703b8-default-rtdb.firebaseio.com/",
          storageBucket: "mapmarker-703b8.appspot.com",
          messagingSenderId: "88747209468",
          appId: "1:88747209468:web:c63c454ab462c40e595d79",
          measurementId: "G-1GBT7VTQBV"
        // PUT YOUR CREDENTIALS HERE
};
// Initialize Firebase
firebase.initializeApp(config);



var map = L.map('map').setView([20.648206, -103.353882], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWxkcm9nYWNoaW5vIiwiYSI6ImNreWJyaHdyMDAwc2kyb24zaXA3cXQ0OXMifQ.pQ1oZM6MS2BGq7ik-_pr2g'
}).addTo(map);
var marker = L.marker([20.648206,-103.353882 ]).addTo(map);
 


var counter = 0;
var task = firebase.database().ref("ubicaciones/");
task.on("child_added", function(data) {
    var taskV = data.val();
console.log(value.latitud, value.longitud)
    L.marker([value.latitud, value.longitud]).addTo(map);
    
    
});



marker.bindPopup("<b>Hola soy un marcador</b><br><button>Editar</button>").openPopup();

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
    alert("Estas dando click en la cordenada " + e.latlng  );
}

map.on('click', onMapClick);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)

        .setContent("Estas dando click en la cordenada " + e.latlng .toString()+ "<button onclick='Añadir()'>Añadir</button>" )
        .openOn(map);
}

map.on('click', onMapClick);



    document.getElementById("form").addEventListener("submit",(e)=>{
 
        console.log("firebase cargado ")
        e.preventDefault();
        var tel=getId("telefono");
        var pass=getId("contraseña");
        var conpass = getId("confirmarcontraseña");
        
        var starCountRef = firebase.database().ref('Usuarios/'+tel);
      starCountRef.once('value', (snapshot) => {
      
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const id = snapshot.val().telefono;
          if(id==tel){
            alert("no se ha podido registrar el numero que ingresaste ya existe");
          
          }else{
            
            if(pass==conpass){
              register();
              location.replace('login.html');
            }else{
              alert("las contraseñas no concuerdan")
            }
            
          }
         
        } else {
          if(pass==conpass){
            register();
            location.replace('login.html');
          }else{
            alert("las contraseñas no concuerdan")
          }
        }
      
        
      
      });
        
      
      
        
        
        });
