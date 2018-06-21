// Store our API endpoint inside queryUrl
// greater than 1.5 magnitude quakes over the past week
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

////////////////
// CREATE MAP //
///////////////

// dark map from mapbox
var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYnJ5YW5sb3dlIiwiYSI6ImNqZ3p2bThxNTA4M3Yyd25vdGQxY2xqeXQifQ.URpIhwM_YJcAJYOyzbZEdQ");

// Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Dark Map": darkmap
};
// MAP
var map = L.map("map", {
  center: [
    25.00, 0.00
  ],
  zoom: 2,
  layers: [darkmap] 
});

//////////////////
// GET THE DATA //
/////////////////

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

  //function that determines the styles of the circles
  function styleInfo(feature) {
    return {
      //opacity: 1,
      fillOpacity: .8,
      fillColor: getColor(feature.properties.mag), 
      // color: "#000000",
      radius: getRadius(feature.properties.mag), 
      stroke: true,
      weight: 0.1
    };
  }

  // Return dynamic radius size for styleInfo radius
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 7/3;
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColor(magnitude) {
      switch (true) {
        case magnitude > 5:
          return "#084594";
        case magnitude > 4:
          return "#2171b5";
        case magnitude > 3:
          return "#4292c6";
        case magnitude > 2:
          return "#6baed6";
        case magnitude > 1:
          return "#9ecae1";
        default:
          return "#9ecae1";
      }
    }

// PLOT CIRCLES
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // set the style of the circles on the map
      style: styleInfo,
          // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(map);

////////////////////////////
// ADD LEGEND TO THE MAP //
//////////////////////////

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5],
          labels = ['Magnitude > 1','Magnitude > 2','Magnitude > 3','Magnitude > 4','Magnitude > 5' ];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(map);
 
}); // end of d3.json request
