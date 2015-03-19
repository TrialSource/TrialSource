app.routeDefault = function() {
  $('#main-content').html($('#landing-page').html());

  $('.search-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'researcher/trials';
    // document.location.hash = 'admin';
  });
}
