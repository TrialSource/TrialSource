app.routeSearchResults = function(r) {
  if (app.bounce()) {
    return;
  }
  var trials = [];
  $.getJSON('/api/v1/search', { type: 'condition', query: r.params.term }).done(function(data) {
    $('#main-content').html($('#search-results').html());
    trials = data.searches;
    showAllResults();
  });

  function showAllResults() {
    var listTemplate = _.template(app.trialListing.search, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: trials }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.rslts-list').html(detailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(showAllResults);
      });
    });
  }
};
