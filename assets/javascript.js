$(document).ready(function () {
    // Variables grab elements from index file
    var textInput = $('#textInput');
    var searchBtn = $('#searchBtn');
    var searchHistory = $('#searchHistory');
    var searchResults = $('#searchResults');
    var clearBtn = $('#clearHistory');

    searchBtn.click(() => {
        // If nothing is entered, the user is told to enter a locaiton, else, the funciton flows through
        if (textInput.val().length == 0) {
            window.alert("Please enter a location");
            return;
        } else {
            // API gets coordinates based on the input in the textbox
            $.ajax({
                url: `https://api.openweathermap.org/geo/1.0/direct?q=${textInput.val()}&limit=5&appid=5995eb989855fb7c98ae5e17f47586af`
            })
            .done(function (response) {

                // Coordinates are stored in variables based on the response to the API call
                var lat = response[0].lat;
                var long = response[0].lon;

                // Appends new button based on recent search
                const button = $("<button>", {
                    type: "button",
                    "class": "prevSearch col-12 btn border-info m-1",
                    text: textInput.val().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                }).appendTo(searchHistory);

                // Stores prevois search in local storage
                localStorage.setItem("history", searchHistory.html());

                // API calls for weather information based on coordinates
                $.ajax({
                    type: 'POST',
                    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=5995eb989855fb7c98ae5e17f47586af&units=imperial`,
                    dataType: "json"
                }).done(function (response) {
                    // Empties search results after each click
                    searchResults.empty();
                    // Sets background of UV Index based on the value provided
                    var uvColor;
                    if (response.current.uvi < 3) {
                        uvColor = "bg-success";
                    } else if (response.current.uvi > 3 && response.current.uvi < 6){
                        uvColor = "bg-warning";
                    } else if (response.current.uvi > 6 && response.current.uvi < 11) {
                        uvColor = "bg-danger";
                    }

                    // Appends Search results with information provided by API
                    searchResults.append(
                        `<div class="p-3 border border-dark">
                        <img src ="https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png" alt="Icon of weather condition">
                        <h1 class="m-3">${textInput.val().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h1>
                        <h4 class="m-3">Temp: ${response.current.temp} F</h4>
                        <h4 class="m-3">Wind: ${response.current.wind_speed} MPH</h4>
                        <h4 class="m-3">Humidity: ${response.current.humidity}%</h4>
                        <h4 class="m-3">UV Index: <span class="${uvColor} rounded p-1">${response.current.uvi}</span></h4>
                        </div>
                        
                        <div class="p-3">
                            <h1>5-Day Forecast</h1>
                            <div class="row justify-content-center" id="forecast">
                            </div>
                        </div>`
                    )

                    var forecast = $("#forecast");
                    // Appends forecast for the next 5 days
                    for (var i = 1; i < 6; i++) {
                        var date = new Date(response.daily[i].dt * 1000);
                        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                        forecast.append(
                            `<div class="col-10 border border-dark p-2 m-3">
                            <img src ="https://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}@2x.png" style="max-width:60px;" alt="Icon of weather condition">
                            <h2 class="m-3">${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}</h2>
                            <h5 class="m-2">Temp: ${response.daily[i].temp.day} F</h5>
                            <h5 class="m-2">Wind: ${response.daily[i].wind_speed} MPH</h5>
                            <h5 class="m-2">Humidity: ${response.daily[i].humidity}%</h5>
                            </div>`
                        )
                    }
                })                
            })
        }    
    })

    // Gets local storage for previous searches
    searchHistory.html(localStorage.getItem('history'));

    // Grabs city from previous search button that is clicked, and appends weather information based on the previous search, similar to search button function
    searchHistory.on("click", ".prevSearch", function() {
        var buttonCity = $(this).text()

        $.ajax({
            url: `https://api.openweathermap.org/geo/1.0/direct?q=${buttonCity}&limit=5&appid=5995eb989855fb7c98ae5e17f47586af`
        }).done(function (response) {
            var lat = response[0].lat;
            var long = response[0].lon;


            $.ajax({
                type: 'POST',
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=5995eb989855fb7c98ae5e17f47586af&units=imperial`,
                dataType: 'json'
            }).done(function (response) {
                searchResults.empty();
                var uvColor;
                    if (response.current.uvi < 3) {
                        uvColor = "bg-success";
                    } else if (response.current.uvi > 3 && response.current.uvi < 6){
                        uvColor = "bg-warning";
                    } else if (response.current.uvi > 6 && response.current.uvi < 11) {
                        uvColor = "bg-danger";
                    }
                searchResults.append(
                    `<div class="p-3 border border-dark">
                    <img src ="https://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png" alt="Icon of weather condition"">
                    <h1 class="m-3">${buttonCity}</h1>
                    <h4 class="m-3">Temp: ${response.current.temp} F</h4>
                    <h4 class="m-3">Wind: ${response.current.wind_speed} MPH</h4>
                    <h4 class="m-3">Humidity: ${response.current.humidity}%</h4>
                    <h4 class="m-3">UV Index: <span class="${uvColor} rounded p-1">${response.current.uvi}</span></h4>
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
                        <img src ="https://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}@2x.png" style="max-width:60px; alt="Icon of weather condition"">
                        <h2 class="m-3">${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}</h2>
                        <h5 class="m-2">Temp: ${response.daily[i].temp.day} F</h5>
                        <h5 class="m-2">Wind: ${response.daily[i].wind_speed} MPH</h5>
                        <h5 class="m-2">Humidity: ${response.daily[i].humidity}%</h5>
                        </div>`
                    )
                }
            })
        })
    })

    // Clears search history, which helps for testing
    clearBtn.click(function () {
        localStorage.clear();
        location.reload();
    })


})