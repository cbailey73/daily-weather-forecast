# Daily Weather Forecast

## Purpose
This website was designed so that users can find information about the current and upcoming weather conditions of any major city. The user simply has to enter in the name of the city whose weather they're interested in, and they will be given the city's current and next five days of weather conditions in terms of temperature, humidity, wind speed, and the state of the atmosphere. 

The user's previously searched cities will be stored on the webpage, underneath the search bar, and be coded so that users to click on them to regenerate their search results. This was developed so that users can quickly access information about their commonly searched cities.

This information is provided by fetching data from https://openweathermap.org using API requests. This can be done thanks to openweathermap.org generously allowing free API requests to be made to their site.

## Usage 
To search up a city, the user can enter in the name of the city they're looking for, and press the "Search" button. 

A large card will appear on the screen containing the city name and current date. Contained in the card is the city's current weather conditions, temperature, humidity, and wind speed.

Underneath the current weather card, a section titled "Five-Day Forecast" will be populated with weather cards corresponding to the next five days of forecasted weather. Each weather card will include the date for which the weather is predicted, and the conditions, temperature, humidity, and wind speeds the city is predicted to experience on that day.

After the search is conducted, the name of the city searched will be appended beneatch the search bar. If the name is clicked, a search is reconducted for that city, and the webpage is re-populated with the city's current and forecasted weather information.

## License
This project is protected under an MIT Licence. Further information can be found in the "LICENSE" document located in the repository.

## Credits
The weather information used in this project was obtained from https://openweathermap.org/api

The asynchronous fetch functions used in this projected were created by following this tutorial: https://dmitripavlutin.com/javascript-fetch-async-await/

The code used to catch fetching errors and create a weather forecast using a for loop was written using information contained in this tutorial: https://github.com/pekkiriscim/weather/blob/main/src/js/weatherForecastData.js

## Webpage
The webpage can be found here: 
