app.processHash = function() {
  var hash = location.hash || '#';

  if (!app.router.run(hash.slice(1))) {
    app.pageNotFound();
  }
};
