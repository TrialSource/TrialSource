app.routes = function() {
  app.router.add('', function() {
    app.routeDefault();
  });

  app.router.add('search/:term', function(r) {
    $('#main-content').html($('#search-results').html());
    $.getJSON('/api/v1/trials').done(function(data) {
      console.log(data.trials);
      var listTemplate = _.template(app.trialListing, { variable: 'm' });
      $('.rslts-list').html(listTemplate({ results: data.trials }));
    })
  });

  app.router.add('admin/:id/researchers', function(r) {
    $('#main-content').html($('#manage-researchers').html());
  });

  app.router.add('admin/:id', function(r) {
    $('#main-content').html($('#admin-nav').html());
    $('.admin-nav-link-actual').attr('href', '#admin/' + r.params.id + '/researchers')
  })

  app.router.add('researcher/:id/trials', function(r) {
    $('#main-content').html($('#researcher-trials').html());
    $('.new-t-btn').click(function() {
      document.location.hash = 'researcher/trials/new';
    })
  });

  app.router.add('researcher/trials/new', function(r) {
    app.routeCreateTrialBasic();
  });
}
