app.routeDefault = function() {
  $('#main-content').html($('#landing-page').html());

  $.getJSON('/api/v1/conditions').done(function(data) {
    console.log(data);
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    if (!verifySearch()) {
      return;
    }

    document.location.hash = 'search/' + $('.condition-field').val();
  });

  $('.login-form').submit(function(e) {
    e.preventDefault();
    // document.location.hash = 'researcher/trials';
    // document.location.hash = 'admin';

    if (!verifyLogin()) {
      return;
    }
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
    }).fail(function(data) {
      $('.login-error-message').text('invalid login credentials')
    })
  });

  function verifySearch() {
    if ($('.condition-field').val() === '') {
      $('.srch-error-message').text('search term required');
      $('.login-error-message').text('');
      return false;
    }
    return true;
  }

  function verifyLogin() {
    if (!$('.un-field').val() || !$('.pw-field').val()) {
      $('.login-error-message').text('email and password required');
      $('.srch-error-message').text('');
      return false;
    }

    var emailEntry = $('.un-field').val().toLowerCase();
    if (!emailEntry.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/) || emailEntry.match(/ /)) {
      $('.login-error-message').text('not a valid email');
      $('.srch-error-message').text('');
      return false;
    }

    return true;
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
