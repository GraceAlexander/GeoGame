
/**
 * AmCharts.ready function handler is executed when the page loads
 * We are going to create both maps then. We'll store references to
 * all maps we create in the global maps variable so that we can
 * come back and get info from them later.
 */
var maps = {};

AmCharts.ready(function() {
  createMap('world');

});

AmCharts.makeChart( "chartdiv", {
  "responsive": {
    "enabled": true
  }
} );

/**
 * Creates a country map
 * $param country A map and container id
 */
function createMap (country) {
    var map = new AmCharts.AmMap();
    var country = 0;
    maps[country] = map;
    map.pathToImages = "http://www.amcharts.com/lib/3/images/";
    map.panEventsEnabled = true;
    map.backgroundColor = "#666666";
    map.backgroundAlpha = 1;
    
    map.zoomControl.panControlEnabled = false;
    map.zoomControl.zoomControlEnabled = true;

    var dataProvider = {
    map: country + "Low",
        getAreasFromMap: true
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

    };
    
    map.addListener('clickMapObject', function (event) {
        // deselect the area by assigning all of the dataProvider as selected object
        //map.showAsSelected= false
        //map.selectedObject = map.dataProvider;
        
        //event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

        if(country==0)
        {
          var=mapObject;
        }
        // bring it to an appropriate color
        map.returnInitialColor(event.mapObject);
    });

//    map.addListener("clickMapObject", function (event) {
//    alert( 'Clicked ID: ' + event.mapObject.id + ' (' + event.mapObject.title + ')' );
//});
    
    map.write(country);
}

function handleFormSubmit() {
  /**
   * Gather selected areas from all maps and populate
   * hidden fields with them
   */
   console.log(maps);
  for(var x in maps) {
  
    var map = maps[x];
    var states = [];
    for (var i in map.dataProvider.areas) {
      var area = map.dataProvider.areas[i];
      if (area.showAsSelected) {
        states.push(area.id);
      }
    }
    document.getElementById(x + '_field').value = states.join(',');
  }
  
  /**
   * Add submited info debug information (optional step)
   * We're going to use jQuery to keep the code simple. However, jQuery
   * is not necessary to run the maps - we're just using it here to
   * print out debug info.
   */
  var formData = [];
  jQuery('#user_form').find('input[type=hidden],input[type=text],input:checked').each(function () 
  {
    formData.push(this.name + ': <strong>' + this.value + '</strong>');
    if(this.value=="US") formData.push("You found it!"); else formData.push("Thats not right..");
  });
  document.getElementById('form-debug').innerHTML = formData.join('<br />');
  
  console.log(formData)
  /**
   * Prevent form from actually submitting.
   * We probably don't want it in real life situations.
   */
  return false;
}