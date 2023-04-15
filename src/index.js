// import { getSupportedCodeFixes } from "typescript";
import sampleForecast from "./sample_forecast.json";
import "./main.css";
import getLatLongForAddress from "./geocode";
import { getForecast, insertForecast } from "./forecast";

/**
 * Create an img element with the "icon" specified in the forecast
 *
 * @param {{name: string, startTime: string, endTime: string, temperature: number, icon: URL, shortForecast: string}} forecast
 */
// async function buildForecastIconElt(forecast) {}

/**
 * Create the `section` element for one forecast item.
 *
 * @param {{name: string, startTime: string, endTime: string, temperature: number, icon: URL, shortForecast: string}} forecast
 */
// async function buildForecastBlock(forecast) {}

/**
 * @param {response}
 */
function invalidForecast(response) {
  const econtainer = document.getElementById("forecast-cont");
  while (econtainer.firstChild) {
    econtainer.removeChild(econtainer.firstChild);
  }
  const edivision = document.createElement("div");
  edivision.classList.add("error-division");

  const epara = document.createElement("p");
  epara.textContent = response;
  edivision.appendChild(epara);
  econtainer.appendChild(edivision);
  epara.style.backgroundColor = "red";
  epara.style.color = "white";
}

/**
 * Event handler for address submission
 *
 * @param {Event} ev
 */
async function onAddressSubmit(ev) {
  let x;
  let y;
  ev.preventDefault();
  // find the text box
  const addressElt = document.getElementById("address");
  const address = addressElt.value;
  console.log(address);
  try {
    const result = await getLatLongForAddress(address);
    x = result.lat;
    y = result.long;
    getForecast(x, y);
  } catch (error) {
    const ans = error;
    invalidForecast(ans);
  }
}

function fetchSampleData() {
  return Promise.resolve(sampleForecast).then((x) =>
    insertForecast(x.properties.periods)
  );
}

(() => {
  // attach a handler to the "sample data" button
  document
    .getElementById("sample-data")
    .addEventListener("click", fetchSampleData, false);

  // attach the address submit handler to the submit button
  const submitButton = document.getElementById("address-submit");
  submitButton.addEventListener("click", onAddressSubmit);
  // TODO: Add onAddressSubmit as a handler for <enter> being pressed in the text box
})();
