app.routeDefault = function() {
  var conditions = [];
  $('#main-content').html($('#landing-page').html());

  $.getJSON('/api/v1/conditions').done(function(data) {
    console.log(data);
    data.conditions.forEach(function(condition) {
      if (conditions.indexOf(condition.name) === -1) {
        conditions.push(condition.name);
      }
    });
    console.log(conditions);
    $('#condition-search').keyup(function(e) {
      if (!((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32 || e.keyCode === 189)) {
        return;
      }

      var searchField = document.getElementById('condition-search');
      var term = $('#condition-search').val();
      var searchTerm = term.toLowerCase();
      var index = -1;

      for (var i = 0; i < conditions.length; ++i) {
        if (conditions[i].toLowerCase().indexOf(searchTerm) === 0) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return;
      }

      searchField.value = term + conditions[index].slice(term.length);
      searchField.setSelectionRange(term.length, conditions[index].length);

    })
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    if (!verifySearch()) {
      return;
    }

    document.location.hash = 'search/' + $('#condition-search').val();
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
