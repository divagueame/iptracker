
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  // console.log(JSON.stringify(data, null, 2));
  // let userIp = JSON.stringify(data, null, 2)
  
  // document.querySelector(".main").innerHTML = userIp

  // var ip = "8.8.8.8";
  var api_key = "at_eFMjvs94s3EqPKEA1SL9fwvX7MhQA";
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key},
           success: function(data) {
            let lat = data.location['lat'];
            let newLat = lat + 0.003
            let lng = data.location['lng']
            var map = L.map('mapid', {zoomControl: false }).setView([newLat, lng],15);
            // This Information 
            let thisIp = data.ip

            let thisCity  = data.location.city
            let thisPostalCode = data.location.postalCode
            let thisLocation = `${thisCity}, ${thisPostalCode}`

            let thisTimezone = data.location.timezone

            let thisIsp = data.as.name

            newInfo = [thisIp,thisLocation,thisTimezone, thisIsp]

            function refreshInfo(newInfoArray){
              
              let layers = document.querySelectorAll('.overlay-info')
              layers = Array.from(layers)
              
              layers.forEach((element,i) => {
                element.innerHTML = newInfoArray[i]
              });
            }
            refreshInfo(newInfo)
            // console.log(data.ip)
            // console.log(data.location.city)
            // console.log(data.location.postalCode)
            // console.log(data.location.timezone)
            // console.log(data.as.name)
            // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // maxZoom: 18
            // }).addTo(map);


            googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
            })
            .addTo(map);

            var userIcon = L.icon({
              iconUrl: './images/icon-location.svg',
              iconSize:     [46, 56], // size of the icon
              // shadowSize:   [50, 64], // size of the shadow
              // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
              // shadowAnchor: [4, 62],  // the same for the shadow
              // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
          });


            var marker = L.marker([lat, lng], {icon: userIcon}).addTo(map);

            // console.log(data.location)
              //  $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
           }
       });
    });
  
});


// let api_key = 'at_eFMjvs94s3EqPKEA1SL9fwvX7MhQA';
// // Make the request
// fetch('https://geo.ipify.org/api/v1', {apiKey: api_key})
//   // Extract JSON body content from HTTP response
//   .then(response => response.json())
//   // Do something with the JSON data
//   .then(data => {
//     console.log(JSON.stringify(data, null, 2))
//   });




    
// var mymap = L.map('mapid').setView([42.4299, 8.6446], 13);
