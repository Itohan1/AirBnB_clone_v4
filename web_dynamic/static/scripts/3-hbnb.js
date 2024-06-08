$(document).ready(function() {
  let amenities = [];
  let amentiesname = [];

  $('input[type="checkbox"]').change(function() {
    let amenityid = $(this).attr('data-id');
    let amenityname = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities.push(amenityid);
      amenitiesname.push(amenityname);
    }
    else {
      amenitiesname = amenitiesname.filter(name => name !== amenityname);
    }
    $('.amenities h4').text(amenitiesname.join(', '));
   });
   $.get("http://0.0.0.0:5001/api/v1/status/", function(r) {
     if (status === "success" r.status === 'OK') {
       $('div#api_status').addClass(".available");
     } else {
       $('div#api_status').removeClass(".available");
     }
   });
   $.ajax({
     url: "http://0.0.0.0:5001/api/v1/places_search/",
     type: "POST",
     contentType: "aplication/json",
     data: JSON.stringify({}),
     success: function() {
       r.forEach(function(place) {
         let placeArticle = `
	<article>
          <div class="title_box">
            <h2>{{ place.name }}</h2>
            <div class="price_by_night">${{ place.price_by_night }}</div>
          </div>
          <div class="information">
            <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
          </div>
          <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
            {{ place.description | safe }}
          </div>
        </article>
       `;
        $('#place_list').append(placeArticle);
      });
    }
   });
});
