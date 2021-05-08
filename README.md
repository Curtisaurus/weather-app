# Weather App

This application utilizes the [OpenWeather API](https://openweathermap.org/api) to supply data for a city-searchable weather dashboard.  Users may submit a city name and data is retrieved for current conditions as well as a 5-day forecast.  UV index is color-coded to alert user to severity and possible hazard.  Input will accept city names regardless of case but submitting cities not in the OpenWeather database or non-city name strings will produce no effect on the page.

## Persistent Results -
Search strings that yield results will persist on the page as a visible and clickable button, even on page reload.  These will bring back data of recently searched cities.  This provides the user a shortcut to information for frequently checked cities.  Search history may be cleared in totality but hitting the "Clear Searches" button.

## Libraries -
This application uses jQuery and Moment.js javascript libraries and utilises a bootstrap css framework for most of the design elements

## Demo

![An animated gif showing a user search for multiple cities and use the persistent search buttons](weatherdashboard.gif)

[Github Repo](https://github.com/Curtisaurus/weather-app)

[Live page](https://curtisaurus.github.io/weather-app/)