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
      }).done(function() {
        document.location.reload(true);
      });
    });
  }

  function setLogin() {
    logButton = $('.login-logout');
    logButton.text('login');
  }
}
