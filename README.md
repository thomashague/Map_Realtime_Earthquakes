# Mapping with Javascript, Leaflet, D3, Mapbox

This project taught me how to pull live location data from an organization and display it meaningfully in a map. The map can be viewed on a website or locally on your computer. 

In a Javascript file, I first created the base map using leaflet and mapbox. Leaflet is the library used for creating maps, while mapbox provides template map layers you can add. 

Then I pulled geo json data on all earthquakes in the past 7 days from the United States Geological Survey using D3. (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

Next was plotting. Each earthquake is represented by a circle on the map, whose size and color reflect the magnitude.

Finally I added a map legend for the colors and magnitudes of earthquakes. 

After completing the logic of the Javascript file, I then passed it to my html file, displaying the map.
