$(function () {

  app.router = Rlite();
  window.addEventListener('hashchange', app.processHash);
  app.routes();
  app.setLogAction()
  app.processHash();

});
