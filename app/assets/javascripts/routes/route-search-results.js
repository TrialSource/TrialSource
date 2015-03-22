app.routeSearchResults = function(r) {
  var trials = [];
  $.getJSON('/api/v1/search', { type: 'trial', query: r.params.term }).done(function(data) {
    $('#main-content').html($('#search-results').html());
    console.log(data);
    trials = data.searches;
    showAllResults();
  });

  function showAllResults() {
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.rslts-cntnr').html(listTemplate({ results: trials }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.rslts-cntnr').html(detailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(showAllResults);
      });
    });
  }
};
