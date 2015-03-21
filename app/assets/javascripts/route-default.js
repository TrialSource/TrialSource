app.routeDefault = function() {
  $('#main-content').html($('#landing-page').html());

  $('.search-form').submit(function(e) {
    e.preventDefault();
    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    // document.location.hash = 'researcher/trials';
    // document.location.hash = 'admin';

    verifyInput();
    var login = getLogin();

    $.ajax({
      type: "POST",
      url: '/api/v1/sessions',
      data: JSON.stringify(login),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function(data) {
      if (data.sessions[1].toLowerCase() === "organization") {
        loginOrganization(data.sessions[0]);
      } else {
        loginResearcher(data.sessions[0]);
      }
    });
  });

  function verifyInput() {

  }

  function getLogin() {
    return {
      email: $('.un-field').val(),
      password: $('.pw-field').val()
    };
  }

  function loginOrganization(orgId) {
    document.location.hash = 'admin/' + orgId;
  }

  function loginResearcher(id) {
    document.location.hash = 'researcher/' + id + '/trials/';
  }
}
