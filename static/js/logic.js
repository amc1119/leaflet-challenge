 // Creating the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
});
//  // Create the tile layer that will be the background of our map.
//   let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);

// Adding the OpenTopoMap tile layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: © OpenTopoMap contributors',
    maxZoom: 17
}).addTo(myMap);

  // Use this link to get the GeoJSON data.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the data with d3.
d3.json(url).then(function(data) {

    features = data.features;

    // Render all earthquake data
    let allData = features.length;

    // Define markerSize() function that will give each earthquakee a different radius based on its size.
    function markerSize(mag) {
        return Math.sqrt(mag) * 50;
    }
  
    // Loop through the data.
    for (let i = 0; i < allData; i++) {
  
      // Set the earthquake coordinate data property to a variable.
      let earthquake = features[i].geometry;
      
      // Set the earthquake size property to a variable.
      let properites = features[i].properties;
  
        if(earthquake){
        // L.marker([earthquake.coordinates[1], earthquake.coordinates[0]]).addTo(myMap);
        L.circle([earthquake.coordinates[1], earthquake.coordinates[0]], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its size.
            radius: markerSize(properites[i].mag)
          }).bindPopup(`<h1>${properites[i].title}</h1> <hr> <h3>Magnitude: ${properites[i].mag.toLocaleString()}</h3>`).addTo(myMap);
        }
    }
  
  });

  