$(document).ready(function() {
    var searchBtn = $('#searchBtn');
    var searchHistory = $('#searchHistory');
    var searchResults = $('#searchResults')
    

    searchBtn.click(function() {
        searchHistory.html(
        `<button class="col-12 btn border-info m-1">Result 1</button>
        <button class="col-12 btn border-info m-1">Result 2</button>
        <button class="col-12 btn border-info m-1">Result 3</button>`);

        searchResults.html(
            `<div class="p-3 border border-dark">
            <h1 class="m-3">Atlanta</h1>
            <h4 class="m-3">Temp:</h4>
            <h4 class="m-3">Wind:</h4>
            <h4 class="m-3">Humidity:</h4>
            <h4 class="m-3">UV Index:</h4>
        </div>

        <div class="p-3">
            <h1>5-Day Forecast</h1>
            <div class="row justify-content-center">
                <div class="col-10 border border-dark p-2 m-3">
                    <h2 class="m-3">12/26/21</h2>
                    <img src="#" class="m-2">
                    <h5 class="m-2">Temp</h5>
                    <h5 class="m-2">Wind</h5>
                    <h5 class="m-2">Humidity</h5>
                </div>
                <div class="col-10 border border-dark p-2 m-3">
                    <h2 class="m-3">12/26/21</h2>
                    <img src="#" class="m-2">
                    <h5 class="m-2">Temp</h5>
                    <h5 class="m-2">Wind</h5>
                    <h5 class="m-2">Humidity</h5>
                </div>
                <div class="col-10 border border-dark p-2 m-3">
                    <h2 class="m-3">12/26/21</h2>
                    <img src="#" class="m-2">
                    <h5 class="m-2">Temp</h5>
                    <h5 class="m-2">Wind</h5>
                    <h5 class="m-2">Humidity</h5>
                </div>
                <div class="col-10 border border-dark p-2 m-3">
                    <h2 class="m-3">12/26/21</h2>
                    <img src="#" class="m-2">
                    <h5 class="m-2">Temp</h5>
                    <h5 class="m-2">Wind</h5>
                    <h5 class="m-2">Humidity</h5>
                </div>
                <div class="col-10 border border-dark p-2 m-3">
                    <h2 class="m-3">12/26/21</h2>
                    <img src="#" class="m-2">
                    <h5 class="m-2">Temp</h5>
                    <h5 class="m-2">Wind</h5>
                    <h5 class="m-2">Humidity</h5>
                </div>
            </div>
        </div>`
        );
    })

    searchBtn.click(function() {
        console.log('test');
    })


})


































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

// $.ajax({
//     type: 'POST',
//     url: 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=5995eb989855fb7c98ae5e17f47586af',
//     dataType: "json"
// }).done(function (response) {
//     console.log(response)
// })

