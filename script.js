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