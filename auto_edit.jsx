#target "aftereffects"

// Get the active composition
var activeComp = app.project.activeItem;

// Check if a composition is active
if (activeComp && activeComp instanceof CompItem) {
  // Get the selected layers in the timeline
  var selectedLayers = activeComp.selectedLayers;

  //find the audio layer -----------------------------------------
  var targetLayerName = "audio"; // Replace "LayerName" with the name of the layer you want to select
  // Get the layers in the composition
  var layers = activeComp.layers;
  // Iterate through the layers to find the target layer
  for (var i = 1; i <= layers.length; i++) {
    var layer = layers[i];
    
    // Check if the layer name matches the target name
    if (layer.name === targetLayerName) {
      // Select the target layer
      layer.selected = true;
      var audio_markers = layer.property("ADBE Marker");
      break; // Exit the loop since the target layer has been found
    }
  }
  // /---------------------------------------------------------------------------------------------------------------------------



  // Check if any layers are selected
  if (selectedLayers.length > 0) {

    for (var layer_idx = 0; layer_idx <= selectedLayers.length - 1; layer_idx ++) {
      // Get the first selected layer
      var selectedLayer = selectedLayers[layer_idx];
      var markerProperty = audio_markers

      if (markerProperty) {
        var numMarkers = markerProperty.numKeys; // Get the number of markers

        for (var i = numMarkers; i >= 2; i--) {
          var markerTime = markerProperty.keyTime(i); // Get the marker time

          var next_marker_time = markerProperty.keyTime(i - 1);

          // Duplicate the selected layer
          var duplicatedLayer = selectedLayer.duplicate();

          // Set the outPoint of the original layer to the marker time
          selectedLayer.outPoint = markerTime;

          // Set the inPoint of the duplicated layer to the marker time
          duplicatedLayer.inPoint = next_marker_time;

          duplicatedLayer.outPoint = markerTime;
          duplicatedLayer.inPoint = next_marker_time;
        }
    } else {
      alert("No markers found on the layer.");
    }
    }




  } else {
    alert("No layer selected in the timeline.");
  }
} else {
  alert("No composition open in Adobe After Effects.");
}
