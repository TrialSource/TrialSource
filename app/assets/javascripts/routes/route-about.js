app.routeAbout = function() {
  if (app.bounce()) {
    return;
  }
  $('#main-content').html($('#about').html());
};
