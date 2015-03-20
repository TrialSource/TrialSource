app.routeSearchResults = function(r) {
  $('#main-content').html($('#search-results').html());
  $.getJSON('/api/v1/trials').done(function(data) {
    console.log(data.trials);
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: data.trials }));
  });
};
