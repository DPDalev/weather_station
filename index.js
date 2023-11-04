const key = '3a4ed4eecd82ee61fabfffa724a98c84';

let cityName;
const cityNameContainer = document.getElementById("cityName");

document.querySelector("#submitCity").addEventListener("click", (event) => {
    event.preventDefault();
    cityName = document.querySelector("#enterCity").value

    if (cityName === "") {
        noCity("Please enter city name")
    } else {
        getWeather()
    }
});

async function getWeather() {
    try {
        cityNameContainer.classList.remove("cityNotEntered");
        cityNameContainer.innerHTML = cityName;
        document.getElementById("weather").style.display = "block";
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`)
        const weatherData = await response.json();
        cityNameContainer.innerHTML = weatherData.name + ", " + weatherData.sys.country
        
        document.querySelector("#temperature").innerHTML = Math.round(weatherData.main.temp  * 10) / 10 + "°C"
        document.querySelector("#feelsLike").children[1].innerHTML = Math.round(weatherData.main.feels_like * 10) / 10 + "°C"
        document.querySelector("#humidity").children[1].innerHTML = weatherData.main.humidity + "%"
        document.querySelector("#wind").children[1].innerHTML = Math.round(weatherData.wind.speed  * 10) / 10 + "m/s , " + weatherData.wind.deg + "°"
        
        let weatherDesc = weatherData.weather[0].description;
        let weatherDescContainer = document.querySelector("#weatherDesc")
        let cloudPercentage = ", " + weatherData.clouds.all + "%"
        
        if (weatherDesc == "clear sky") {
            cloudPercentage = ""
        }

        let windDirection = ""
        
        weatherDescContainer.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1) + cloudPercentage
        
        document.querySelector("#ic").src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        document.querySelector("#error").innerHTML = "";
        
    } catch(error) {
        noCity("City not found");
    }
}

function noCity(message) {
    cityNameContainer.innerHTML = message;
    cityNameContainer.classList.add("cityNotEntered");

    document.getElementById("weather").style.display = "none";
}
