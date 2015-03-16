app.router.add('', function() {
  $('#main-content').html($('#landing-page').html()); // insert landing-page into main-content

  $('.lp-search-button').click(function(e) {
    e.preventDefault();
    alert('search!');
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.lp-login-button').click(function(e) {
    e.preventDefault();
    alert('login!');
    document.location.hash = 'institution/researchers/' + $('.un-field').val();
  });
});

app.router.add('search/:term', function(r) {
  $('#main-content').html($('#search-results').html());
  alert(r.params.term);
});

app.router.add('institution/researchers/:id', function(r) {
  $('#main-content').html($('#manage-researchers').html());
  alert(r.params.id);
});

app.router.add('researcher/create/:id', function(r) {
  $('#main-content').html($('#create-study').html());
  alert(r.params.id);
});
