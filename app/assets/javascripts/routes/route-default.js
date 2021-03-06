app.routeDefault = function() {
  if(app.bounce()) {
    return;
  }

  var searchTerm;

  $('#main-content').html($('#landing-page').html());

  $.getJSON('/api/v1/conditions').done(function(data) {
    var numTrials = data.conditions[0];
    var numOrgs = data.conditions[1];
    $('.num-trials-actual').text(numTrials);
    $('.num-conditions-actual').text(data.conditions[2].length);
    $('.num-orgs-actual').text(numOrgs);

    enterStats();

    var conditions = data.conditions[2];

    app.initializeAutofill(document.getElementById('condition-search'), conditions);
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    searchTerm = $('#condition-search').val();

    $.getJSON('/api/v1/search', { type: 'condition', query: searchTerm }).done(function(data) {
      if (data.searches[1].length === 0) {
        $('.srch-error-message').text('sorry, no matches');
        $('.login-error-message').text('');
        return;
      }

      var excludeList = data.searches[1];

      excludeList = app.sortExclusions(excludeList);

      var listTemplate = _.template(app.exclusionFormTemplate, { variable: 'm' });
      $('.xcld-frm-cntnr').html(listTemplate({ exclusions: excludeList }));
      initializeExclusionForm()
    });

  });

  function enterStats() {
    setTimeout(function() {
      $('.numTrials').addClass('nt-vis');
    }, 500);
    setTimeout(function() {
      $('.numConditions').addClass('nc-vis');
    }, 1600);
    setTimeout(function() {
      $('.numOrgs').addClass('no-vis');
    }, 2700);
  }

  function initializeExclusionForm() {
    $('#exclusion-form').submit(function(e) {
      e.preventDefault();
      var exclusionChecks = [];
      $(':checked').toArray().forEach(function(item) {
        exclusionChecks.push(Number($(item).val()));
      });

      var url = '/api/v1/conditions/trials?condition=' + searchTerm + '&&exclusions=';
      exclusionChecks.forEach(function(item) {
        url += item + ',';
      });

      url = encodeURIComponent(url);

      document.location.hash = 'search/' + url;

    });
  }

  function validateInput() {
    if (!$('#condition-search').val()) {
      $('.srch-error-message').text('search term required');
      return false;
    }
    return true;
  }
}
