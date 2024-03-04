 // Creating the map object
let myMap = L.map("map", {
    center: [40, -90],
    zoom: 3
});

// Adding the OpenTopoMap tile layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: © OpenTopoMap contributors',
    maxZoom: 17
}).addTo(myMap);

  // Use this link to get the GeoJSON data.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the data with d3.
d3.json(url).then(function(data) {

    // features = data.features;

  function styleInfo(feature){
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: '#000000',
      radius: markerSize(feature.properties.mag),
      stroke: true,
      weight: 0.5
    }
  }

    // Define markerSize() function that will give each earthquakee a different radius based on its size.
    function markerSize(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
        return magnitude * 4;
    }
    function getColor(depth) {
      switch (true) {
        case depth > 90:
          return "#ea2c2c";
        case depth > 70:
          return "#ea822c";
        case depth > 50:
          return "#ee9c00";
        case depth > 30:
          return "#eecc00";
        case depth > 10:
          return "#d4ee00";
        default:
          return "#98ee00";
      }
    }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng)
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: "
        + feature.properties.mag
        + "<br>Depth: "
        + feature.geometry.coordinates[2]
        + "<br>Location: "
        + feature.properties.place
      );
    }
  }).addTo(myMap);

  // Add the legend after the GeoJSON layer is added
  let legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function (map) {
    let div = L.DomUtil.create("div", "info legend");
    let grades = [-10, 10, 30, 50, 70, 90];
    let colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];

    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +='<i style="background:' + colors[i] + '"></i> ' +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + '<br>' : '+');
      // div.innerHTML += '<span class="color-box"></span>' +
      // '<span class="legend-label">' + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+") + '</span>';
    }

    return div;
  };

  legend.addTo(myMap);

  // Create the legend HTML
  // let legendHtml = '<div id="legend" class="legend">';
  // let grades = [-10, 10, 30, 50, 70, 90];
  // let colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];

  // for (let i = 0; i < grades.length; i++) {
  //   legendHtml +=
  //     '<div><i style="background:' + colors[i] + '"></i></div>' +
  //     '<span class="legend-label">' + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+") + '</span>';
  // }

  // legendHtml += '</div>';

  // // Append legend HTML to the map container
  // let legendContainer = L.DomUtil.create('div', 'legend-container');
  // legendContainer.innerHTML = legendHtml;
  // document.getElementById('map').appendChild(legendContainer);


});
  
    


  