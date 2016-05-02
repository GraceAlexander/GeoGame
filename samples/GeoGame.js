//Global Variables
var maps = {};
var map = new AmCharts.AmMap();
var c = 0;
var submitClicked=false;
var countryToPick="US";
var index;

//Create and Render Map
AmCharts.ready(function() {
  createMap('world');
});

AmCharts.makeChart( "mapdiv", {
  "responsive": {
  "enabled": true,
  },
});

function createMap (country) {
    maps[country] = map;
    map.pathToImages = "http://www.amcharts.com/lib/3/images/";
    map.panEventsEnabled = true;
    map.backgroundColor = "#666666";
    map.backgroundAlpha = 1;
    map.zoomControl.panControlEnabled = false;
    map.zoomControl.zoomControlEnabled = true;

    var dataProvider = {
    map: country + "Low",
    getAreasFromMap: true,
    };

    map.dataProvider = dataProvider;
    
    map.areasSettings = {
        autoZoom: false,
        color: "#CDCDCD",
        colorSolid: "#5EB7DE",
        selectedColor: "#5EB7DE",
        outlineColor: "#666666",
        rollOverColor: "#88CAE7",
        rollOverOutlineColor: "#FFFFFF",
        selectable: true,
        balloonText: "",
        panEventsEnabled: true,

    };

    //Add interactivity with map (can click on different countries)
    map.addListener('clickMapObject', function (event) {
        if(c!=0)
        {
          c.showAsSelected=false;
           map.returnInitialColor(c);
        }
          c = event.mapObject;
        
        c.showAsSelected=true;

     // An object is always selected after initial click
        map.returnInitialColor(event.mapObject);
    });
    
    map.write(country);
}

//Update the map after submit is clicked
 function submitChoice(){

  for(var x in maps) {
    var map = maps[x];
    for (var i in map.dataProvider.areas) {
      var area = map.dataProvider.areas[i];
      //disable selection for each country
      area.selectable = false;
      area.rollOverColor= "#CDCDCD";
      area.rollOverOutlineColor= "#666666";
      if (area.id==countryToPick) {
        index=i;
      }
    }
  }
    //color the wrong country picked
    c.showAsSelected = true;
    c.selectedColor="#FF0000";

    //color the correct country picked, overwrites the above if they are the same
    map.dataProvider.areas[index].showAsSelected = true;
    map.dataProvider.areas[index].selectedColor="#00FF00";

  map.validateData();

};