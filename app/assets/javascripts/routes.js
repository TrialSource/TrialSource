app.routes = function() {
  app.router.add('', function() {
    app.routeDefault();
  });

  app.router.add('search/:criteria', function(r) {
    app.routeSearchResults(r);
  });

  app.router.add('admin/:id', function(r) {
    app.routeAdminMain(r);
  });

  app.router.add('admin/:id/researchers', function(r) {
    app.routeResearcherManager(r);
  });

  app.router.add('admin/:id/trials', function(r) {
    app.routeOrganizationTrials(r);
  });

  app.router.add('researcher/:id/trials', function(r) {
    app.routeResearcherTrials(r);
  });

  app.router.add('researcher/:id/trials/new', function(r) {
    app.routeCreateTrialBasic(r);
  });

  app.router.add('researcher/:rid/trials/edit/:tid', function(r) {
    app.routeEditTrialBasic(r);
  });
}
