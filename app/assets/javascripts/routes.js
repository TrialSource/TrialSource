app.routes = function() {
  app.router.add('', function() {
    app.routeDefault();
  });

  app.router.add('search/:term', function(r) {
    app.routeSearchResults(r);
  });

  app.router.add('admin/:id/researchers', function(r) {
    app.routeResearcherManager(r);
  });

  app.router.add('admin/:id', function(r) {
    app.routeAdminMain(r);
  });

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
