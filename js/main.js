    window.onload = function() {
	  
		function numberWithCommas(x) {
	  	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

// -------------------------------
// Map object with 'createLayer' method, using Mapbox basemap

    L.mapbox.accessToken = 'pk.eyJ1IjoiaXdzc3R1YXJ0IiwiYSI6InNaNzMzVXMifQ.OFDL1zM5OjRUHcL_Y5htCA';
  
    // Choose center and zoom level
	  var options = {
	    center: [40.75, -73.94], // NYC
	    zoom: 11,
	    zoomControl: false
	  }

	  // Instantiate map object on specified DOM element
	  var map_object = new L.mapbox.map('map', 'mapbox.dark', options);

	  // Set new zoomControl position
		new L.Control.Zoom({ position: 'topright' }).addTo(map_object);

		var sublayers = [];

// ----------------------------------------
// Code from original site ( via Javi Santana - http://bl.ocks.org/javisantana/8313604 )
// Highlight buildings on hover

    var polygons = {};

	  function geometryHover(map, layer) {

      options = options || {}
      var HIGHLIGHT_STYLE = {
        weight: 3,
        color: '#FFFFFF',
        opacity: 1,
        fillColor: '#FFFFFF',
        fillOpacity: 0.3
      };
      style = options.style || HIGHLIGHT_STYLE;
      var polygonsHighlighted = [];

    	// fetch the geometry	
	    var sql = new cartodb.SQL({ user: 'iwsstuart', format: 'geojson' });
			// sql.execute("select cartodb_id, the_geom from building_0814_energy_3857").done(function(data) {	 
	  //     var features = data.features;

			// 	for(var i = 0; i < features.length; ++i) {
	  //       var f = data.features[i];
	  //       var key = f.properties.cartodb_id

	  //       // generate geometry
	  //       var geo = L.GeoJSON.geometryToLayer(features[i].geometry);
	  //       geo.setStyle(style);

	  //       // add to polygons
	  //       polygons[key] = polygons[key] ||  [];
	  //       polygons[key].push(geo);
	  //     }
	  //   });

      function featureOver(e, pos, latlng, data) {
        featureOut();
        var pol = polygons[data.cartodb_id] || [];
        for(var i = 0; i < pol.length; ++i) {
          map.addLayer(pol[i]);
          polygonsHighlighted.push(pol[i]);
        }

      }

      function featureOut() {
        var pol = polygonsHighlighted;
        for(var i = 0; i < pol.length; ++i) {
          map.removeLayer(pol[i]);
        }
        polygonsHighlighted = [];
      }

      layer.on('featureOver', featureOver);
      layer.on('featureOut', featureOut);
      
 			layer.on('featureClick', function(e, latlng, pos, data) {
				
				var streetnum = data.street_num;
        var streetname = data.street_nam;
        var address = streetnum + " " + streetname;
        var floorArea = data.floor_area;
        var bldgHeight = data.height_roo;
        var eui = data.source_eui;
	    	var ghg = data.total_ghg / data.buildings;
        var energyStar = data.energy_star;
        var zip = data.zip;
				
				$('#building-address').html(address.toUpperCase());
				
				if (floorArea == null) {
					$('#floor-area h4').html("--");	
				} else {
					$('#floor-area h4').html(numberWithCommas(floorArea));
				}

				if (bldgHeight == null) {
					$('#building-height h4').html("--");
				} else {
					$('#building-height h4').html(numberWithCommas(Math.round(bldgHeight)));
				}		

				if (eui == null) {
					$('#source-eui h4').html("--");
				} else {
					$('#source-eui h4').html(eui);
				}

				if (data.total_ghg == null || data.buildings == null) {
					$('#ghg-emissions h4').html("--");	
				} else {	
					$('#ghg-emissions h4').html(ghg);	
				} 

				if (energyStar == 'Exempt') {
					$('#energy-star h4').html('exempt');
				} else if (energyStar == null) {			
					$('#energy-star h4').html("--");
				} else {
					$('#energy-star h4').html(energyStar);	
				}							

			});
      
      layer.setInteraction(true);	  	        
	  
	  }


// --------------------------------		
// Add data layers using viz.json object and 'createLayer'
		
		var vizjson = 'https://iwsstuart.cartodb.com/api/v2/viz/3ba4fb98-3787-11e4-8355-0e10bcd91c2b/viz.json';
	  cartodb.createLayer(map_object, vizjson).addTo(map_object) 
		  .on('done', function(layer) {
	      
	      // Add buildings layer to sublayers array
	      var sublayer = layer.getSubLayer(0);
	      sublayers.push(sublayer);

		  	activeQuery = sublayers[0].getSQL();

	      geometryHover(map_object, layer.getSubLayer(0));

	    })
	    .on('error', function(err) {
	      alert("Error: " + err);
	    }); 


	  // Set color scheme for buildings layer from control panel  
  	$('.colors .list-group-item').click( function() {
		  var colorScheme = $(this).attr('id');
		  sublayers[0].set({
		  	cartocss: $('#' + colorScheme).html()
		  });  
		});


	  // Filter buildings displayed on map
	  var typeFilter = false;
	  var boroughFilter = false;

	  // Filter buildings by type

  	$('.type #multifamily').click( function() {
		  if ($(this).hasClass('active')) {
				if (boroughFilter) {
					sublayers[0].set({
			  		sql: boroughQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				typeFilter = false;	  	
		  } else if (boroughFilter) {
				sublayers[0].set({
			  	sql: boroughQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Multifamily Housing'"
			  });	  		
	  		typeQuery = "SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Multifamily Housing'";			
				typeFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Multifamily Housing'"
			  });  
	  		typeQuery = sublayers[0].getSQL();
				console.log(activeQuery);
				typeFilter = true;
			}
		});

		$('.type #office').click( function() {
		  if ($(this).hasClass('active')) {
				if (boroughFilter) {
					sublayers[0].set({
			  		sql: boroughQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				typeFilter = false;	  	
		  } else if (boroughFilter) {
				sublayers[0].set({
			  	sql: boroughQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Office'"
			  });	  		
	  		typeQuery = "SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Office'";			
				typeFilter = true;
	  	} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Office'"
			  });  
	  		typeQuery = sublayers[0].getSQL();
				console.log(activeQuery);
				typeFilter = true;
			}
		});

		$('.type #other').click( function() {
		  if ($(this).hasClass('active')) {
				if (boroughFilter) {
					sublayers[0].set({
			  		sql: boroughQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				typeFilter = false;	  	
		  } else if (boroughFilter) {
				sublayers[0].set({
			  	sql: boroughQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE property_t is not null and property_t != 'Multifamily Housing' and property_t != 'Office'"
			  });	  		
	  		typeQuery = "SELECT * FROM building_0814_energy_3857 WHERE property_t is not null and property_t != 'Multifamily Housing' and property_t != 'Office'";
				typeFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE property_t is not null and property_t != 'Multifamily Housing' and property_t != 'Office'"
			  });  
	  		typeQuery = sublayers[0].getSQL();
				typeFilter = true;
			}
		});

	 	$('.type #no-data').click( function() {
		  if ($(this).hasClass('active')) {
				if (boroughFilter) {
					sublayers[0].set({
			  		sql: boroughQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				typeFilter = false;	  	
		  } else if (boroughFilter) {
				sublayers[0].set({
			  	sql: boroughQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE property_t is null"
			  });	  		
	  		typeQuery = "SELECT * FROM building_0814_energy_3857 WHERE property_t is null";
				typeFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE property_t is null"
			  });  
	  		typeQuery = sublayers[0].getSQL();
				typeFilter = true;
			}
		});


	  // Filter by borough

  	$('.borough #manhattan').click( function() {
		  if ($(this).hasClass('active')) {
				if (typeFilter) {
					sublayers[0].set({
			  		sql: typeQuery
			  	});
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}
				boroughFilter = false;	  	
		  } else if (typeFilter) {
				sublayers[0].set({
			  	sql: typeQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE borough = 'MANHATTAN'"
			  });	  		
	  		boroughQuery = "SELECT * FROM building_0814_energy_3857 WHERE borough = 'MANHATTAN'"
				boroughFilter = true;
	  	} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'MANHATTAN'"
			  });  
	  		boroughQuery = sublayers[0].getSQL();
				boroughFilter = true;
			}
		});

		$('.borough #queens').click( function() {
		  if ($(this).hasClass('active')) {
				if (typeFilter) {
					sublayers[0].set({
			  		sql: typeQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				boroughFilter = false;	  	
		  } else if (typeFilter) {
				sublayers[0].set({
			  	sql: typeQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE borough = 'QUEENS'"
			  });	  		
	  		boroughQuery = "SELECT * FROM building_0814_energy_3857 WHERE borough = 'QUEENS'"
				boroughFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'QUEENS'"
			  });  
	  		boroughQuery = sublayers[0].getSQL();
				boroughFilter = true;
			}
		});

		$('.borough #bronx').click( function() {
		  if ($(this).hasClass('active')) {
				if (typeFilter) {
					sublayers[0].set({
			  		sql: typeQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				boroughFilter = false;	  	
		  } else if (typeFilter) {
				sublayers[0].set({
			  	sql: typeQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE borough = 'BRONX'"
			  });	  		
	  		boroughQuery = "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BRONX'"
				boroughFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BRONX'"
			  });  
	  		boroughQuery = sublayers[0].getSQL();
				boroughFilter = true;
			}
		});

	 	$('.borough #staten-island').click( function() {
		  if ($(this).hasClass('active')) {
				if (typeFilter) {
					sublayers[0].set({
			  		sql: typeQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				boroughFilter = false;	  	
		  } else if (typeFilter) {
				sublayers[0].set({
			  	sql: typeQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE borough = 'STATEN ISLAND'"
			  });	  		
	  		boroughQuery = "SELECT * FROM building_0814_energy_3857 WHERE borough = 'STATEN ISLAND'"
				boroughFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'STATEN ISLAND'"
			  });  
	  		boroughQuery = sublayers[0].getSQL();
				boroughFilter = true;
			}
		});

		$('.borough #brooklyn').click( function() {
		  if ($(this).hasClass('active')) {
				if (typeFilter) {
					sublayers[0].set({
			  		sql: typeQuery
			  	});	
				} else {
					sublayers[0].set({
			  		sql: "SELECT * FROM building_0814_energy_3857"
			  	});
				}	  	
				boroughFilter = false;	  	
		  } else if (typeFilter) {
				sublayers[0].set({
			  	sql: typeQuery + " INTERSECT SELECT * FROM building_0814_energy_3857 WHERE borough = 'BROOKLYN'"
			  });	  		
	  		boroughQuery = "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BROOKLYN'"
				boroughFilter = true;
			} else { 	
				sublayers[0].set({
			  	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BROOKLYN'"
			  });  
	  		boroughQuery = sublayers[0].getSQL();
				boroughFilter = true;
			}
		});


		// Toggle circle on and off
		$('.list-group-item').click( function() {
			if ($(this).hasClass('active')) {
				$(this).children('span')
					.toggleClass('fa-circle-thin')
					.toggleClass('fa-circle');				
			} else {
				$(this).parent().children('.active')
					.removeClass('active')
					.children('span')
						.toggleClass('fa-circle-thin')
						.toggleClass('fa-circle');
				$(this).children('span')
					.toggleClass('fa-circle-thin')
					.toggleClass('fa-circle');				
			} 
			$(this).toggleClass('active');
		});

// -------------------------------
// Custom legend
    
    // var legend = new cdb.geo.ui.Legend({
    //   type: "choropleth",
    //   data: [
    //     { value: "10" },
    //     { value: "20" },
    //     { name: "color1", value: "#F00" },
    //     { name: "color2", value: "#0F0" },
    //     { name: "color3", value: "#00F" }
    //   ]
    // });

    // $('#map').append(legend.render().el);

	

// --------------------------------	
// One way to introduce interactive styling

		var bldgLayerActions = {

		  ghg: function(){
		    sublayers[0].set({
		    	cartocss: "#building_0814_energy_3857 [ total_ghg <= 9383283.01] { polygon-fill: #91003F; }\
							#building_0814_energy_3857 [ total_ghg <= 2334.88] { polygon-fill: #CE1256; }\
							#building_0814_energy_3857 [ total_ghg <= 1240.7] { polygon-fill: #E7298A; }\
							#building_0814_energy_3857 [ total_ghg <= 808.62] { polygon-fill: #DF65B0; }\
							#building_0814_energy_3857 [ total_ghg <= 587.96] { polygon-fill: #C994C7; }\
							#building_0814_energy_3857 [ total_ghg <= 444.26] { polygon-fill: #D4B9DA; }\
							#building_0814_energy_3857 [ total_ghg <= 318.97] { polygon-fill: #F1EEF6; }"
		    });
		    return true;
		  },
		  eui: function(){
		    sublayers[0].set({
		    	cartocss: "#building_0814_energy_3857 [ source_eui <= 576072] { polygon-fill: #91003F; }\
							#building_0814_energy_3857 [ source_eui <= 303.5] { polygon-fill: #CE1256; }\
							#building_0814_energy_3857 [ source_eui <= 227.7] { polygon-fill: #E7298A; }\
							#building_0814_energy_3857 [ source_eui <= 183.8] { polygon-fill: #DF65B0; }\
							#building_0814_energy_3857 [ source_eui <= 148.4] { polygon-fill: #C994C7; }\
							#building_0814_energy_3857 [ source_eui <= 115.4] { polygon-fill: #D4B9DA; }\
							#building_0814_energy_3857 [ source_eui <= 80.7] { polygon-fill: #F1EEF6; }"
		    });
		    return true;
		  }
		
		}

		$('.button').click( function() {
		  $('.button').removeClass('selected');
		  $(this).addClass('selected');
		  bldgLayerActions[$(this).attr('id')]();
		});

		}
