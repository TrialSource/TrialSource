app.routeSearchResults = function(r) {
  $.getJSON('/api/v1/trials').done(function(data) {
    console.log(data.trials);
    $('#main-content').html($('#search-results').html());
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: data.trials }));
  });
};
