const key = '3a4ed4eecd82ee61fabfffa724a98c84';

let cityName;

document.querySelector("#sendCity").addEventListener("click", (event) => {
    event.preventDefault();
    cityName = document.querySelector("#enterCity").value

    getWeather()
});

async function getWeather() {
    try {
        document.querySelector("#cityName").innerHTML = cityName
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${key}&units=metric`)//
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`)
        const weatherData = await response.json();
        // console.log(weatherData)
        // console.log(weatherData.weather[0].icon)
        // console.log("CITY", weatherData.name)

        document.querySelector("#cityName").innerHTML = weatherData.name + ", " + weatherData.sys.country
        document.querySelector("#temperature").innerHTML = "Temperature: " + Math.round(weatherData.main.temp) + "°C"
        document.querySelector("#feelsLike").innerHTML = "Feels like: " + Math.round(weatherData.main.feels_like) + "°C"
        
        let weatherDesc = weatherData.weather[0].description;
        let weatherDescContainer = document.querySelector("#weatherDesc")
        let cloudPercentage = ", " + weatherData.clouds.all + "%"
        if (weatherDesc == "clear sky") {
            console.log(weatherDescContainer)
            cloudPercentage = ""
        }
        
        weatherDescContainer.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1) + cloudPercentage
        document.querySelector("#ic").src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        document.querySelector("#humidity").innerHTML = "Humidity: " + weatherData.main.humidity + "%"
        document.querySelector("#clouds").innerHTML = "Clouds: " + weatherData.clouds.all + "%"


        document.querySelector("#error").innerHTML = "";
        
    } catch(error) {
        document.querySelector("#error").innerHTML = error.message;
        document.querySelector("#error").style.display = "block";
        document.querySelector("#weatherContainer").style.display = "none";

        console.log(error.message)
    }

connectToAPI = () => {
}

}