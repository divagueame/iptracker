mapInit()

function mapInit(){
  
  $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
    var api_key = "at_eFMjvs94s3EqPKEA1SL9fwvX7MhQA";
  
      $(function () {
         $.ajax({
             url: "https://geo.ipify.org/api/v1",
             data: {apiKey: api_key}, 
             success: function(data) {
              let lat = data.location['lat'];
              let newLat = lat + 0.003
              let lng = data.location['lng']
              var map = L.map('mapid', {zoomControl: false });
                
              map.setView([newLat, lng],15);

              googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
              maxZoom: 20,
              subdomains:['mt0','mt1','mt2','mt3']
              })
              .addTo(map);
  
              var userIcon = L.icon({
                iconUrl: './images/icon-location.svg',
                iconSize:     [46, 56]
            });
  
            L.marker([lat, lng], {icon: userIcon}).addTo(map);


              // This Information 
              let thisIp = data.ip
              let thisCity  = data.location.city
              let thisPostalCode = data.location.postalCode
              let thisLocation = `${thisCity}, ${thisPostalCode}`
              let thisTimezone = data.location.timezone
              let thisIsp = data.as.name
  
              newInfo = [thisIp,thisLocation,thisTimezone, thisIsp]
              
  
              refreshInfo(newInfo)
             }
         });
      });
    
  });
  
  
  
  
  }


// updateMap()

function updateMap(ipInput){
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  var api_key = "at_eFMjvs94s3EqPKEA1SL9fwvX7MhQA";

    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: (ipInput || null)}, 
           success: function(data) {
            let lat = data.location['lat'];
            let newLat = lat + 0.003
            let lng = data.location['lng']


            var container = L.DomUtil.get('mapid');
            if(container != null){
              console.log("NOT EMPTY1")
            container._leaflet_id = null;
            }
            
            // console.log(document.getElementById('mapid'))
            // let ref = document.getElementById('mapid')
              // ref.innerHTML = `<div id="mapid"></div>`
            
              var map = L.map('mapid', {zoomControl: false })

              // let container = map.getContainer()
              // console.log(container)
            // map.off()
            // map.remove()
            
            
            map.setView([newLat, lng],15);
            // This Information 
            let thisIp = data.ip
            let thisCity  = data.location.city
            let thisPostalCode = data.location.postalCode
            let thisLocation = `${thisCity}, ${thisPostalCode}`
            let thisTimezone = data.location.timezone
            let thisIsp = data.as.name

            newInfo = [thisIp,thisLocation,thisTimezone, thisIsp]
            

            refreshInfo(newInfo)
            // 


            googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
            })
            .addTo(map);

            var userIcon = L.icon({
              iconUrl: './images/icon-location.svg',
              iconSize:     [46, 56]
          });


            var marker = L.marker([lat, lng], {icon: userIcon})
            .addTo(map);

            // console.log(data.location)
              //  $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
           }
       });
    });
  
});




}



function refreshInfo(newInfoArray){
              
  let layers = document.querySelectorAll('.overlay-info')
  layers = Array.from(layers)
  layers.forEach((element,i) => {
    element.innerHTML = newInfoArray[i]
  });
}



let updateMapBtn = document.querySelector(".send-btn")
let inputBox = document.getElementById("id_input")
updateMapBtn.addEventListener('click', function(){
  if(inputBox.value){
    console.log(inputBox.value)
    updateMap(inputBox.value)
  }
})