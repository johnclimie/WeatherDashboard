var lat;
var long;


// $.ajax({
//     url: 'http://api.positionstack.com/v1/forward',
//     data: {
//         access_key: '1d78fafa76f422a476d2002242731baa',
//         query: 'atlanta',
//         limit: 1
//     }
// }).done(function (response) {
//     // console.log(response.data[0].latitude);
//     var lat = response.data[0].latitude;
//     var long= response.data[0].longitude;
//     console.log(lat);
//     console.log(long);
// })


var tempLat = 33.76;
var tempLong = -84.41;

$.ajax({
    type: 'POST',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=5995eb989855fb7c98ae5e17f47586af',
    dataType: "json"
}).done(function (response) {
    console.log(response)
})

