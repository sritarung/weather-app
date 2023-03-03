# Assignment 3

In this assignment, we're going to extend your weather page from Assignment 2
to query an API.

## Getting Set Up

This repo contains my `main.css` and `index.html` from the Assignment 2. You can
use those or continue to work on your Assignment 2 code.

## Step One

Run `pnpm build` and inspect `dist`. You should have:

```
dist
├── index.html
└── main.js
```

You'll notice that, even though `src/main.css` exists, it's not included in `dist`.
What's going on? If you take a look at `webpack.config.js`, you'll see that we're
using the `HtmlWebpackPlugin` which is assembling our javascript into `main.js`
(note that our javascript source file is called `src/index.js`) and injecting that into `index.html`. But our Javascript doesn't know anything about our CSS, so, while
webpack can see the css source (see line 26 of `webpack.config.js`), it doesn't know
that our site actually needs it.

What do we do? Sounds odd, but we can _import_ it to our Javascript. Add the following at the top of `index.js`:

```js
import "./main.css";
```

If you run `pnpm start`, you'll see that out site now has the CSS! (It's actually being
injected by the JS, so it won't appear in `dist` if you run `pnpm build`.)

## Step Two: Looking at the APIs

Now that we're back where we left off, the next step is to connect to an API.

We're going to use the [National Weather Service API](https://www.weather.gov/documentation/services-web-api). If you get look at the docs, you'll notice that
the forecast endpoint is of the form:

```
https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
```

There are two problems here... we need a "grid point" _and_ a NWS office. Given
latitude and longitude, we can get the grid information from another endpoint:

```
https://api.weather.gov/points/{latitude},{longitude}
```

If you have `jq` installed, you can get a pretty-printed example by running:

```bash
curl https://api.weather.gov/points/39.7456,-97.0892 | jq .
```

The most interesting part of the response is the `properties` field:

```js
 "properties": {
    "@id": "https://api.weather.gov/points/39.7456,-97.0892",
    "@type": "wx:Point",
    "cwa": "TOP",
    "forecastOffice": "https://api.weather.gov/offices/TOP",
    "gridId": "TOP",
    "gridX": 31,
    "gridY": 80,
    "forecast": "https://api.weather.gov/gridpoints/TOP/31,80/forecast",
    "forecastHourly": "https://api.weather.gov/gridpoints/TOP/31,80/forecast/hourly",
    "forecastGridData": "https://api.weather.gov/gridpoints/TOP/31,80",
    "observationStations": "https://api.weather.gov/gridpoints/TOP/31,80/stations",
    "relativeLocation": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.086661,
          39.679376
        ]
      },
      "properties": {
        "city": "Linn",
        "state": "KS",
        "distance": {
          "unitCode": "wmoUnit:m",
          "value": 7366.9851976444
        },
        "bearing": {
          "unitCode": "wmoUnit:degree_(angle)",
          "value": 358
        }
      }
    },
```

This looks good, but we have to come up with latitude and longitude. Fortunately,
the Census has a [Geocoding API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html).

### Detour: CORS

Take a minute and read about [CORS Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Because the Census Geocoding API doesn't actually supply CORS headers,
we can't call it directly from our client-side/frontend code (you can try this, if you want). Instead, we'll proxy the requests via [corsproxy.io](https://corsproxy.io/). Is proxying via a website run by a random German company a good practice? No. In the "real world", you'd proxy via a server you control.

## Step Three: Add an address box

1. Add a search box and a submit button. The search box should have id `address` and the button should have id `address-submit`.
   Unfortunately, the Census Geocoding API requires a full address,
   not just a city/state or ZIP code. (Let me know if you find another geocdoing API that doesn't require a key.)
2. Attach a listener to the `click` event that takes the contents of the address box and just logs it to the console. (We did this in class.)

3. Take a look at https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode#notes and add a listener to the text input itself to submit on `Enter`. (See also https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

4. Run the tests with `pnpm test`. The "address submission" tests should pass.

## Step Four: Look up the weather

...

## Step Five: Replace your hard-coded forecast
