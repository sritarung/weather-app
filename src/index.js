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
}

(() => {
  // attach the address submit handler to the submit button
  const submitButton = document.getElementById("address-submit");
  submitButton.addEventListener("click", onAddressSubmit);
  // TODO: Add onAddressSubmit as a handler for <enter> being pressed in the text box
})();
