let gotPosition = function(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  // console.log(lat);
  // console.log(long);
  getForecast(lat, long);
}

let getForecast = function(lat, long) {
  let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=095780be0d2a0e556ee508b10271a24d";
  getWeatherText(url);
}

async function getWeatherText(url) {
  let weatherObject = await fetch(url);
  let weatherText = await weatherObject.text();
  console.log(weatherObject);
  console.log(weatherText);
  parseWeather(weatherText);
}

let parseWeather = function(weatherText) {
  let weatherJSON = JSON.parse(weatherText);
  console.log(weatherJSON);
  let dailyForecast = weatherJSON.daily;
  //console.log(dailyForecast);
  for (x = 0; x < dailyForecast; x++) {
      let day = dailyForecast[x];
      let today = new Date().getDay() + x;
      if (today > 6) {
          today = today - 7;
      }
      let dayOfWeek = getDayOfWeek(today);
      let description = day.weather[0].description;
      let icon = day.weather[0].icon;
      let sunrise = timestampToTime(day.sunrise);
      let sunset = timestampToTime(day.sunset);
      let highTemp = kToF(day.temp.max);
      let lowTemp = kToF(day.temp.min);
      let humidity = day.humidity;
      let windSpeed = day.wind_speed;
      let windGust = day.wind_gust;
      displayWeatherDay(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust);
  }
}

let displayWeatherDay = function(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust) {
  let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + ".png'/>";
  out += "<h2>" + dayOfWeek + "</h2>";
  out += "<h3>" + description + "</h3>";
  out += "<p>Sunrise: " + sunrise + "</p>";
  out += "<p>Sunset: " + sunset + "</p>";
  out += "<p>High Temperature: " + highTemp + "F</p>";
  out += "<p>Low Temperature: " + lowTemp + "F</p>";
  out += "<p>Humidity: " + humidity + "%</p>";
  out += "<p>Wind Speed: " + Math.round(windSpeed) + " with gusts up to " + Math.round(windGust) + "</p></div>";
  document.getElementById("forecast").innerHTML += out;
}

let getDayOfWeek = function(dayNum) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return (weekday[dayNum]);
}

let kToF = function(kelvinTemp) {
  const celsius = kelvinTemp - 273;
  const fahrenheit = Math.floor(celsius * (9 / 5) + 32);
  return fahrenheit
}

let timestampToTime = function(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  let minutes = "";
  if (date.getMinutes() < 10) {
      minutes = "0" + date.getMinutes();
  } else {
      minutes = date.getMinutes();
  }
  return hours + ":" + minutes;
}

navigator.geolocation.getCurrentPosition(gotPosition);