$(document).ready(function() {

	 // fix main navbar to top
	$(window).scroll(function () {
		// console.log($(window).scrollTop());
		if ($(window).scrollTop() >= 240) {
			$('#nav-main').addClass('fixed');
		} else {
			$('#nav-main').removeClass('fixed');
		}	
	});

	$('#ghg, #eui').click(function () {
		$('#legend').removeClass('desaturate');
		$('.quartile').css('visibility', 'visible');
		$('#colorbar-grey').css('visibility', 'hidden');
	});

	$('#clearcolors').click(function () {
		$('#legend').addClass('desaturate');
		$('.quartile').css('visibility', 'hidden');
		$('#colorbar-grey').css('visibility', 'visible');
		$('.current-color-option').html(currentColor);
		$('.current-color-option').removeClass('current-color-option');
	});

	$('#menu-arrow').click(function () {
		if ($('#menu-panel').css('right') == '-350px') {
			$('#menu-panel').addClass('active');
			$('#menu-arrow-bar').addClass('active');
			// $('#menu-arrow-bar').addClass('active');
			$('#menu-arrow').removeClass('rotated');
			if(!($('#menu-search').hasClass('current')) && !($('#menu-info').hasClass('current'))) {
				$('#menu-search').addClass('current');
			}
		} else {
			$('#menu-panel').removeClass('active');
			$('#menu-arrow-bar').removeClass('active');
			// $('#menu-arrow-bar').removeClass('active');
			$('#menu-arrow').addClass('rotated');
		}
	});

	$('#menu-info').click(function () {
		
		if ($('#menu-panel').css('right') == '-350px') {
			$('#menu-panel').addClass('active');
			$('#menu-search').removeClass('current');
			$(this).addClass('current');
			if ($('#bldg-data').hasClass('hidden')) {
				$('#filters').addClass('hidden');
				$('#bldg-data').removeClass('hidden');
				$('#menu-search').removeClass('current');
				$(this).addClass('current');
			}
		} else if ($('#menu-panel').css('right') == '0px') {
			if ($('#bldg-data').hasClass('hidden')) {
				$('#filters').addClass('hidden');
				$('#bldg-data').removeClass('hidden');
				$('#menu-search').removeClass('current');
				$(this).addClass('current');
			} else {
				$('#menu-panel').removeClass('active');
				$(this).removeClass('current');
			}
		}
	});

	$('#menu-search').click(function () {

		if ($('#menu-panel').css('right') == '-350px') {
			$('#menu-info').removeClass('current');
			$(this).addClass('current');
			$('#menu-panel').addClass('active');
			if ($('#filters').hasClass('hidden')) {
				$('#bldg-data').addClass('hidden');
				$('#filters').removeClass('hidden');
				$('#menu-info').removeClass('current');
				$(this).addClass('current');
			}
		} else if ($('#menu-panel').css('right') == '0px') {
			if ($('#filters').hasClass('hidden')) {
				$('#bldg-data').addClass('hidden');
				$('#filters').removeClass('hidden');
				$('#menu-info').removeClass('current');
				$(this).addClass('current');
			} else {
				$('#menu-panel').removeClass('active');
				$(this).removeClass('current');
			}
		}
	});

	$('.filter-option').click( function () {
		var current = $(this).html();

		if (current == 'floor area') {
			if ($('.floor-area').hasClass('current-filter')) {
				$('.floor-area').removeClass('current-filter');
				$('.floor-area').slideUp(100);
			} else {
				$('.floor-area').slideDown(100);
				$('.current-filter').slideUp(100);
				$('.current-filter').removeClass('current-filter');	
				$('.floor-area').addClass('current-filter');
			}
		} else if (current == 'building type') {
			if ($('.building-type').hasClass('current-filter')) {
				$('.building-type').removeClass('current-filter');
				$('.building-type').slideUp(100);
			} else {
				$('.building-type').slideDown(100);
				$('.current-filter').slideUp(100);	
				$('.current-filter').removeClass('current-filter');	
				$('.building-type').addClass('current-filter');
			}
		} else if (current == 'borough') {
			if ($('.borough').hasClass('current-filter')) {
				$('.borough').removeClass('current-filter');
				$('.borough').slideUp(100);
			} else {
				$('.borough').slideDown(100);
				$('.current-filter').slideUp(100);	
				$('.current-filter').removeClass('current-filter');	
				$('.borough').addClass('current-filter');
			}
		// } else if (current == 'greenhouse gas emissions') {
		// 	if ($('.building-type').hasClass('current')) {
		// 		$('.building-type').removeClass('current');
		// 		$('.building-type').slideUp(100);
		// 	} else {
		// 		$('.building-type').slideDown(100);
		// 		$('.current').slideUp(100);	
		// 		$('.current').removeClass('current');	
		// 		$('.building-type').addClass('current');
		// 	}
		// } else if (current == 'energy use intensiy') {
		// 	if ($('.building-type').hasClass('current')) {
		// 		$('.building-type').removeClass('current');
		// 		$('.building-type').slideUp(100);
		// 	} else {
		// 		$('.building-type').slideDown(100);
		// 		$('.current').slideUp(100);	
		// 		$('.current').removeClass('current');	
		// 		$('.building-type').addClass('current');
		// 	}
		} else if (current == 'clear filters') {
			$('.current-filter').slideUp(100);	
			$('.current-filter').removeClass('current-filter');
			$('.current-bldg-type').html(type);
		} 
	});

	var type;
	$('.building-type a h5').click( function() {
		$('.current-bldg-type').html(type);
		$('.current-bldg-type').removeClass('current-bldg-type');
		type = $(this).html();
		// $(this).html(type + '<img class="check" src="img/check_black.png" height="10px" width="10px" />');
		$(this).addClass('current-bldg-type');
	});

	$('.borough img').click( function() {
		$('.current-borough').removeClass('current-borough');
		$(this).addClass('current-borough');	
	});

	var currentColor;
	$('.color-option').click( function() {
		if (!$(this).hasClass('current-color-option')) {
			$('.current-color-option').html(currentColor);
			$('.current-color-option').removeClass('current-color-option');
			currentColor = $(this).html();
			// $(this).html(currentColor + '<img class="check" src="img/check_black.png" height="10px" width="10px" />');
			$(this).addClass('current-color-option');
		}
	});

	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	//  // create leaflet map
	// var map = L.map('map', {
	// 	zoomControl: true,
	// 	center: [40.75, -73.985],
	// 	zoom: 12,
	// 	minZoom: 11
	// });

	// add a base layer
	mapboxgl.accessToken = 'pk.eyJ1IjoiaXdzc3R1YXJ0IiwiYSI6InNaNzMzVXMifQ.OFDL1zM5OjRUHcL_Y5htCA';
		var map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/iwsstuart/cik63h8a6008zn8m7kbst5vio', //stylesheet location
	    center: [-73.985,40.75], // starting position
	    zoom: 11 // starting zoom
	});

	$('#menu-panel').mouseover( function() {
		map.dragging.disable();
		map.scrollWheelZoom.disable();
		map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.boxZoom.disable();
		map.keyboard.disable();
		cartodb.geo.ui.Tooltip.disable;
	});

	$('#menu-panel').mouseout( function() {
		map.dragging.enable();
		map.scrollWheelZoom.enable();		
		map.touchZoom.enable();
		map.doubleClickZoom.enable();
		map.boxZoom.enable();
		map.keyboard.enable();
		cartodb.geo.ui.Tooltip.enable;
	});
		
	// L.tileLayer('http://{s}.tiles.mapbox.com/v3/iwsstuart.fec6be2f/{z}/{x}/{y}.png', {
	// 	attribution: 'mapbox'
	// }).addTo(map);

	// function geometryClick() {
	// 	var address = sql.execute("select streetnum from building_0814_energy_3857 where cartodb_id = " + id)
	// 	$('#bldg-data h2').html(address);
	// }

	var polygons = {};

	function geometryHover(username, map, layer, options) {

          options = options || {}
          var HIGHLIGHT_STYLE = {
            weight: 3,
            color: '#FFFFFF',
            opacity: 1,
            fillColor: '#999999',
            fillOpacity: 1
          };
          var SELECT_STYLE = {
            weight: 3,
            color: '#FFFFFF',
            opacity: 1,
            fillColor: '#000',
            fillOpacity: 1
          };
          style = options.style || HIGHLIGHT_STYLE;

          var polygonsHighlighted = [];
          var geo;
          var key;

          // fetch the geometry
          var sqlGeoJson = new cartodb.SQL({ user: username, format: 'geojson' });
          sqlGeoJson.execute("select cartodb_id, the_geom from building_0814_energy_3857").done(function(geojson) {
            features = geojson.features;
            for(var i = 0; i < features.length; ++i) {
              var f = geojson.features[i];
              key = f.properties.cartodb_id

              // generate geometry
              geo = L.GeoJSON.geometryToLayer(features[i].geometry);
              geo.setStyle(style);

              // add to polygons
              polygons[key] = polygons[key] ||  [];
              polygons[key].push(geo);

            }
          });

          var sqlJson = new cartodb.SQL({ user: username, format: 'json' });
          sqlJson.execute("SELECT floor_area FROM building_0814_energy_3857").done(function(data) {
          	console.log(data.rows[0]);
          });

          function featureOver(e, pos, latlng, data) {
            featureOut();
            var id = data.cartodb_id;
            var pol = polygons[data.cartodb_id] || [];
            
            for(var i = 0; i < pol.length; ++i) {
              map.addLayer(pol[i]);
              polygonsHighlighted.push(pol[i]);
            }

            var streetnum = data.street_num;
            var streetname = data.street_nam;
            var address = streetnum + " " + streetname;
            var floorArea = data.floor_area;
            var bldgHeight = data.height_roo;
            var eui = data.source_eui;
        	var ghg = data.total_ghg / data.buildings;
            var energyStar = data.energy_star;
            var zip = data.zip;

            $(pol).click(function() {
            	map.setView(pos, 15);
            	$('#menu-panel').addClass('active');
            	$('#menu-arrow-bar').addClass('active');
            	$('#menu-arrow').removeClass('rotated');
            	$('#streetview').css('display', 'block');
            	if ($('#bldg-data').hasClass('hidden')) {
					$('#filters').addClass('hidden');
					$('#bldg-data').removeClass('hidden');
					$('#menu-info').addClass('current');
					$('#menu-search').removeClass('current');

				}
				$('.value h5').removeClass('hidden');
				$('#bldg-data h3').html(address.toLowerCase());
				
				if (floorArea == null) {
					$('.floor-area-data h2').html("--");	
				} else {
					$('.floor-area-data h2').html(numberWithCommas(floorArea));
				}
				if (bldgHeight == null) {
					$('.bldg-height h2').html("--");
				} else {
					$('.bldg-height h2').html(numberWithCommas(Math.round(bldgHeight)));
				}
				if (eui == null) {
					$('.eui h2').html("--");
				} else {
					$('.eui h2').html(eui);
				}
				if (data.total_ghg == null || data.buildings == null) {
					$('.ghg h2').html("--");	
				} else {	
					$('.ghg h2').html(ghg);	
				}
				if (energyStar == 'Exempt') {
					$('.energy-star h2').html('exempt');
				} else if (energyStar == null) {			
					$('.energy-star h2').html("--");
				} else {
					$('.energy-star h2').html(energyStar);	
				}
				$('#streetview').attr('src', 'http://maps.googleapis.com/maps/api/streetview?size=640x480&location=' + streetnum + " " + streetname + " " + zip)
				map.removeLayer(pol[i]);
           	});
          }

          function featureOut() {
            var pol = polygonsHighlighted;
            for(var i = 0; i < pol.length; ++i) {
              map.removeLayer(pol[i]);
            }
          }

          layer.on('featureOver', featureOver);
          layer.on('featureOut', featureOut); 
          layer.setInteraction(true);

          $('#menu-panel').mouseover( function () {
          	layer.setInteraction(false);
          });

          $('#menu-panel').mouseout( function () {
          	layer.setInteraction(true);
          });
        }

   //      function center() {
   //      	layer.on('featureClick', function(e, latlng, pos, data, layer) {
			//     map.fitBounds(layer);
			// });
   //      } 

		var sublayers = [];

        cartodb.createLayer(map, 'http://iwsstuart.cartodb.com/api/v2/viz/3ba4fb98-3787-11e4-8355-0e10bcd91c2b/viz.json')
         .addTo(map)
         .on('done', function(layer) {


         	

   //       	var sql = new cartodb.SQL({ user: 'YOURUSER' });

			// sql.getBounds("select * from YOURTABLE where parkname like ='%" + user_input + "'").done(function(bounds) {
			//     map.fitBounds(bounds)
			// });

			// var legend = new cdb.geo.ui.Legend({
			// 	type: "custom",
			// 	style: 
			// 		"background: #000;",
			// 	data: [
			// 	 { name: "Category 1", value: "#FFC926" },
			// 	 { name: "Category 2", value: "#76EC00" },
			// 	 { name: "Category 3", value: "#00BAF8" },
			// 	 { name: "Category 4", value: "#D04CFD" }
			// 	]
			// });
			// $('#map').append(legend.render().el);

            geometryHover('iwsstuart', map, layer.getSubLayer(0));

            // change the query for the first layer
		    var subLayerOptions1 = {
		      sql: "SELECT * FROM building_0814_energy_3857"
		    }

		    var subLayerOptions2 = {
		      sql: "SELECT * FROM nybb"
		    }

		    var sublayer1 = layer.getSubLayer(0);

		    var sublayer2 = layer.getSubLayer(1);

		    sublayer1.set(subLayerOptions1);

		    sublayer2.set(subLayerOptions2)

		    sublayers.push(sublayer1);

		    sublayers.push(sublayer2);

        }).on('error', function() {
          cartodb.log.log("some error occurred");
        });

        var boroughFilter = false;
        var currentBorough;

        var bldgLayerActions = {

          minarea: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE floor_area >= " + minFloorArea + " AND floor_area <= " + maxFloorArea);
		    return true;
          },
          maxarea: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE floor_area >= " + minFloorArea + " AND floor_area <= " + maxFloorArea);
		    return true;
		  },
		  all: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857");
		    return true;
		  },
		  less: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE floor_area <= 100000");
		    return true;
		  },
		  greater: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE floor_area > 100000");
		    return true;
		  },
		  nosfdata: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE floor_area is null");
		    return true;
		  },
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
		  	console.log(boroughFilter);
		  	console.log(currentBorough);
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
		  },
		  noghgeuidata: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE total_ghg is null and source_eui is null");
		    return true;
		  },
		  clearfilters: function(){
		  	boroughFilter = false;
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857",
		    });
		   	$('.current-bldg-type').removeClass('current-bldg-type');
		    return true;
		  },
		  clearcolors: function(){
		    sublayers[0].set({
		    	cartocss: "#building_0814_energy_3857 { polygon-fill: #ddd; }",
		    });
		   	$('.current-color-option').removeClass('current-color-option');
		    return true;
		  },
		  multifamily: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Multifamily Housing'");
		    return true;
		  },
		  office: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE property_t = 'Office'");
		    return true;
		  },
		  other: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE property_t is not null and property_t != 'Multifamily Housing' and property_t != 'Office'");
		    return true;
		  },
		  notypedata: function(){
		    sublayers[0].setSQL("SELECT * FROM building_0814_energy_3857 WHERE property_t is null");
		    return true;
		  },
		  manhattan: function(){
		  	boroughFilter = true;
		  	currentBorough = 'MANHATTAN';
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'MANHATTAN'",
		    	// cartocss: "#building_0814_energy_3857 { polygon-fill: #666; }\
		    	// 			#building_0814_energy_3857 [ borough = 'MANHATTAN' ] { polygon-fill: #DDD; }" 		    	
		    });
		    return true;
		  },
		  brooklyn: function(){
		  	boroughFilter = true;
		  	currentBorough = 'BROOKLYN';
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BROOKLYN'",
		    	// cartocss: "#building_0814_energy_3857 { polygon-fill: #666; }\
		    	// 			#building_0814_energy_3857 [ borough = 'BROOKLYN' ] { polygon-fill: #DDD; }" 		    	
		    });		    
		    return true;
		  },
		  queens: function(){
		  	boroughFilter = true;
		  	currentBorough = 'QUEENS';
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'QUEENS'",
		    	// cartocss: "#building_0814_energy_3857 { polygon-fill: #666; }\
		    	// 			#building_0814_energy_3857 [ borough = 'QUEENS' ] { polygon-fill: #DDD; }" 		    	
		    });		    
		    return true;
		  },
		  bronx: function(){
		  	boroughFilter = true;
		  	currentBorough = 'BRONX';
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'BRONX'",
		    	// cartocss: "#building_0814_energy_3857 { polygon-fill: #666; }\
		    	// 			#building_0814_energy_3857 [ borough = 'BRONX' ] { polygon-fill: #DDD; }" 		    	
		    });		    
		    return true;
		  },
		  statenisland: function(){
		  	boroughFilter = true;
		  	currentBorough = 'STATEN ISLAND';
		    sublayers[0].set({
		    	sql: "SELECT * FROM building_0814_energy_3857 WHERE borough = 'STATEN ISLAND'",
		    	// cartocss: "#building_0814_energy_3857 { polygon-fill: #666; }\
		    	// 			#building_0814_energy_3857 [ borough = 'STATEN ISLAND' ] { polygon-fill: #DDD; }" 		    	
		    });		    
		    return true;
		  },
		}


		// var boroLayerActions = {

		// 	mn: function(){
		//     sublayers[1].set({
		//     	sql: "SELECT * FROM nybb WHERE boroname = 'Manhattan'",
		//     	cartocss: "#nybb { line-color: #FF0000; line-width: 3; line-opacity: 1; }"
		//     });
		//     return true;
		//   },
		//   bk: function(){
		//     sublayers[1].set({
		//     	sql: "SELECT * FROM nybb WHERE boroname = 'Brooklyn'",
		//     	cartocss: "#nybb { line-color: #FF0000; line-width: 3; line-opacity: 1; }"
		//     });		    
		//     return true;
		//   },
		//   qn: function(){
		//     sublayers[1].set({
		//     	sql: "SELECT * FROM nybb WHERE boroname = 'Queens'",
		//     	cartocss: "#nybb { line-color: #FF0000; line-width: 3; line-opacity: 1; }"
		//     });		    
		//     return true;
		//   },
		//   bx: function(){
		//     sublayers[1].set({
		//     	sql: "SELECT * FROM nybb WHERE boroname = 'Bronx'",
		//     	cartocss: "#nybb { line-color: #FF0000; line-width: 3; line-opacity: 1; }"
		//     });		    
		//     return true;
		//   },
		//   si: function(){
		//     sublayers[1].set({
		//     	sql: "SELECT * FROM nybb WHERE boroname = 'Staten Island'",
		//     	cartocss: "#nybb { line-color: #FF0000; line-width: 3; line-opacity: 1; }"
		//     });		    
		//     return true;
		//   },
		// }

		var minFloorArea;
		var maxFloorArea;

		$('.min-max').blur( function() {
			minFloorArea = $('#minarea').val();
			maxFloorArea = $('#maxarea').val();
			if (minFloorArea >= 0 && maxFloorArea <= 15000000) {
				bldgLayerActions[$(this).attr('id')]();
			}
		});

        $('.button').click( function() {
		  $('.button').removeClass('selected');
		  $(this).addClass('selected');
		  bldgLayerActions[$(this).attr('id')]();
		});

     //    $('.borough img.button').hover( function() {
		  	// boroLayerActions[$(this).attr('id')]();
     //    });

        $.getJSON("boro_bounds.geojson", 

			function(data) {
			
			// style = {
			//     "color": "#FF0000",
		 //    	"weight": 3,
		 //    	"opacity": 1,
		 //    	"fillColor": "#FF0000",
		 //    	"fillOpacity": 0
			// };
			
			boroCount = data.features.length;

			var boroBounds;

			$('.borough img').hover( function() {
			
			for (var i = 0; i < boroCount; i++) {

				var boroCode = data.features[i].properties.BoroCode;

				if ($(this).hasClass(boroCode)) {
					boroBounds = L.geoJson(data.features[i], {
						style: {                
							weight: 3,
							color: "#FF0000",
							opacity: 1,	
							fillColor: "#FF0000",
							fillOpacity: 0
						}
					});
					boroBounds.addTo(map);
				}

			}

			},

			function() {
				map.removeLayer(boroBounds);
			});

		});

        // var sql = new cartodb.SQL({ user: 'iwsstuart', jsonp: true });

		// $('#search form').submit( function() {

		// 	var searchValue = $('.search').val();
		// 	console.log(searchValue);
		// 	sql.execute("SELECT * FROM building_0814_energy_3857 WHERE street_nam = " + searchValue)
		//       .done(function() {	        
		//         console.log(data);
		//       })
		//       .error(function(errors) {
		//         // do nothing
		//     })

		// });



});