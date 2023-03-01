import './main.css'

const proxyURL = (url) => 'https://corsproxy.io/?' + encodeURIComponent(url); 

function getGeo() {
    fetch(proxyURL("https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233&benchmark=2020&format=json")).then((resp) => console.log(resp))
}
