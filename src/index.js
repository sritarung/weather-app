import "./main.css";

/**
 * Event handler for address submission
 *
 * @param {Event} ev
 */
function onAddressSubmit(ev) {
  ev.preventDefault();
  // find the text box
  const addressElt = document.getElementById("address");
  console.log(addressElt.value);
  // here, we should start by calling the geocode API
}

function fetchSampleData() {
  fetch("http://localhost:3000/sample_forecast.json")
    .then((x) => x.json())
    .then(console.log);
}

(() => {
  // attach a handler to the "sample data" button
  document
    .getElementById("sample-data")
    .addEventListener("click", fetchSampleData);

  // attach the address submit handler to the submit button
  const submitButton = document.getElementById("address-submit");
  submitButton.addEventListener("click", onAddressSubmit);
  // TODO: Add onAddressSubmit as a handler for <enter> being pressed in the text box
})();
