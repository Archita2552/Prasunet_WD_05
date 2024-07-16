function showLoading() {
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.weather-info').classList.remove('show');
}

function displayError(message) {
    document.getElementById('weatherDescription').innerText = message;
    document.getElementById('temperature').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('windSpeed').innerText = '';
    document.querySelector('.weather-info').classList.add('show');
    document.querySelector('.loading').style.display = 'none';
}

document.getElementById('fetchWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoordinates(lat, lon);
            }, error => {
                displayError('Error getting geolocation.');
            });
        } else {
            displayError('Geolocation is not supported by this browser.');
        }
    }
});

function fetchWeather(location) {
    const apiKey = '13c19467689abfe905279f91f1d676d8'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    showLoading();

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
            changeBackground(data.weather[0].main);
        })
        .catch(error => displayError(error.message));
}

function fetchWeatherByCoordinates(lat, lon) {
    const apiKey = '13c19467689abfe905279f91f1d676d8'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    showLoading();

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
            changeBackground(data.weather[0].main);
        })
        .catch(error => displayError(error.message));
}

function updateWeatherInfo(data) {
    const weatherEmoji = getWeatherEmoji(data.weather[0].main);

    document.getElementById('weatherDescription').innerHTML = `${weatherEmoji} ${data.weather[0].description}`;
    document.getElementById('temperature').innerHTML = `🌡️ Temperature: ${data.main.temp.toFixed(1)} °C`;
    document.getElementById('humidity').innerHTML = `💧 Humidity: ${data.main.humidity} %`;
    document.getElementById('windSpeed').innerHTML = `🌬️ Wind Speed: ${data.wind.speed.toFixed(1)} m/s`;
    document.querySelector('.weather-info').classList.add('show');
    document.querySelector('.loading').style.display = 'none';
}

function getWeatherEmoji(weather) {
    switch (weather) {
        case 'Clear':
            return '☀️';
        case 'Clouds':
            return '☁️';
        case 'Rain':
            return '🌧️';
        case 'Snow':
            return '❄️';
        case 'Thunderstorm':
            return '⛈️';
        case 'Drizzle':
            return '🌦️';
        case 'Mist':
        case 'Fog':
            return '🌫️';
        case 'Smoke':
            return '💨';
        case 'Haze':
            return '🌫️';
        case 'Dust':
            return '🌪️';
        default:
            return '🌈';
    }
}

function changeBackground(weather) {
    let gradientColors;
    let textColor;

    switch (weather) {
        case 'Clear':
            gradientColors = ['#2980b9', '#6dd5fa'];
            textColor = '#2980b9';
            break;
        case 'Clouds':
            gradientColors = ['#bdc3c7', '#2c3e50'];
            textColor = '#2c3e50';
            break;
        case 'Rain':
            gradientColors = ['#00c6fb', '#005bea'];
            textColor = '#005bea';
            break;
        case 'Snow':
            gradientColors = ['#7de2fc', '#b9b6e5'];
            textColor = '#7de2fc';
            break;
        case 'Thunderstorm':
            gradientColors = ['#20002c', '#cbb4d4'];
            textColor = '#20002c';
            break;
        case 'Drizzle':
            gradientColors = ['#4e54c8', '#8f94fb'];
            textColor = '#4e54c8';
            break;
        case 'Mist':
        case 'Fog':
            gradientColors = ['#bdc3c7', '#2c3e50'];
            textColor = '#2c3e50';
            break;
        case 'Smoke':
            gradientColors = ['#485563', '#29323c'];
            textColor = '#485563';
            break;
        case 'Haze':
            gradientColors = ['#bdc3c7', '#2c3e50'];
            textColor = '#2c3e50';
            break;
        case 'Dust':
            gradientColors = ['#b79891', '#94716b'];
            textColor = '#b79891';
            break;
        default:
            gradientColors = ['#a8edea', '#fed6e3'];
            textColor = '#a8edea';
    }

    document.body.style.background = `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`;
    document.querySelector('.container').style.color = textColor;
}

// Initial call to fetch weather based on geolocation
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        }, error => {
            displayError('Error getting geolocation.');
        });
    } else {
        displayError('Geolocation is not supported by this browser.');
    }
});
