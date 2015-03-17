app.router.add('', function() {
  $('#main-content').html($('#landing-page').html()); // insert landing-page into main-content

  $('.search-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    // document.location.hash = 'researcher/' + $('.un-field').val() + '/create';
    document.location.hash = 'institution/' + $('.un-field').val() + '/researchers';
  });
});

app.router.add('search/:term', function(r) {
  $('#main-content').html($('#search-results').html());
});

app.router.add('institution/:id/researchers', function(r) {
  $('#main-content').html($('#manage-researchers').html());
});

app.router.add('researcher/:id/create', function(r) {
  $('#main-content').html($('#create-study').html());
  $('.trial-start-input').pickadate();
  $('.trial-complete-input').pickadate();
});
