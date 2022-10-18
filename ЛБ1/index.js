// Fetch all weather data

var lon = '';
var lat = '';

let weather = {
    apiKey: "4578dfd18eec05ad383b51b494653ef3",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
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
    }
}

weather.fetchWeather('Kharkiv');

// Search button functionality

document
    .querySelector('.search-bar-icon')
    .addEventListener('click', () => {
        weather.search();
    })

document
    .getElementById('search-bar')
    .addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('search-btn').click();
        }
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

// Hide/display the card with wind speed and humidity info

var windSpeedHumidity = document.getElementById("detailed-info");

var showDetailedInfoButton = document.getElementById("show-hide-detailed-info");

var showArrow = document.getElementById("show-arrow");
var hideArrow = document.getElementById("hide-arrow");

showDetailedInfoButton.addEventListener("click", () => {
    if (windSpeedHumidity.style.display != "none") {
        windSpeedHumidity.style.display = "none";
        showArrow.style.display = "block";
        hideArrow.style.display = "none";
    } else {
        windSpeedHumidity.style.display = "block"
        showArrow.style.display = "none";
        hideArrow.style.display = "block";
    }
})

// Swiper

var swiper = new Swiper(".weather-timeline", {
    spaceBetween: 10,
    loop: true,
    centeredSlides: false,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        568: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        968: {
            slidesPerView: 5,
        }
    }
});

// Randomizing data
var weatherTimeIcons = document.querySelectorAll(".weather-time-icon");

const icons = [1, 2, 3, 4, 9];
const timeStamps = ["3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00", "24:00"];
const temperatureValues = ["+16°", "+16°", "+16°", "+16°", "+18°", "+18°", "+18°", "+18°"];

weatherTimeIcons.forEach(function(wti) {
    const random = Math.floor(Math.random() * icons.length);
    wti.src = "https://openweathermap.org/img/wn/0" + icons[random] + "d.png";
});

var weatherDaysIcons = document.querySelectorAll(".day-icon");

weatherDaysIcons.forEach(function(wdi) {
    const random = Math.floor(Math.random() * icons.length);
    wdi.src = "https://openweathermap.org/img/wn/0" + icons[random] + "d.png";
});

// Removing hardcoded data

for (let i = 0; i < 8; i++) {
    var div = document.createElement('div');
    div.className = "swiper-slide weather-time";

    var h5_1 = document.createElement('h5');
    h5_1.innerText = timeStamps[i];

    var img = document.createElement('img');
    const random = Math.floor(Math.random() * icons.length);
    img.src = "https://openweathermap.org/img/wn/0" + icons[random] + "d.png";

    var h5_2 = document.createElement('h5');
    h5_2.innerText = temperatureValues[i];

    div.appendChild(h5_1);
    div.appendChild(img);
    div.appendChild(h5_2)

    var weatherSwiperWrapperDiv = document.getElementById("swiper-wrapper");
    weatherSwiperWrapperDiv.appendChild(div);
}