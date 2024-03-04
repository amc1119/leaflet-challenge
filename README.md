# leaflet-challenge

# Creating USGS Earthquake Data Visualization
* Worked with tutor to create visualizations

1. Used the D3 library to access the URL `"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson` to read the USGS earthquake dataset for All Earthquakes from the Past 7 Days.

2. Imported and visualized data.

    i. Used Leaflet to create a map using the latitude and longitude values from the dataset to plot all earthquakes.

        a. Data markers reflect each earthquake's magnitude and depth by size and color, respectively. 

            ii. Higher magnitudes appear larger; greater depths appear darker.

        b. Included popups to provide additional earthquake information.

        c. Created a map legend.


## Additional Analysis: Gathering and Plotting More Data
1. Found the most recent date in the dataset.

2. Utilized AskBCS to create a query to obtain the previous 12 months of precipitation data.

3. Selected only the 'date' and 'prcp' values, loaded the query results into a Pandas DataFrame, and explicitly set the column names.

# Analyzing and Exploring Belly Button Biodiversity Dataset



# Organizing and Displaying Data
* Worked with tutor to create additional tile layer 'baseMaps' and 'overlayMaps'

1. Used the D3 library to access the URL `"https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json` to plot a second dataset to display tectonic plates and seismic activity.

2. Put the techtonic plates dataset and earthquakes dataset on the map as separate overlays that can be turned on and off independently.

3. Added "Topographic Light", "Carto Dark", and "Watercolor" 'baseMaps' to choose from. 

4. Added layer controls to the map.


