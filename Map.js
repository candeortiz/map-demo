var globalMap;

//declare variable
var markerSave = null;

$(function() {

	var MapFcns = {
		loadSiteList : function() {

			var airportList = $('#airport-list');
			airportList.html('');
			sites = _.sortBy(sites, function(airport) {
				return airport.Code;
			});
			airportList.append('<option value=""></option>');
			for ( var i in sites) {
				var newOption = $('<option value="' + sites[i].Code + '">'
						+ sites[i].Code + '</option>');
				airportList.append(newOption);

			}
		},

		//Method to select
		selectAirport : function(airportCode) {
			var currAirport = _.findWhere(sites, {
				Code : airportCode
			});
			$('#setting-code').text(currAirport.Code);
			$('#setting-city').text(currAirport.City);
			$('#setting-state').text(currAirport.State);
			$('#setting-namefull').text(currAirport.FullSiteName);
			$('#setting-lat').text(currAirport.Latitude);
			$('#setting-long').text(currAirport.Longitude);

		},

		//saving  code lines
		siteListChange : function() {
			var ctl = $(this), airportCode = ctl.val();
			if (airportCode) {
				var currAirport = _.findWhere(sites, {
					Code : airportCode
				});
				MapFcns.selectAirport(airportCode)

				var marker = new google.maps.Marker({
					position : {
						lat : currAirport.Latitude,
						lng : currAirport.Longitude
					},
					map : globalMap,
					title : currAirport.Code

				});
				//move map to pin position
				globalMap.setCenter(marker.getPosition());

				// Select an airport with a click
				google.maps.event.addListener(marker, 'click', function() {
					//get the airport code with this.title
					MapFcns.selectAirport(this.title);
					//save the selected airport in the variable (this = airport with marker)

					markerSave = this;

					//Zoom the selected airport
					globalMap.setCenter(this.getPosition());
				});
			}
		}
	}

	MapFcns.loadSiteList();
	$('#airport-list').change(MapFcns.siteListChange);

});

function initMap() {
	// Callback function to create a map object and specify the DOM element for display.
	globalMap = new google.maps.Map(document.getElementById('airport-map'), {
		center : {
			lat : 42.2814,
			lng : -83.7483
		},
		scrollwheel : true,
		zoom : 6
	});

	//click event to delete the selected airport
	$("#delete").click(function() {

		//setMap(null) deletes the selected airport
		markerSave.setMap(null);
	});

}