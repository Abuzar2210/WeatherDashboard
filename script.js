// creating elements 
var userForm = document.querySelector('#user-form');
var cityButtons = document.querySelector('#city-buttons');
var cityInput = document.querySelector('#city-input');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var resultContainer = document.querySelector('#result-container');
var weatherContainer = document.querySelector('#weather-container');
var fiveDayContainer = document.querySelector('#five-day-container');

// creating variables
var iconURL = "http://openweathermap.org/img/wn/"
var apiKey = "efc3f7fbd03154c674e7dbf51275471a"
var today = moment();
var currentData;
var fiveDayData;
var coord;
var cityName;

function forSubmitHandler(event){
    event.preventDefault();
    cityName = cityInput.nodeValue.trim();
    localStorage.setItem(cityName, cityName);
    if(!cityName){
        return;
    }
    getWeatherData(cityName)
}

function getWeatherData(city){
    weatherContainer.remove();
    fiveDayContainer.remove();

    weatherContainer = document.createElement("div")
    fiveDayContainer = document.createElement("div")
    fiveDayContainer.setAttribute('id', 'five-day-container')
    resultContainer.append(weatherContainerEl)
    resultContainer.append(fiveDayContainerEl)

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    //API fetch

    fetch(weatherUrl).then(function (response){
        response.json().then(function (data){
            coord = data.coord
            getForecastData(coord.lat, coord.lon)
        })

    })
    .catch(function (error){
        console.log(error);
    })
}

//function for weather data

function getForecastData(lat, lon){
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly,alerts&appid=" + apiKey
    fetch(fiveDayUrl)
        .then(function (response) {
            response.json().then(function (data) {
                currentData = data.current;
                fiveDayData = data.daily;
                displayMainCard();
                display5day();
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}

function displayMainCard() {
    var uvi = currentData.uvi;
    var currWeatherIcon = currentData.weather[0].icon + ".png"
    var currDate = today.format("MMM Do, YYYY")

    currWeather = document.createElement('div');
    currWeather.setAttribute("class", "weather-card");
    weatherContainer.append(currWeatherEl);

    var currHeader = document.createElement('h2')
    currHeader.setAttribute("class","weather-header")
    currHeader.textContent = cityName + " | " + currDate
    currWeather.append(currHeader)

    var currIcon = document.createElement('img')
    currIcon.setAttribute("id", "weather-icon")
    currIcon.setAttribute("src", iconURL + currWeatherIcon)
    currHeader.append(currIcon)

    var currTemp = document.createElement('p')
    currTemp.textContent = "Temp: " + currentData.temp
    currWeather.append(currTemp)

    var currWind = document.createElement('p')
    currWind.textContent = "Wind: " + currentData.wind_speed
    currWeather.append(currWind)

    var currHumidity = document.createElement('p')
    currHumidity.textContent = "Humidity: " + currentData.humidity
    currWeather.append(currHumidity)

    var currUVI = document.createElement('p')
    currUVI.textContent = "UVI: " + uvi
    if (uvi < 2) {
        currUVI.setAttribute("class", "uvi-low")
    } else if (uvi < 5) {
        currUVI.setAttribute("class", "uvi-med")
    } else {
        currUVI.setAttribute("class", "uvi-high")
    }
    currWeather.append(currUVI)
}

// function for displaying forecast 

function display5day() {
    for (var i = 1; i < 6; i++) {        
        var date = moment().add(i,'days');
        var dailyWeatherIcon = currentData.weather[0].icon + ".png"

        dailyWeather = document.createElement('div');
        dailyWeather.setAttribute("class", "fiveday-card");
        fiveDayContainer.append(dailyWeather);

        var dailyHeader = document.createElement('h3');
        dailyHeader.textContent = date.format("MMM Do");
        dailyHeader.setAttribute("class", "weather-header");
        dailyWeather.append(dailyHeader);

        var dailyIcon = document.createElement('img')
        dailyIcon.setAttribute("id", "weather-icon")
        dailyIcon.setAttribute("src", iconURL + dailyWeatherIcon)
        dailyHeader.append(dailyIcon)

        var dailyTemp = document.createElement('p')
        dailyTemp.textContent = "Temp: " + fiveDayData[i].temp.day
        dailyWeather.append(dailyTemp)
    
        var dailyWind = document.createElement('p')
        dailyWind.textContent = "Wind: " + fiveDayData[i].wind_speed
        dailyWeather.append(dailyWind)
    
        var dailyHumidity = document.createElement('p')
        dailyHumidity.textContent = "Humidity: " + fiveDayData[i].humidity
        dailyWeather.append(dailyHumidity)
    }
}



