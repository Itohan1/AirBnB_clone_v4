$(document).ready(function() {
 $('#toggle-reviews').click(function() {
   let place = $(this).attr('data-place');
     if (place === 'show') {
       $(this).text('hide');
       $(this).attr('data-place', 'hide');
       $('.reviews h3, .reviews p').show();
     } else {
       $(this).text('show');
       $(this).attr('data-place', 'show');
       $('.reviews h3, .reviews p').hide();
     };
 });
