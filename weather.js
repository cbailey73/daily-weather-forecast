var apiKey = '742697716706061f84673c0f0e4df73c';

async function fetchWeatherData(city) {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    var data = await response.json();
    return data;
};

async function fetchWeatherForecastData(city) {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    var data = await response.json();
    return data;
};

function displayCurrentWeather(data) {
    if (data) {
        var currentWeatherContainer = document.getElementById('current-weather');
        currentWeatherContainer.innerHTML = '';

        var currentWeather = data.weather[0];
        var cityName = data.name;
        var date = new Date(data.dt * 1000).toLocaleDateString();
        var temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert Celcius to Fahrenheit
        var humidity = data.main.humidity;
        var windSpeed = Math.round(data.wind.speed * 2.23694); // Convert m/s to mph

        var currentWeatherCard = createWeatherCard(cityName, date, currentWeather.icon, currentWeather.description, temperature, humidity, windSpeed);
        currentWeatherContainer.appendChild(currentWeatherCard);
        currentWeatherCard.setAttribute('id', 'current-weather-card');
    }
}

function displayWeatherForecast(data) {
    if (data) {
        var forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';

        for (let i = 0; i < data.list.length; i+=8) {
            var forecast = data.list[i+4];
            var weather = forecast.weather[0];
            var date = new Date(forecast.dt * 1000).toLocaleDateString();
            var temperature = Math.round((forecast.main.temp - 273.15) * 9/5 + 32);
            var humidity = forecast.main.humidity;
            var windSpeed = Math.round(forecast.wind.speed * 2.23694);

            var forecastWeatherCard = createWeatherCard('', date, weather.icon, weather.description, temperature, humidity, windSpeed);
            forecastContainer.appendChild(forecastWeatherCard);
        }
    }
}

function createWeatherCard(cityName, date, icon, description, temperature, humidity, windSpeed) {
    var weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';

    var cityNameElement = document.createElement('h2');
    cityNameElement.textContent = cityName;

    var dateElement = document.createElement('p');
    dateElement.textContent = date;

    var weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon';
    weatherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    weatherIcon.alt = description;

    var temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperature}°F`;

    var humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    var windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} mph`;

    weatherCard.appendChild(cityNameElement);
    weatherCard.appendChild(dateElement);
    weatherCard.appendChild(weatherIcon);
    weatherCard.appendChild(temperatureElement);
    weatherCard.appendChild(humidityElement);
    weatherCard.appendChild(windSpeedElement);

    return weatherCard;
}

function saveToSearchHistory(city) {
    var searchHistoryContainer = document.getElementById('search-history');

    var searchHistoryItem = document.createElement('p');
    searchHistoryItem.setAttribute('class', 'search-history-item');
    searchHistoryItem.textContent = city;
    searchHistoryItem.addEventListener('click', () => getWeather(null, city));

    searchHistoryContainer.appendChild(searchHistoryItem);
}

function getWeather(event, city = null) {
    if (event) {
        event.preventDefault();
    }

    var cityInput = document.getElementById('city-input');

    // Check if the city has been previously searched, and run fetch accordingly
    var cityName = city ? city.trim() : cityInput.value.trim();

    if (cityName) {
        fetchWeatherData(cityName)
            .then(data => {
                displayCurrentWeather(data);
                saveToSearchHistory(data.name);

                fetchWeatherForecastData(data.name)
                    .then(forecastData => {
                        displayWeatherForecast(forecastData);
                    });
            });

        cityInput.value = '';
    }
};
