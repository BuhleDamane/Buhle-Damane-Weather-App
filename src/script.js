function displayTemperature(response) {
  //console.log(response.data.temperature.current)
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description")
 let humidityElement = document.querySelector("#humidity");
 let windSpeedElement = document.querySelector("#wind-speed")
 let timeElement = document.querySelector("#time");
 let date = new Date(response.data.time * 1000)
 let iconElement = document.querySelector("#icon")
 
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`

 //console.log(response.data.condition.description)
  descriptionElement.innerHTML=response.data.condition.description;
 cityElement.innerHTML = response.data.city;
  //cityElement.innerHTML = searchInput.value;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
     hours = `0${hours}`;
      }
    return `${day} ${hours}:${minutes}`

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }


function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value)
  
  searchCity(searchInput.value)
}
function getForecast(city){
  let apiKey = "13d2ee51f9b4o75695t30ad14de90637";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`

axios.get(apiUrl).then(displayForecast);
}

function formatDay(timeStamp){
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[date.getDay()];
}

function displayForecast (response){
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast")

  
  let forecastHtml = "";

  response.data.daily.forEach(function(day, index) { 
      if (index <  5 ){
      forecastHtml =
      forecastHtml  + `

<div class="weather-forecast-day">
<div class="weather-forecast-date">
  ${formatDay(day.time)}
</div>

<div >
<img src="${day.condition.icon_url}"class ="weather-forecast-icon"/>
</div>
<br class="weather-forecast-temperature">
<span class="weather-forecast-temperature-max">
${Math.round(day.temperature.maximum)}°
</span>

<span class="weather-forecast-temperature-min">
${Math.round(day.temperature.minimum)}°
</span>
</div>

</div>

`;
      }
  });
forecastElement.innerHTML = forecastHtml;

}
function searchCity(city) {
  

  let apiKey = "13d2ee51f9b4o75695t30ad14de90637";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  
  axios.get(apiUrl).then(displayTemperature);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Carletonville");

displayForecast();
setInterval(updateTime, 60000);