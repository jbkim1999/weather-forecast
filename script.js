const city = document.getElementById("city");
const button = document.querySelector("button");
// const loader = document.querySelector('#loader')
const weatherContainer = document.querySelector(".weather-container");

button.addEventListener("click", (event) => {
  event.preventDefault();
  clearContainer();
  // loader.style.display = 'block'
  fetchWeather(city.value);
  // loader.style.display = 'none'
});

async function fetchWeather(cityName) {
  try {
    let temperature;
    if (document.getElementById("celsius").checked === true) {
      temperature = "metric";
    } else {
      temperature = "imperial";
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0107370fa8d4a90ed230a9ec0d8e2f4e&units=${temperature}`;
    const response = await fetch(url);
    const cityWeather = await response.json();
    display(cityName, cityWeather, temperature);
  }
  catch (error) {
    alert("Please enter a valid city name...!");
  }
}

function display(cityName, cityWeather, temperature) {
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  h1.textContent = cityName.toUpperCase();
  let h2Text = `${cityWeather.weather[0].main}, with ${cityWeather.main.temp} degrees`;
  if (temperature === "metric") {
    h2Text += " Celcius"
  } else {
    h2Text += " Fahrenheit"
  }
  h2.textContent = h2Text;
  h3.textContent = cityWeather.weather[0].description;
  weatherContainer.appendChild(h1);
  weatherContainer.appendChild(h2);
  weatherContainer.appendChild(h3);
  weatherContainer.classList.add("found");
}

function clearContainer() {
  weatherContainer.innerHTML = "";
  weatherContainer.classList.remove("found");
}


