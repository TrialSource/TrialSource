app.bounce = function(secure) {

  var id = $('body').data('id');
  var type = $('body').data('type');

  if (!secure && type) {
    if (type === 'Doctor') {
      redirectResearcher(id);
      return true;
    } else {
      redirectOrganization(id);
      return true;
    }
  } else if (secure && !id) {
      toLandingPage();
      return true;
  }

  return false;

  function redirectOrganization(id) {
    document.location.hash = 'admin/' + id;
  }

  function redirectResearcher(id) {
    document.location.hash = 'researcher/' + id + '/trials/';
  }

  function toLandingPage() {
    document.location.hash = '';
  }

}
