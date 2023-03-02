const ONE_LINE_ENDPOINT =
  "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";
const proxyURL = (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`;

/**
 * Assemble the URL for a particular address
 *
 * @param {string} address
 * @returns a string of the assembled URL
 */
export function buildCensusURL(address) {
  const url = new URL(ONE_LINE_ENDPOINT);
  if (url.searchParams === undefined) {
    url.searchParams = new URLSearchParams();
  }
  url.searchParams.append("address", address);
  url.searchParams.append("benchmark", "2020");
  url.searchParams.append("format", "json");
  return url.toString();
}

/**
 * Call the Census geocoding API for a given address
 *
 * @param address {string}
 * @returns a Promise<Response> from querying the geocoding API
 */
export function getGeoDataForAdress(address) {
  return fetch(proxyURL(buildCensusURL(address)));
}

/**
 *
 * @param {Response} response
 * @returns a {Promise}
 */
export async function extractResultFromResponse(response) {
  const data = await response.json();
  if (data.result.addressMatches.length === 0) {
    return Promise.reject(new Error("no match found"));
  }
  return data.result.addressMatches[0];
}

export function getLatLongForAddress(address) {
  getGeoDataForAdress(address).then((resp) =>
    extractResultFromResponse(resp).then((addressMatch) => ({
      address: addressMatch.matchedAddress,
      lat: addressMatch.coordinates.x,
      long: addressMatch.coordinates.y,
    }))
  );
}
