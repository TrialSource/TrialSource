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
    app.routeResearcherTrials(r);
  });

  app.router.add('researcher/:id/trials/new', function(r) {
    app.routeCreateTrialBasic(r);
  });
}