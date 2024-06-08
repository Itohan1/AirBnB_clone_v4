$(document).ready(function {
  let amenities = {};

  $('input[type="checkbox"]').change(function () {
    let amenityid = $(this).attr("data-id");
    let amenityname = $(this).attr("data-name");
    
    if ($(this).is("checked") {
      amenities[amenityid] = amenityname;
    } else {
      delete amenities[amenityid];
    };
    let amenitiesA = object.values(amenitiies).join(', ');
    $('.amenities h4').text(" Amenity: " + amenitiesA);
  });
});
