app.routeSearchResults = function(r) {
  if (app.bounce()) {
    return;
  }

  var trials = [];
  listState = [];
  $('#main-content').html($('#search-results').html());
  setHeader();
  $.getJSON(decodeURIComponent(r.params.criteria) + '&&location=&&range=').done(function(data) {
    if (data.conditions.length > 0) {
      trials = data.conditions;
      listState = trials;
      showAllResults();
      initializeGeoform();
      initializeGeoClear();
      populateExclReminders();
    } else {
      app.populateSaveMe(grabSearchTerm(), grabExclusionIds());
    }
  });

  function populateExclReminders() {
    $.getJSON('/api/v1/search', { type: 'condition', query: grabSearchTerm() }).done(function(data) {
      exclNames = buildExclusionList(grabExclusionIds(), data.searches[1])
      var listCntnr = $('.excl-selections');
      listCntnr.append('<li class="excl-selection-header">Results for patient with the following attributes:</li>');
      exclNames.forEach(function(item) {
        listCntnr.append('<li class="excl-selection">' + item + '</li>');
      });
    });
  }

  function buildExclusionList(ids, objects) {
    var list = [];
    for (var i = 0; i < ids.length; ++i) {
      for (var j = 0; j < objects.length; ++j) {
        if (Number(ids[i]) === objects[j].id) {
          list.push(objects[j].name);
          break;
        }
      }
    }
    return app.sortExclusions(list);
  }

  function initializeGeoform() {

    $('.geo-form').submit(function(e) {
      e.preventDefault();

      if (!validateInput()) {
        $('.error-message').text('invalid input');
        return;
      }

      $('.error-message').text('');

      var url = decodeURIComponent(r.params.criteria) + '&&location=' + $('.zip-input').val() + '&&range=' + $('.range-input').val();
      $.getJSON(url).done(function(data) {
        listState = data.conditions;
        showAllResults();
      });
    });
  }

  function initializeGeoClear() {
    $('.clear-geo-btn').click(function() {
      $('.zip-input').val('');
      $('.range-input').val('');
      listState = trials;
      showAllResults();
    });
  }

  function showAllResults() {
    var listTemplate = _.template(app.trialListing.search, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: listState }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.search, { variable: 'm' });
        $('.rslts-list').html(detailTemplate({ trial: listState[i] }));
        $('.bck-btn').click(showAllResults);
        initializeRequestBtn();
        $.ajax({
          type: "POST",
          url: '/api/v1/trials/' + listState[i].id + '/views',
        });
      });
    });
  }

  function initializeRequestBtn() {
    $('.more-info-btn').click(function() {
      var email = $('.more-info-input');
      if (!email.val().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/)) {
        $('.more-info-error-message').text('invalid-input');
        return;
      } else {
        $('.more-info-error-message').text('application requested!');
        $('.more-info-error-message').css('color', 'seagreen');
        $('.more-info-input').attr('disabled', true);
        $('.more-info-input').css('color', 'darkgrey');
        $('.more-info-btn').attr('disabled', true);
        $('.more-info-btn').css('background', 'darkgrey');
      }
    });
  }

  function grabSearchTerm() {
    var url = decodeURIComponent(r.params.criteria);
    return url.match(/condition=(.*)(?=&&)/)[1];
  }

  function grabExclusionIds() {
    var url = decodeURIComponent(r.params.criteria);
    var ids = url.match(/exclusions=(.*)/)[1].split(',');
    ids.splice(ids.length - 1, 1);
    return ids;
  }

  function setHeader() {
    var searchTerm = grabSearchTerm();
    $('.s-results-header').text('your results for "' + searchTerm + '"');
  }

  function validateInput() {
    var zip = $('.zip-input').val();
    var range = $('.range-input').val();
    if (!zip && !range) {
      return false;
    }
    if (zip.match(/[.]/) || !Number(zip) || range.match(/[.]/) || !Number(range) || zip.length < 5) {
      return false;
    }
    return true;
  }
};
