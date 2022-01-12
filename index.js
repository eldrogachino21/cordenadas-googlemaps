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

function render(){
    localStorage.removeItem("ubicaciones")
   actualizarcarrito()
}


function actualizarcarrito() {
    var carrito = [];

    var starCountRef = firebase.database().ref("ubicaciones/");

    starCountRef.once('value', (snapshot) => {
        
        snapshot.forEach(element => {
            carrito.push(element.val());
        });
       console.log(carrito);
       localStorage.setItem("ubicaciones", JSON.stringify(carrito));
        
       if (localStorage.getItem("ubicaciones") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("ubicaciones"));
        
    }
       
   
        
    });

}



var counter = 0;
var task = firebase.database().ref("ubicaciones/");
task.on("child_added", function(data) {
  actualizarcarrito()
    counter++;
    var taskV = data.val();
console.log(taskV.latitud, taskV.longitud)
   /* 
    var carrito=[];
    let itemdb= {
        latitud: taskV.latitud,
        longitud: taskV.longitud,
        nombre: taskV.nombre,
        
     }
carrito.push(itemdb);
localStorage.setItem("ubicaciones", JSON.stringify(carrito));
*/
});

var map = L.map('map').setView([20.648206, -103.353882], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWxkcm9nYWNoaW5vIiwiYSI6ImNreWJyaHdyMDAwc2kyb24zaXA3cXQ0OXMifQ.pQ1oZM6MS2BGq7ik-_pr2g'
}).addTo(map);


var array =JSON.parse(localStorage.getItem("ubicaciones"))
        array.forEach(element => {
            var i =0;
            i++;
            console.log(element)
            console.log(parseFloat(element.latitud),parseFloat(element.longitud))
  marker = L.marker([parseFloat(element.longitud),parseFloat(element.latitud) ]).addTo(map);
marker.bindPopup(`<b>${element.nombre}</b><br><button>Editar</button>`).openPopup();
            
        });



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

        .setContent("Estas dando click en la cordenada " + e.latlng .toString()+ `<button onclick='Añadir(${e.latlng.toString().split(",")})'>Añadir</button>` )
        .openOn(map);
}

map.on('click', onMapClick);

function register(){
    firebase.database().ref("/ubicaciones").child(counter+1).set({
      nombre: document.getElementById("nombre").value,
      latitud: document.getElementById("latitud").value,
      longitud: document.getElementById("longitud").value,

      
    }
    
    );
    console.log( "nombre" + document.getElementById("nombre").value,
    "latitud"+ document.getElementById("latitud").value,
    "longitud"+ document.getElementById("longitud").value)
    alert("ok registrado")
}


function Añadir(value){
    console.log(value)
    // document.getElementById("nombre").value("")
    // document.getElementById("latitud").value("")
    // document.getElementById("longitud").value(""),

}
  
document.getElementById("form").addEventListener("submit",(e)=>{
 
        console.log("firebase cargado ")
        e.preventDefault();
        var nombre=document.getElementById("nombre").value;
        var latitud=document.getElementById("latitud").value;
        var longitud = document.getElementById("longitud").value;
        register()
    
      
        
      
     
        
      
      
        
        
        });
