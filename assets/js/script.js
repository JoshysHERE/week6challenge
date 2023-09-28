let weather = {
    "apiKey":  "095780be0d2a0e556ee508b10271a24d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=095780be0d2a0e556ee508b10271a24d&units=imperial" +
            + city
            + "&units=imperial&appid="
            + this.appKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
},
displayWeather: function(data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;

    document.querySelector('.city').innerText = 'Weather in' + name;
    document.querySelector('.icon').src = 
    "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=51.5085&lon=-0.1257&zoom=6" + icon + ".png";
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°F';
    document.querySelector('.humidity').innerText = 'humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText = 'wind speed: ' + speed + 'km/h';

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


weather.fetchWeather("Philadelphia");