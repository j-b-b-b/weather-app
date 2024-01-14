const apiKey = "5ff79ee33aa2176de553a2a0316c618b";

const weatherDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if(!response.ok) {
            throw new Error("Couldn't fetch weather data from open weather API!");
        }

        const jsonData = await response.json();

        console.log(jsonData);

        const longitude = jsonData.coord.lon; // -180 to 180
        const latitude = jsonData.coord.lat; // -90 to 90

        const temperature = jsonData.main.temp; // in °C

        const mainDescription = jsonData.weather[0].main; // header
        const subDescription = jsonData.weather[0].description; // more detailed
        const icon = jsonData.weather[0].icon; // gives icon code

        const feelsLike = jsonData.main.feels_like; // in °C
        const minTemperature = jsonData.main.temp_min; // in °C
        const maxTemperature = jsonData.main.temp_max; // in °C
        const pressure = jsonData.main.pressure; // in hPa
        const humidity = jsonData.main.humidity; // in %

        const visibility = jsonData.visibility; // in metres

        const windSpeed = jsonData.wind.speed; // in m/s
        const windDegree = jsonData.wind.deg; // wind direction in °

        const details = [
            `Longitude : ${longitude}`,
            `Latitude : ${latitude}`,
            `Feels Like : ${Math.round(feelsLike)}°C`,
            `Min Temperature : ${minTemperature}°C`,
            `Max Temperature : ${maxTemperature}°C`,
            `Humidity : ${humidity}%`,
            `Pressure : ${pressure}hPa`,
            `Visibility : ${visibility}m`,
            `Wind Speed : ${windSpeed}m/s`,
            `Wind Degree : ${windDegree}°`
        ]

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataElement.querySelector(".temperature").textContent = `${Math.round(temperature)}°C`;

        weatherDataElement.querySelector(".description").textContent = `${mainDescription} (${toTitleCase(subDescription)})`;
        weatherDataElement.querySelector(".description").style.color = "black";

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    }
    catch(error) {
        weatherDataElement.querySelector(".description").textContent = `Please enter correct city name!`;
        weatherDataElement.querySelector(".description").style.color = "red";
        weatherDataElement.querySelector(".icon").innerHTML = "";
        weatherDataElement.querySelector(".temperature").textContent = "";
        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }