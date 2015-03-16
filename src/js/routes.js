app.router.add('', function() {
  $('#main-content').html($('#landing-page').html()); // insert landing-page into main-content

  $('.search-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'researcher/create/' + $('.un-field').val();
  });
});

app.router.add('search/:term', function(r) {
  $('#main-content').html($('#search-results').html());
});

app.router.add('institution/researchers/:id', function(r) {
  $('#main-content').html($('#manage-researchers').html());
});

app.router.add('researcher/create/:id', function(r) {
  $('#main-content').html($('#create-study').html());
  $('.trial-start-input').pickadate();
  $('.trial-complete-input').pickadate();
});
