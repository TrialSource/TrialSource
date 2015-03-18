app.router.add('', function() {
  $('#main-content').html($('#landing-page').html()); // insert landing-page into main-content

  $('.search-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'researcher/trials';
    // document.location.hash = 'admin';
  });
});

app.router.add('search/:term', function(r) {
  $('#main-content').html($('#search-results').html());
  $.getJSON('http://localhost:3000/api/v1/trials').done(function(data) {
    console.log(data);
  })
});

app.router.add('admin/researchers', function(r) {
  $('#main-content').html($('#manage-researchers').html());
});

app.router.add('admin', function(r) {
  $('#main-content').html($('#admin-nav').html());
})

app.router.add('researcher/trials', function(r) {
  $('#main-content').html($('#researcher-trials').html());
  $('.new-t-btn').click(function() {
    document.location.hash = 'researcher/trials/new';
  })
});

app.router.add('researcher/trials/new', function(r) {
  $('#main-content').html($('#create-study').html());
  $('.trial-start-input').pickadate();
  $('.trial-complete-input').pickadate();
});
