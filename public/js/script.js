var weaterReport;
var timestampSeconds, citySelectedName;

const getWeatherReport = (city) => {
  cityName.innerHTML = city;
  citySelectedName = city;
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "af5efe8decmsh5773f680665c8fep1e4293jsn23b963a9f82d",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      weaterReport = response;
      // Convert to milliseconds and
      // then create a new Date object
      let dateObjSunrise = new Date(response.sunrise * 1000);
      // Get hours from the timestamp
      let hoursSunrise = dateObjSunrise.getUTCHours();
      // Get minutes part from the timestamp
      let minutesSunrise = dateObjSunrise.getUTCMinutes();
      // Get seconds part from the timestamp
      let secondsSunrise = dateObjSunrise.getUTCSeconds();
      let sunrise =
        hoursSunrise.toString().padStart(2, "0") +
        ":" +
        minutesSunrise.toString().padStart(2, "0") +
        ":" +
        secondsSunrise.toString().padStart(2, "0");

      // Convert to milliseconds and
      // then create a new Date object
      let dateObjSunset = new Date(response.sunset * 1000);
      // Get hours from the timestamp
      let hoursSunset = dateObjSunset.getUTCHours();
      // Get minutes part from the timestamp
      let minutesSunset = dateObjSunset.getUTCMinutes();
      // Get seconds part from the timestamp
      let secondsSunset = dateObjSunset.getUTCSeconds();
      let Sunset =
        hoursSunset.toString().padStart(2, "0") +
        ":" +
        minutesSunset.toString().padStart(2, "0") +
        ":" +
        secondsSunset.toString().padStart(2, "0");

      cloud_pct.innerHTML = response.cloud_pct;
      humidity.innerHTML = response.humidity;
      max_temp.innerHTML = response.max_temp;
      min_temp.innerHTML = response.min_temp;
      feels_like.innerHTML = response.feels_like;
      wind_speed.innerHTML = response.wind_speed;
      temp.innerHTML = response.temp;
      wind_degrees.innerHTML = response.wind_degrees;
      wind_degrees.innerHTML = response.wind_degrees;
      sunriseHtml.innerHTML = sunrise;
      SunsetHtml.innerHTML = Sunset;
    });
};

Submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherReport(city.value);
});

SaveWeather.addEventListener("click", (e) => {
  fetch("http://localhost:5000/api/addweaterreport", {
    method: "POST",
    body: JSON.stringify({
      sunrise: weaterReport.sunrise,
      sunset: weaterReport.sunset,
      cloudpct: weaterReport.cloud_pct,
      feelsLike: weaterReport.feels_like,
      humidity: weaterReport.humidity,
      WindSpeed: weaterReport.wind_speed,
      WindDegrees: weaterReport.wind_degrees,
      temp: weaterReport.temp,
      date: timestampSeconds,
      locationname: citySelectedName,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
});

//get the response from api related to the saved weather

const getTodayDate = () => {
  const date = new Date();
  timestampSeconds = Math.floor(date / 1000);
  console.log(timestampSeconds);
};

getWeatherReport("Delhi");
getTodayDate();
