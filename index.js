
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  // console.log(JSON.stringify(data, null, 2));
  let userIp = JSON.stringify(data, null, 2)
  
  // document.querySelector(".main").innerHTML = userIp

  // var ip = "8.8.8.8";
  var api_key = "at_eFMjvs94s3EqPKEA1SL9fwvX7MhQA";
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key},
          //  data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
              // console.log(data)
              //  $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
           }
       });
    });



  
});


    
var mymap = L.map('mapid').setView([42.4299, 8.6446], 13);