// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

// Initialize all the LayerGroups that we'll use.
var layers = {
  Explosions: new L.LayerGroup(),
  Battles: new L.LayerGroup(),
  Violence_Against_Civilians: new L.LayerGroup(),
  Protests: new L.LayerGroup(),
  Riots: new L.LayerGroup(),
  Strategic_Developments: new L.LayerGroup(),
};

// Create the map with our layers.
var map = L.map("map", {
  center: [48.01, 34.01],
  zoom: 6.45,
  layers: [layers.Explosions, layers.Battles, layers.Violence_Against_Civilians, layers.Protests, layers.Riots, layers.Strategic_Developments],
});

//Create Sidebar
var sidebar = L.control.sidebar('sidebar', {
  position: 'left'
});

map.addControl(sidebar);


// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
var overlays = {
  Explosions: layers.Explosions,
  Battles: layers.Battles,
  Violence_Against_Civilians: layers.Violence_Against_Civilians,
  Protests: layers.Protests,
  Riots: layers.Riots,
  Strategic_Developments: layers.Strategic_Developments,
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map.
var info = L.control({
  position: "bottomright",
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function () {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
info.addTo(map);

// Initialize an object that contains icons for each layer group.
var icons = {
  Explosions: L.ExtraMarkers.icon({
    icon: "ion-planet:before",
    iconColor: "white",
    markerColor: "red",
    shape: "star",
    // fillOpacity: 0.5,
  }),
  Battles: L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "yellow",
    markerColor: "purple",
    shape: "penta",
  }),
  Violence_Against_Civilians: L.ExtraMarkers.icon({
    icon: "ion-android-people",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "star",
  }),
  Protests: L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "purple",
    markerColor: "yellow",
    shape: "penta",
  }),
  Riots: L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "white",
    markerColor: "green",
    shape: "star",
  }),
  Strategic_Developments: L.ExtraMarkers.icon({
    icon: "fa-spinner",
    iconColor: "white",
    markerColor: "black",
    shape: "penta",
  }),
};

// Create an object to keep the number of markers in each layer.
const IncidentCount = {
  Explosions: 0,
  Battles: 0,
  Violence_Against_Civilians: 0,
  Protests: 0,
  Riots: 0,
  Strategic_Developments: 0,
  Unknown: 0,
};

// Getting our GeoJSON data
d3.json("../../Templates/geojson.json").then(function (data) {
  // console.log(data);
  
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      let icontype = "";

      switch (feature.properties.EVENT_TYPE) {
        case "Explosions":
          IncidentCount.Explosions += 1;
          icontype = "Explosions";
          break;

        case "Battles":
          IncidentCount.Battles += 1;
          icontype = "Battles";
          break;

        case "Violence against civilians":
          IncidentCount.Violence_Against_Civilians += 1;
          icontype = "Violence_Against_Civilians";
          break;

        case "Protests":
          IncidentCount.Protests += 1;
          icontype = "Protests";
          break;

        case "Riots":
          IncidentCount.Riots += 1;
          icontype = "Riots";
          break;

        case "Strategic developments":
          IncidentCount.Strategic_Developments += 1;
          icontype = "Strategic_Developments";
          break;

        default:
          IncidentCount.Unknown += 1;
          console.log(`Unknown event type: ${feature.properties.EVENT_TYPE}`);
      }

      if (icontype) {
        let marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
          icon: icons[icontype],
        });

        try {
          marker.addTo(layers[icontype]);
          marker.bindPopup(`<h3> ${feature.properties.LOCATION}`);
          marker.on({
            click: function(event){
              sidebar.show()
              sidebar.setContent(`<h3> ${feature.properties.LOCATION} </h3>
              <br /><b>Fatalities:</b> ${feature.properties.FATALITIES}
              <br />
              <br /><b>Date:</b> ${feature.properties.EVENT_DATE} 
              <br />             
              <br /><b>Event:</b> ${feature.properties.EVENT_TYPE} 
              <br />
              <br /><b>SubEvent:</b> ${feature.properties.SUB_EVENT_TYPE} 
              <br />
              <br /><b>Source:</b> ${feature.properties.SOURCE}
              <br />              
              <br /><b>Actor:</b> ${feature.properties.ACTOR1}
              <br />
              <br />
              <br /><b>Details:</b> ${feature.properties.NOTES}`);
            }
          })

        } catch (e) {
          console.log(e);
          console.log(icontype);
        }
      }
    },
  });


  // console.log(IncidentCount);

  // Call the updateLegend function, which will update the legend!
  updateLegend(IncidentCount);
});

function updateLegend(incidentCount) {
  document.querySelector(".legend").innerHTML = [
    // "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='Explosions'>Explosions: " + incidentCount.Explosions +"</p>",
    "<p class='Battles'>Battles: " + incidentCount.Battles + "</p>",
    "<p class='Violence_Against_Civilians'>Violence against civilians: " + incidentCount.Violence_Against_Civilians + "</p>",
    "<p class='Strategic_Developments'>Strategic Developments: "+ incidentCount.Strategic_Developments + "<p>",
    "<p class='Protests'>Protests: " + incidentCount.Protests + "</p>",
    "<p class='Riots'>Riots: " + incidentCount.Riots + "</p>"
  ].join("");
}
