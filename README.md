# Weather Tracker Application

This is a simple weather tracking application that allows users to search for current weather conditions and a 5-day weather forecast for any city. It also keeps track of your recent searches using local storage.

## Features

- **Current Weather**: Displays the current temperature, humidity, and wind speed for the searched city.
- **5-Day Forecast**: Shows the weather forecast for the next 5 days, with key information like temperature, humidity, and weather conditions.
- **Search History**: Saves the user's recent searches and allows them to quickly revisit the weather for any city.
- **Custom Alerts**: Instead of default browser alerts, the application uses a custom modal for errors like "City not found" or "Error fetching data."

## Technologies Used

- **HTML5**: For structuring the application.
- **CSS3**: For styling the application, including a custom modal for alerts.
- **JavaScript (ES6)**: For fetching weather data and dynamically updating the DOM.
- **OpenWeather API**: Provides weather data (current conditions and forecast) based on city names.

## Getting Started

### Prerequisites

To run the project locally, you'll need:

- A code editor like Visual Studio Code.
- An active internet connection to fetch weather data from the [OpenWeather API](https://openweathermap.org/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/weather-tracker-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-tracker-app
   ```

3. Open the project in your favorite code editor.
4. Set up OpenWeather API key:

- Go to the OpenWeather API website and sign up to get your API key.
- In the Assets/script.js file, replace the placeholder apiKey with your actual OpenWeather API key:
  ```javascript
  const apiKey = "your_openweather_api_key";
  ```

5. Run the application:

- Open the index.html file in your browser to run the application.

## Usage

1. Search for a City:

- Enter the name of a city in the search bar and click the "Search Weather" button.
- The current weather for the city will be displayed, along with a 5-day forecast.

2. View Search History:

- The search history section shows your recent searches. Click on a city in the list to quickly load the weather for that city.

3. Custom Alerts:

- If a city is not found or there’s an issue fetching the data, the application will display a custom modal with an error message.

## File Structure

```bash
weather-tracker-app/
│
├── Assets/
│   ├── script.js          # Main JavaScript file
│   ├── styles.css         # Main CSS file
│
├── index.html             # Main HTML file
├── README.md              # This README file
```

## API Endpoints:

1. Current Weather Data:

- URL: https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric
- Example: https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key&units=metric

2. 5-Day Forecast Data:

- URL: https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric
- Example: https://api.openweathermap.org/data/2.5/forecast?lat=51.5074&lon=-0.1278&appid=your_api_key&units=metric

## License

This project is open source and available under the MIT License.
