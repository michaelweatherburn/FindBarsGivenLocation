// Initialize the Google Places service
let latitude = 0;
let longitude = 0;

function initialize() {
  const input = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");

  const autocomplete = new google.maps.places.Autocomplete(input);

  searchButton.addEventListener("click", () => {
    const location = input.value;
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.error("No details available for input: '" + place.name + "'");
      // Handle the case when the place does not have geometry information
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    latitude = lat;
    longitude = lng;
    console.log("lat and long are: " + lat + " and " + lng);
    console.log(location);
    findRestaurants(location);
  });
}

// Find nearby restaurants using the Google Places API
function findRestaurants(location) {
  console.log(location + " inFindRestFunction");

  const request = {
    //Lat and lng are New York
    //location: { lat: 40.7128, lng: -74.006 },
    location: {
      lat: latitude,
      lng: longitude,
    },
    radius: "500", // Search radius in meters (adjust as needed)
    type: ["bar"],
  };

  const service = new google.maps.places.PlacesService(
    document.getElementById("results")
  );

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayRestaurants(results);
    } else {
      alert("No restaurants found");
    }
  });
}

// Display the list of nearby restaurants
function displayRestaurants(restaurants) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  restaurants.forEach((restaurant) => {
    const restaurantName = restaurant.name;
    const restaurantAddress = restaurant.vicinity;

    const restaurantDiv = document.createElement("div");
    restaurantDiv.className = "mb-3";
    restaurantDiv.innerHTML = `
            <h4>${restaurantName}</h4>
            <p>${restaurantAddress}</p>
        `;
    console.log(restaurantName);
    console.log(restaurantAddress);
    resultsDiv.appendChild(restaurantDiv);
  });
}

// Load Google Maps API
function loadScript() {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8b-8r3kHxSD-hZEWbCNBRM2u7WYdkRlg&libraries=places&callback=initialize";
  document.head.appendChild(script);
}

window.onload = loadScript;
