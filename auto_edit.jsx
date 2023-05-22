#target "aftereffects"

// Get the active composition
var activeComp = app.project.activeItem;

// Check if a composition is active
if (activeComp && activeComp instanceof CompItem) {
  // Get the selected layers in the timeline
  var selectedLayers = activeComp.selectedLayers;

  var targetLayerName = "audio"
  var layers = activeComp.layers;

  var audio_markers = find_audio_layer(layers,targetLayerName) //returns the audio markers in array format

  // ______________________ CUTTING ALL CLIPS ______________________
  // Check if any layers are selected
  if (selectedLayers.length > 0) {

    for (var layer_idx = 0; layer_idx <= selectedLayers.length - 1; layer_idx ++) {
      // Get the first selected layer
      var selectedLayer = selectedLayers[layer_idx];
      var markerProperty = audio_markers;

      if (markerProperty && markerProperty.numKeys > 0) {
        var numMarkers = markerProperty.numKeys; // Get the number of markers

        for (var i = numMarkers; i >= 2; i--) {
          cut_layer(markerProperty, selectedLayer);
        }
      } else {
        alert("No markers found on the layer.");
      }
    }
    } else {
      alert("No layer selected in the timeline.");
    }




    // ______________________ SELECTING AND SEQUENCING PART ______________________
    //select all layers in the in out point
    //go to each marker point
    // select all layers in the in out point
    //then select a layer to keep and the rest to delete
    //loop again to next marker point
    // Select all layers within the in/out points
    // Loop through the markers in reverse order


    for (var i = numMarkers; i >= 2; i--) {
      var markerTime = markerProperty.keyTime(i); // Get the marker time
      var nextMarkerTime = markerProperty.keyTime(i - 1);
      var duplicatedLayer = selectedLayer.duplicate();

      // Set the in/out points of the selected and duplicated layers
      selectedLayer.outPoint = markerTime;
      duplicatedLayer.inPoint = nextMarkerTime;

      duplicatedLayer.outPoint = markerTime;
      duplicatedLayer.inPoint = nextMarkerTime;

      // Select all layers within the in/out points
      selectLayersInTimeRange(activeComp, nextMarkerTime, markerTime);

      // Randomly select a layer to keep
      var layersToKeep = activeComp.selectedLayers;

      if (layersToKeep.length > 0) {
        var keepIndex = Math.floor(Math.random() * layersToKeep.length);
        for (var j = 0; j < layersToKeep.length; j++) {
          if (j !== keepIndex) {
            layersToKeep[j].remove();
          }
        }
      }
    }
} else {
  alert("No composition open in Adobe After Effects.");
}



function find_audio_layer(layers, target_layer_name) {
  // Find the audio layer
  var targetLayerName = target_layer_name;
  var audio_markers = null; 
  // Iterate through the layers to find the target layer
  for (var i = 1; i <= layers.length; i++) {
    var layer = layers[i];
    
    // Check if the layer name matches the target name
    if (layer.name === targetLayerName) {
      // Select the target layer
      layer.selected = true;
      audio_markers = layer.property("ADBE Marker"); // Remove 'var' keyword to update the global variable
      break; // Exit the loop since the target layer has been found
    }
  }
  return audio_markers;
}



function cut_layer(markerProperty, selectedLayer) {
  var markerTime = markerProperty.keyTime(i); // Get the marker time
  var nextMarkerTime = markerProperty.keyTime(i - 1);
  var duplicatedLayer = selectedLayer.duplicate();

  
  selectedLayer.outPoint = markerTime; // Set the outPoint of the original layer to the marker time
  duplicatedLayer.inPoint = nextMarkerTime; // Set the inPoint of the duplicated layer to the marker time
  
  duplicatedLayer.outPoint = markerTime;
  duplicatedLayer.inPoint = nextMarkerTime;
}



function selectLayersInTimeRange(comp, inPoint, outPoint) {
  for (var i = 1; i <= comp.numLayers; i++) {
    var layer = comp.layer(i);
    if (layer.inPoint >= inPoint && layer.outPoint <= outPoint) {
      layer.selected = true;
    } else {
      layer.selected = false;
    }
  }
}