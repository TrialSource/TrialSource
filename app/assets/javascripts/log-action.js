app.setLogAction = function() {
  var id = $('body').data('id');

  if (id) {
    setLogout(id);
  } else {
    setLogin();
  }

  function setLogout(userId) {
    logButton = $('.login-logout');
    logButton.text('logout');
    logButton.click(function() {
      $.ajax({
        type: "DELETE",
        url: '/api/v1/logout',
        contentType : 'application/json',
        dataType: 'json'
      }).done(function() {
        document.location.reload(true);
      });
    });
  }

  function setLogin() {

    logButton = $('.login-logout');
    $('.login-form').click(function(e) {
      e.stopPropagation();
    });
    logButton.click(function(e) {
      e.stopPropagation();
      $('body').on('click', bodyToggle);
      $('.login-form').toggleClass('lf-visible');
      $('.login-error-message').text('');
    })
    $('.login-form').submit(function(e) {
      e.preventDefault();

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
        if (data.sessions[1] === "Organization") {
          loginOrganization(data.sessions[0]);
        } else {
          loginResearcher(data.sessions[0]);
        }
        document.location.reload(true);
      }).fail(function(data) {
        $('.login-error-message').text('invalid login credentials')
      })
    });
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

  function bodyToggle() {
    $('.login-form').toggleClass('lf-visible');
    $('body').off('click', bodyToggle);
  }
}
