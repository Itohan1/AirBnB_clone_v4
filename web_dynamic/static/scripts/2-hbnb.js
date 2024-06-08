$(document).ready(function() {
  let amenities = [];
  let amentiesname = [];

  $('.amenity-checkbox').change(function() {
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
   $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
     if (r.status === 'OK') {
       $('div#api_status').addClass(".available");
     } else {
       $('div#api_status').removeClass(".available");
     }
   });
});
