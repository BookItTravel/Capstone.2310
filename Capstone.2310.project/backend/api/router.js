/* eslint-disable consistent-return */
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const Amadeus = require('amadeus');
const express = require('express');
const cache = require('../cache/node-cache');

// Create router
const router = express.Router();

// Create Amadeus API client
const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const API = 'api';


// Flight
// no longer allowed
router.post('/flight-search', (req, res) => {
  console.log('request', req.body);
  const {
    originLocationCode, destinationLocationCode, departureDate, adults,
  } = req.body;
  // Find the cheapest flights
  amadeus.shopping.flightOffersSearch.get({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
  }).then((response) => {
    res.send(response.result);
  }).catch((response) => {
    res.send(response);
  });
});

// HOTEL

// gettting location
router.get('/search-location', cache(400), async (req, res) => {
  try {
    const { keyword } = req.body;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});



    // Airport Search  ..not used at this time potential for stretch goal
    router.get(`/city-and-airport-search/:parameter`, cache(400), (req, res) => {
      const parameter = req.params.parameter;
      // Which cities or airports start with ’r'?
      amadeus.referenceData.locations
          .get({
              keyword: parameter,
              subType: Amadeus.location.any,
          })
          .then(function (response) {
              res.send(response.result);
          })
          .catch(function (response) {
              res.send(response);
          });
  });
   
  

  //HOTEL 

 // gettting location ..not used at this time potential for stretch goal
  router.get(`/search-location`, cache(400), async (req, res) => {
    try {
      const { keyword } = req.body;
      const response = await amadeus.referenceData.locations.get({
        keyword,
        subType: Amadeus.location.city,
      });
      res.json(JSON.parse(response.body));
    } catch (err) {
      res.json(err);
    }
  });
router.get('/city-hotels', async (req, res) => {
  try {
    const { cityCode } = req.query;
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
    });
    if (!response) {
      return res.status(400).json({ error: 'No response' });

    }
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.json(err);
  }
});

// Confirming the offer
router.get('/hotel-offers', async (req, res) => {
  try {
    const { hotelIds, cityCode } = req.query;
    amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      cityCode,
    });
    console.log(amadeus.referenceData.locations.hotels.byHotel);
    await res.json(JSON.parse(res.body));
  } catch (err) {
    await res.json(err);
  }
});
// Booking

// City search suggestions
router.get(`/${API}/search/:keyword`, async (req, res) => {
  try {
    const { keyword } = req.params;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// Querying hotels
router.get('/hotel-offers', async (req, res) => {
  try {
    const {
      hotelIds, adults, cityCode, checkInDate, roomQuantity, paymentPolicy, bestRateOnly,
    } = req.query;
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds, adults, cityCode, checkInDate, roomQuantity, paymentPolicy, bestRateOnly,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

router.post(`/${API}/hotels`, async (req, res) => {
  try {
    const {
      hotelIds, cityCode, checkInDate, checkOutDate, adults,
    } = req.body;
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      cityCode,
      checkInDate,
      checkOutDate,
      adults,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});




// POI  ..not used at this time potential for stretch goal
router.get(`/reference-data/locations/pois`, cache(400), async (req, res)=> {
 try {
  const { latitude, longitude } = req.body;
  const response = await  amadeus.referenceData.locations.pointsOfInterest.get({
         latitude, longitude
  });
  await res.json(JSON.parse(response.body));
} catch (err) {
  await res.json(err);
}
});

router.get('');

module.exports = router;
