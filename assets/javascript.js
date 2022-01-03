$(document).ready(function () {
    var textInput = $('#textInput');
    var searchBtn = $('#searchBtn');
    var searchHistory = $('#searchHistory');
    var searchResults = $('#searchResults');
    var clearBtn = $('#clearHistory');

    searchBtn.click(() => {
        if (textInput.val().length == 0) {
            window.alert("Please enter a location");
            return;
        } else {
            $.ajax({
                url: 'http://api.positionstack.com/v1/forward',
                data: {
                    access_key: '1d78fafa76f422a476d2002242731baa',
                    query: textInput.val(),
                    limit: 1
                }
            }).done(function (response) {
                var lat = response.data[0].latitude;
                var long = response.data[0].longitude;


                searchHistory.append(`<button class="col-12 btn border-info m-1" id="prevSearch">${textInput.val().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</button>`);

                localStorage.setItem("test", searchHistory.html());

                $.ajax({
                    type: 'POST',
                    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=5995eb989855fb7c98ae5e17f47586af&units=imperial`,
                    dataType: "json"
                }).done(function (response) {
                    searchResults.empty();
                    searchResults.append(
                        `<div class="p-3 border border-dark">
                        <h1 class="m-3">${textInput.val().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h1>
                        <h4 class="m-3">Temp: ${response.current.temp} F</h4>
                        <h4 class="m-3">Wind: ${response.current.wind_speed} MPH</h4>
                        <h4 class="m-3">Humidity: ${response.current.humidity}</h4>
                        <h4 class="m-3">UV Index: ${response.current.uvi}</h4>
                        </div>
                        
                        <div class="p-3">
                            <h1>5-Day Forecast</h1>
                            <div class="row justify-content-center" id="forecast">
                            </div>
                        </div>`
                    )

                    var forecast = $("#forecast");

                    for (var i = 1; i < 6; i++) {
                        var date = new Date(response.daily[i].dt * 1000);
                        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                        forecast.append(
                            `<div class="col-10 border border-dark p-2 m-3">
                            <h2 class="m-3">${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}</h2>
                            <img src="#" class="m-2">
                            <h5 class="m-2">Temp: ${response.daily[i].temp.day} F</h5>
                            <h5 class="m-2">Wind: ${response.daily[i].wind_speed} MPH</h5>
                            <h5 class="m-2">Humidity: ${response.daily[i].humidity}</h5>
                            </div>`
                        )
                    }
                })



                $('#prevSearch').on('click', () => {
                   console.log("test");
                   console.log($(this).attr("id"));
                   console.log($(this).attr("value"));
                });
            })
        }
        
    })


    searchHistory.html(localStorage.getItem('test'));

    clearBtn.click(function () {
        localStorage.clear();
        location.reload();
    })


})