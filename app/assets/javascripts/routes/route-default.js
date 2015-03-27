app.routeDefault = function() {
  if(app.bounce()) {
    return;
  }

  var searchTerm;

  $('#main-content').html($('#landing-page').html());

  $.getJSON('/api/v1/conditions').done(function(data) {
    console.log(data);
    var numTrials = data.conditions[0];
    var numOrgs = data.conditions[1];
    $('.numTrials').text('search over ' + numTrials + ' trials');
    $('.numConditions').text('treating ' + data.conditions[2].length + ' conditions');
    $('.numOrgs').text('across ' + numOrgs + ' institutions');
    console.log('we have ' + numTrials + ' trials at ' + numOrgs + ' organizations in our database');
    var conditions = data.conditions[2];
    $('#condition-search').keyup(function(e) {
      if (!((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32 || e.keyCode === 189)) {
        return;
      }

      var searchField = document.getElementById('condition-search');
      var term = $('#condition-search').val();
      var searchTerm = term.toLowerCase();
      var index = -1;

      for (var i = 0; i < conditions.length; ++i) {
        if (conditions[i].name.toLowerCase().indexOf(searchTerm) === 0) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return;
      }

      searchField.value = term + conditions[index].name.slice(term.length);
      searchField.setSelectionRange(term.length, conditions[index].name.length);

    })
  });

  $('.search-form').submit(function(e) {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    searchTerm = $('#condition-search').val();

    $.getJSON('/api/v1/search', { type: 'condition', query: $('#condition-search').val() }).done(function(data) {
      console.log(data);
      if (data.searches[1].length === 0) {
        $('.srch-error-message').text('sorry, no matches');
        $('.login-error-message').text('');
        return;
      }
      var excludeList = [];
      data.searches[1].forEach(function(item) {
        item.forEach(function(contra) {
          excludeList.push(contra);
        });
      });

      var listTemplate = _.template(app.exclusionFormTemplate, { variable: 'm' });
      $('.xcld-frm-cntnr').html(listTemplate({ exclusions: excludeList }));
      initializeExclusionForm()
    });

  });

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
