const POINT_ENDPOINT = "http://localhost:3000/weather/points";
// const FORECAST_ENDPOINT = (office, x, y) =>
//   `http://localhost:3000/weather/${office}/${x}/${y}/forecast`;

/**
 * Now that we have the array of forecasts, insert them into the
 * DOM
 * @param {} forecastPeriods
 */
export function insertForecast(forecastPeriods) {
  const container = document.getElementById("forecast-cont");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  forecastPeriods.forEach((period) => {
    const division = document.createElement("div");
    division.classList.add("forecast-div");

    const name = document.createElement("p");
    name.textContent = period.name;
    division.appendChild(name);

    const temperature = document.createElement("p");
    temperature.textContent = `${period.temperature}\xB0F`;
    division.appendChild(temperature);

    const icon = document.createElement("img");
    icon.src = period.icon;
    icon.alt = period.shortForecast;
    division.appendChild(icon);

    container.appendChild(division);
  });
}

/**
 * Lookup the grid point corresponding to a given lat/long
 *
 * @param {number} latitude
 * @param {number} longitude
 */
async function getPoint(latitude, longitude) {
  const url = `${POINT_ENDPOINT}/${latitude},${longitude}`;
  return fetch(url);
}

/**
 * Get the forecast for a given lat/long pair
 *
 * @param {number} latitude
 * @param {number} longitude
 */
export async function getForecast(latitude, longitude) {
  const pointResponse = await getPoint(latitude, longitude);
  const pointData = await pointResponse.json();
  const forecast = await fetch(pointData.properties.forecast);
  const forecastData = await forecast.json();

  insertForecast(forecastData.properties.periods);
}
