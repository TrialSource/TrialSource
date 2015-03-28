app.routeSearchResults = function(r) {
  if (app.bounce()) {
    return;
  }

  var trials = [];
  $('#main-content').html($('#search-results').html());
  setHeader();
  $.getJSON(decodeURIComponent(r.params.criteria) + '&&location=&&range=').done(function(data) {
    trials = data.conditions;
    showAllResults();
    console.log(trials);
  });

  $('.geo-form').submit(function(e) {
    e.preventDefault();

    if (!validateInput()) {
      $('.error-message').text('invalid input');
      return;
    }

    $('.error-message').text('');

    var url = decodeURIComponent(r.params.criteria) + '&&location=' + $('.zip-input').val() + '&&range=' + $('.range-input').val();
    $.getJSON(url).done(function(data) {
      trials = data.conditions;
      showAllResults();
      console.log(trials);
    });
  });

  console.log(decodeURIComponent(r.params.criteria));

  function showAllResults() {
    var listTemplate = _.template(app.trialListing.search, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: trials }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.search, { variable: 'm' });
        $('.rslts-list').html(detailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(showAllResults);
        $.ajax({
          type: "POST",
          url: '/api/v1/trials/' + trials[i].id + '/views',
        });
      });
    });
  }

  function grabSearchCriteria() {
    var url = decodeURIComponent(r.params.criteria);
    return url.match(/condition=(.*)(?=&&)/)[1];
  }

  function setHeader() {
    var searchTerm = grabSearchCriteria();
    $('.s-results-header').text('your results for "' + searchTerm + '"');
  }

  function validateInput() {
    var zip = $('.zip-input').val();
    var range = $('.range-input').val();
    if (!zip && !range) {
      return true;
    }
    if (zip.match(/[.]/) || !Number(zip) || range.match(/[.]/) || !Number(range) || zip.length < 5) {
      return false;
    }
    return true;
  }
};
