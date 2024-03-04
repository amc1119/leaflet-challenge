// Use this link to get the GeoJSON data.
let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

let quakeLayer = L.layerGroup();
let plateLayer = L.layerGroup();


// Get the data with d3.
d3.json(earthquakeUrl).then(function(data) {

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
  }).addTo(quakeLayer);

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

});
  
// Get the data with d3.
d3.json(platesUrl).then(function(data) {

plateStyleInfo = {
    opacity: 1,
    fillOpacity: 1,
    color: '#FF5733',
    weight: 2
  }

  L.geoJson(data, {
    // We set the style for each plate techtonic using our plateStyleInfo function.
    style: plateStyleInfo
  }).addTo(plateLayer);

});
    

// Adding the topoLightMap tile layer
let topoLightMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: © OpenTopoMap contributors',
  maxZoom: 17
});

// Adding the topoDarkMap tile layer
let topoDarkMap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
  maxZoom: 17
});

// Adding the topoDarkMap tile layer
let stamen_watercolorMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
  maxZoom: 17
});
// https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg


let baseMaps = {
"Topographic Light": topoLightMap,
"Carto Dark": topoDarkMap,
"Watercolor": stamen_watercolorMap
}

let overlayMaps = {
  "Earthquakes": quakeLayer,
  "Techtonic Plates": plateLayer,
  }

// Creating the map object
let myMap = L.map("map", {
  center: [40, -90],
  zoom: 3,
  layers: [topoLightMap, quakeLayer]
});

let layersControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


  