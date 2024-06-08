$(document).ready(function() {
  let amenities = {};
  let states = {};
  let cities = {};

  $('input[type="checkbox"]').change(function() {
    let id = $(this).data('id');
    let name = $(this).data('name');
    let parentClass = $(this).closest('div').attr('class');

        if ($(this).prop('checked')) {
          if (parentClass === amenities) {
            amenities[id] = name;
          } else if (parentClass === 'locations' && $(this).closest('ul').parent().is('li')) {
            states[id] = name;
	  } else {
            cities[id] = name;
	  };
        } else {
          if (parentClass === amenities) {
            delete amenities[id];
	  } else if (parentClass === 'locations' && $(this).closest('ul').parent().is('li')) {
            delete states[id];
          } else {
            delete cities[id];
          };
       };

        updateA();
  });

  function updateA() {
    let amenitieslist = Object.values(amenities).join(', ');
    $('#amenities h4').text('Amenities: ' + amenitieslist);

    let locationlist = Object.values({..states, ...cities}).join(', ');
    $('#amenities h4').text('Amenities: ' + locationlist);
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
