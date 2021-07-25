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