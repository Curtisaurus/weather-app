// gets city search input box
var cityInput = $('#cityInput');

// gets search form
var citySearch = $('#citySearch');

// gets div to hold current weather conditions
var currentConditions = $('#currentConditions');

citySearch.submit(function(event) {
    
    //turns the input into a single query string
    city = cityInput.val().trim().split(' ').join('+').toLowerCase();
    cityString = cityInput.val().trim()

    currentConditions.html('');

    //prevents page reload on submit
    event.preventDefault()

    if (city) {
        getWeather(city);
    }

})

// fetches weather info for searched city and renders if city is valid
function getWeather(city) {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=38b3c0fe921860ddb62eae436edbcd3d";

    fetch(apiUrl).then(function (response) {
        // only renders if no error
        if (response.ok) {
            response.json().then(function (data) {
                getForecast(data, data.coord.lat, data.coord.lon);
            })
        }
    })
}

function getForecast(currentData, latitude, longitude) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly,alerts&appid=38b3c0fe921860ddb62eae436edbcd3d";

    fetch(apiUrl).then(function (response) {
        // returns the forecast data if no errors
        if (response.ok) {
            response.json().then(function (forecast) {
                renderWeather(currentData, forecast)
            })
        }
    })
}

// displays selected city's weather on the page
function renderWeather(now, forecast) {
    // gets todays date
    today = moment().format("(M/D/YYYY)")
    // places location and date in bolded text into a created p element
    placeTime = $('<p></p>').addClass('fs-3 fw-bold').text(now.name + " " + today);
    // gets weather icon based on current data
    weatherIcon = $('<img></img>')
        .attr("src", "http://openweathermap.org/img/wn/" + now.weather[0].icon + ".png")
            .attr("alt", now.weather[0].description);
    // places weather icon image inside date and location p element for inline rendering
    placeTime.append(weatherIcon)
    // creating temperature element
    nowTemp = $('<p></p>').text("Temp: " + now.main.temp + "°F");
    // wind speed element
    nowWind = $('<p></p>').text("Wind: " + now.wind.speed + " MPH");
    // humidity element
    nowHumidity = $('<p></p>').text("Humidity: " + now.main.humidity + "%");
    // gets uv index value
    uvVal = forecast.current.uvi
    // creates span for css modification based on value
    uviNum = $('<span></span').text(uvVal).addClass("p-1");
    // changes id based on severity of uv index for css selection
    if (uvVal < 3) {
        uviNum.attr("id", "favorable");
    } else if (uvVal < 6) {
        uviNum.attr("id", "moderate");
    } else {
        uviNum.attr("id", "severe");
    }
    // creates element for uv index and appends numerical span
    uviEl = $('<p></p>').text("UV Index: ").append(uviNum);
    // appends all elements to current conditions div
    currentConditions.append(placeTime, nowTemp, nowWind, nowHumidity, uviEl)

    // loop for creating and appending relevant values to 5-day forecast
    for (i=1; i < 6; i++) {
        // checks date for current index
        date = moment().add(i, 'days').format('M/D/YYYY')
        // gets relevant all data from api called JSON object
        icon = forecast.daily[i].weather[0].icon
        temp = forecast.daily[i].temp.day
        wind = forecast.daily[i].wind_speed
        humidity = forecast.daily[i].humidity

        // gets current day element
        dayEl = $('#day' + i)

        // creates elements dynamically
        dateEl = $('<p></p>').addClass(' fw-bold').text(date);
        iconEl = $('<img></img>').attr("src", "http://openweathermap.org/img/wn/" + icon + ".png")
        tempEl = $('<p></p>').text("Temp: " + temp + "°F");
        windEl = $('<p></p>').text("Wind: " + wind + " MPH");
        humidityEl = $('<p></p>').text("Humidity: " + humidity + "%");

        // clears old data and appends new  
        dayEl.html('');
        dayEl.append(dateEl, iconEl, tempEl, windEl, humidityEl)
    }

    addButton(now.name)
}