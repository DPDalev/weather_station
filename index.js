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

        console.log(weatherData.wind.deg)

        const windDirection = windDirectionCorrection(weatherData.wind.deg)// || "NW"
        
        document.querySelector("#temperature").innerHTML = Math.round(weatherData.main.temp  * 10) / 10 + "°C"
        document.querySelector("#feelsLike").children[1].innerHTML = Math.round(weatherData.main.feels_like * 10) / 10 + "°C"
        document.querySelector("#humidity").children[1].innerHTML = weatherData.main.humidity + "%"
        // document.querySelector("#wind").children[1].innerHTML = Math.round(weatherData.wind.speed  * 10) / 10 + "m/s , " + weatherData.wind.deg + "°"
        document.querySelector("#wind").children[1].innerHTML = Math.round(weatherData.wind.speed  * 10) / 10 + "m/s, " + windDirection;

        
        let weatherDesc = weatherData.weather[0].description;
        let weatherDescContainer = document.querySelector("#weatherDesc")
        let cloudPercentage = ", " + weatherData.clouds.all + "%"
        
        if (weatherDesc == "clear sky") {
            cloudPercentage = ""
        }

        weatherDescContainer.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1) + cloudPercentage
        
        document.querySelector("#ic").src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        document.querySelector("#error").innerHTML = "";
        
    } catch(error) {
        noCity("City not found");
        console.log(error)
    }
}

function noCity(message) {
    cityNameContainer.innerHTML = message;
    cityNameContainer.classList.add("cityNotEntered");

    document.getElementById("weather").style.display = "none";
}

function windDirectionCorrection(angle) {
    switch(angle) {
        // case 350:
        // case 360:
        // case 10: return "N";
        case 20:
        case 30: return "N/NE";
        case 40:
        case 50: return "NE";
        case 60:
        case 70: return "E/NE";
        case 80:
        case 90:
        case 100: return "E";
        case 110:
        case 120: return "E/SE";
        case 130:
        case 140: return "SE";
        case 150:
        case 160: return "S/SE";
        case 170:
        case 180:
        case 190: return "S";
        case 200:
        case 210: return "S/SW";
        case 220:
        case 230: return "SW";
        case 240:
        case 250: return "W/SW";
        case 260:
        case 270:
        case 280: return "W";
        case 290:
        case 300: return "W/NW";
        case 310:
        case 320: return "NW";
        case 330:
        case 340: return "NW";
        default: return "N"
    }
}
