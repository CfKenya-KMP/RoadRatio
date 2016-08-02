jQuery(function($) {
	$(document).ready(function() {

		// cache

		var html			= $('html'),
			$body			= $('body'),
			wWidth 			= $(window).innerWidth(),
			wHeight 		= $(window).innerHeight();

		function baseFx() {

			Chart.defaults.global.responsive = true;

			var ctxHospitality = $( "#chartHospitality" ).get(0);
			if ( typeof ctxHospitality != 'undefined' ) {
				var ctxHospitality = ctxHospitality.getContext( "2d" );
				var chartHospitality = new Chart( ctxHospitality );
				new Chart( ctxHospitality ).Doughnut( dataHospitality, {
                	responsive: true,
                	multiTooltipTemplate: "$<%=addCommas(value)%>"
            	});
			}

			var ctxTravel = $( "#chartTravel" ).get(0);
			if ( typeof ctxTravel != 'undefined' ) {
				var ctxTravel = ctxTravel.getContext( "2d" );
				var chartTravel = new Chart( ctxTravel );
				new Chart( ctxTravel ).Doughnut( dataTravel );
			}

			$(window).load(function() {

				// remove preload class
				$body.removeClass('preload');

			}); // load
		}



		/* On Doc Ready --------------------------------------*/

		// run base functions 
		baseFx();

		// run page functions
		// if ($body.hasClass('home')) { homeFx(); }



		/* On Window Resize ----------------------------------*/

		$(window).resize(function() {

			wWidth = $(window).innerWidth();
			wHeight = $(window).innerHeight();

		});


		/* Abstracted Functions ------------------------------*/

		// activate email links

		function activateEmail (selector) {
			$(selector).html( function() {
				var adr = $(this).data('address');
				var dom = $(this).data('domain');
				var ext = $(this).data('ext');
				return adr + '@' + dom + ext;
			}).attr('href', function() {
				return 'mailto:' + $(this).html();
			}).attr('target', '_blank');
		}
		
		function addCommas(nStr){

			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			
			return x1 + x2;

		}
        county = window.location.href.split('county=')[1]
        updateMapData(translateIDtoTitle(county));
        var map = AmCharts.makeChart( "chartdiv", {
          type: "map",
          "theme": "dark",

          colorSteps: 10,

          dataProvider: {
            map: "kenyaHigh",
            mapURL: "/lib/3/maps/svg/kenyaHigh.svg",
            areas: MAP_DATA
          },

          areasSettings: {
            autoZoom: false
          },

          "export": {
            "enabled": true
          },

          zoomable: false,
          zoomControl: { zoomControlEnabled: false, panControlEnabled: false, homeButtonEnabled: false},
        });
	});
});

COUNTY_ARR = [["KE-28","Mombasa"],["KE-19","Kwale"],["KE-39","Taita-Taveta"],["KE-94","Kilifi"],["KE-21","Lamu"],["KE-23","Makueni"],["KE-30","Nairobi"],["KE-10","Kajiado"],["KE-22","Machakos"],["KE-13","Kiambu"],["KE-27","Migori"],["KE-29","Murang%27a"],["KE-16","Kisii"],["KE-33","Narok"],["KE-34","Nyamira"],["KE-02","Bomet"],["KE-08","Homa-Bay"],["KE-06","Embu"],["KE-15","Kirinyaga"],["KE-18","Kitui"],["KE-40","Tana-River"],["KE-36","Nyeri"],["KE-17","Kisumu"],["KE-12","Kericho"],["KE-41","Tharaka"],["KE-35","Nyandarua"],["KE-45","Vihiga"],["KE-31","Nakuru"],["KE-38","Siaya"],["KE-32","Nandi"],["KE-26","Meru"],["KE-04","Busia"],["KE-20","Laikipia"],["KE-11","Kakamega"],["KE-44","Uasin-Gishu"],["KE-07","Garissa"],["KE-03","Bungoma"],["KE-42","Trans-Nzoia"],["KE-05","Elgeyo-Marakwet"],["KE-01","Baringo"],["KE-09","Isiolo"],["KE-37","Samburu"],["KE-47","West-Pokot"],["KE-46","Wajir"],["KE-24","Mandera"],["KE-25","Marsabit"],["KE-43","Turkana"]]
MAP_DATA = [{id: 'KE-01', value: 0}, {id: 'KE-02', value: 0}, {id: 'KE-03', value: 0}, {id: 'KE-04', value: 0}, {id: 'KE-05', value: 0}, {id: 'KE-06', value: 0}, {id: 'KE-07', value: 0}, {id: 'KE-08', value: 0}, {id: 'KE-09', value: 0}, {id: 'KE-10', value: 0}, {id: 'KE-11', value: 0}, {id: 'KE-12', value: 0}, {id: 'KE-13', value: 0}, {id: 'KE-14', value: 0}, {id: 'KE-15', value: 0}, {id: 'KE-16', value: 0}, {id: 'KE-17', value: 0}, {id: 'KE-18', value: 0}, {id: 'KE-19', value: 0}, {id: 'KE-20', value: 0}, {id: 'KE-21', value: 0}, {id: 'KE-22', value: 0}, {id: 'KE-23', value: 0}, {id: 'KE-24', value: 0}, {id: 'KE-25', value: 0}, {id: 'KE-26', value: 0}, {id: 'KE-27', value: 0}, {id: 'KE-28', value: 0}, {id: 'KE-29', value: 0}, {id: 'KE-30', value: 0}, {id: 'KE-31', value: 0}, {id: 'KE-32', value: 0}, {id: 'KE-33', value: 0}, {id: 'KE-34', value: 0}, {id: 'KE-35', value: 0}, {id: 'KE-36', value: 0}, {id: 'KE-37', value: 0}, {id: 'KE-38', value: 0}, {id: 'KE-39', value: 0}, {id: 'KE-40', value: 0}, {id: 'KE-41', value: 0}, {id: 'KE-42', value: 0}, {id: 'KE-43', value: 0}, {id: 'KE-44', value: 0}, {id: 'KE-45', value: 0}, {id: 'KE-46', value: 0}, {id: 'KE-47', value: 0}]
// get param from url

function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

function translateIDtoTitle(name) {
    console.log(name)
    name = name.toLowerCase();
    for (k in COUNTY_ARR) {
        j = COUNTY_ARR[k];
        if (name == j[1].toLowerCase()) {
            return j[0];
        }
    }
}

function updateMapData(id) {
    for (k in MAP_DATA) {
        j = MAP_DATA[k];
        if (j['id'] = id) {
            j['value'] = 100;
        } else {
            j['value'] = 10 * parseInt(Math.random(0,8) * 10);
        }
    }
}

