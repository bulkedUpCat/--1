var slider = document.getElementById("slider-input")

slider.oninput = function() {
    let progressBar = document.querySelector("progress");
    progressBar.value = slider.value - 8.5;

    let sliderValue = document.getElementById("slider-value");

    var value = slider.value.toString();

    switch (value.length) {
        case 1:
        case 2:
            value += ":00";
            break;
        case 3:
            value = value.substring(0, 1) + ":30";
            break;
        case 4:
            value = value.substring(0, 2) + ":30";
            break;
    }

    console.log(value);
    sliderValue.innerHTML = value;
}

var lon = '';
var lat = '';

let weather = {
    apiKey: "4578dfd18eec05ad383b51b494653ef3",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .then(() => this.fetchDailyWeather());
    },
    displayWeather: function(data) {
        lon = data.coord.lon;
        lat = data.coord.lat;
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.temperature').innerText = temp + " °C";
        document.querySelector('.weather-icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector('.weather-description').innerText = description;
        document.querySelector('.wind-speed').innerText = speed + " km/h";
        document.querySelector('.humidity').innerText = humidity + " %";
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    },
    fetchDailyWeather: function() {
        fetch(
                "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayDailyWeather(data));
    },
    displayDailyWeather: function(data) {
        console.log(data)
        const { date } = data.dt;
        console.log(date);
    }
}

// Fetch all weather data
weather.fetchWeather('Kharkiv');

// Search button functionality
document
    .querySelector('.search-bar-icon')
    .addEventListener('click', () => {
        weather.search();
    })

// Days of the week
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = new Date();

let day = weekDays[today.getDay()];
let currentHours = today.getHours();
let currentMinutes = today.getMinutes();

if (today.getMinutes().toString().length == 1) {
    currentMinutes = "0" + today.getMinutes();
}

let currentTime = currentHours + ":" + currentMinutes;

document
    .querySelector('.week-day-today')
    .innerText = day;

document
    .querySelector('.current-time')
    .innerText = currentTime;

for (let i = 1; i < 5; i++) {
    document
        .querySelector('.week-day' + i)
        .innerText = weekDays[new Date(today.getTime() + 86400000 * i).getDay()]
}