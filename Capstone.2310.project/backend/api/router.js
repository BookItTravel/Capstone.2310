
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const Amadeus = require("amadeus");
const express = require("express");


// Create router
const router = express.Router();

// Create Amadeus API client
const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const API = "api";

//Flight
router.get(`/flight-search`, (req, res) => {
   const { originLocationCode, destinationLocationCode, departureDate, adults } = req.body
    // Find the cheapest flights
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
         adults
    }).then(function (response) {
        res.send(response.result);
    }).catch(function (response) {
        res.send(response);
    });
    });

    // Airports search
  router.get(`/city-and-airport-search/:parameter`, (req, res) => {
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

 // gettting location
  router.get(`/search-location`, async (req, res) => {
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

  router.get(`/city-hotels`, async (req, res) => {
    try {
      const { cityCode } = req.query;
      const response = await amadeus.referenceData.locations.hotels.byCity.get({
        cityCode
      })
      if (!response){
        return res.status(400).json({error: "No response" })
      }
      res.json(JSON.parse(response.body));
  
    } catch (err) {
      res.json(err);
    }
  });



    // Confirming the offer
    router.get(`/hotel-offers`, async (req, res) => {
      try {
        const { hotelId } = req.body;
        const response = await amadeus.referenceData.locations.hotels.byHotels.get({
          hotelId,
        });
        console.log(amadeus.referenceData.locations.hotels.byHotel)
        res.json(JSON.parse(response.body));
      } catch (err) {
        res.json(err);
      }
    });
    // Booking
  


// City search suggestions
router.get(`/${API}/search`, async (req, res) => {
  try {
    const { keyword } = req.body;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});


// POI
router.get(`/reference-data/locations/pois`, async (req, res)=> {
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

router.get(``)

module.exports = router;