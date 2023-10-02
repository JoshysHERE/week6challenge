# week6challenge

let weather = {
    "apiKey":  "095780be0d2a0e556ee508b10271a24d",
    fetchWeather: function (city) {
        fetch (
            "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=095780be0d2a0e556ee508b10271a24d&units=imperial" +
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


    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src = 
    "https://openweathermap.org/img/wn/" + icon + ".png";
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






  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}




    <div class = 'input-container'></div>
  <div class = 'search'>
    <div class = 'search-bar'>
      <input type = 'text' placeholder='Enter The Cities Name'>
 <button>
  <p><img src="./images/loupe_428094.png"></img></p>
</button>
</div>
                <div class = 'weather-container'></div>
                <div class = 'card'>
                <div class='weather'>
                <h2 class="city">Weather In Philadelphia</h2>
                <h1 class="temp">65°F</h1>
                <img src="https://openweathermap.org/img/wn/" alt="" class="icon" />
                <div class="description">Party Cloudy</div>
                <div class="humidity">Humidity: 10%</div>
                <div class="wind">Wind: 3km/h</div>

   </div>
</div>




var ApiKey = "095780be0d2a0e556ee508b10271a24d"
var userInput = document.getElementById('userInput');
var submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function() {
  console.log(userInput.value)
  getCoordinates(userInput.value)

})

let getWeather = function(lat, lon){
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + ApiKey
  fetch(url)
  .then(function(response){
     return response.json()
  })
.then(function(data){
  console.log(data)
})

}

function getCoordinates(cityName){
  var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + ApiKey
  console.log(url)
  fetch(url)
  .then(function(response){
    return response.json()

  })
  .then(function(data){
    console.log(data[0].lat)
    getWeather(data[0].lat, data[0].lon)

})

}

