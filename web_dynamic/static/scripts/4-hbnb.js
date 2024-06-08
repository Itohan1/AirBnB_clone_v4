$(document).ready(function() {
  let selectA = {};

  $('.amenity-checkbox').change(function() {
    let amenityid = $(this).data('id');
    let amenityname = $(this).data('name');

        if ($(this).prop('checked')) {
          selectedAmenities[amenityId] = amenityName;
        } else {
          delete selectedAmenities[amenityId];
        }

        updateA();
  });

  function updateA() {
    let amenitieslist = Object.values(selectA).join(', ');
    $('#amenities h4').text('Amenities: ' + amenitieslist);
  }

  $.get("http://0.0.0.0:5001/api/v1/status/", function(r, status) {
    if (status === "success" && data.status === "OK") {
      $('div#api_status').addClass("available");
    } else {
      $('div#api_status').removeClass("available");
    }
  });

  function getPlaces(amenities) {
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: function(data) {
        $('#places_list').empty();
        data.forEach(function(place) {
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
          $('#places_list').append(placeArticle);
        });
      }
    });
  };
  $('#search-button').click(function() {
    getPlaces(selectA);
  });

  getPlaces({});
});
