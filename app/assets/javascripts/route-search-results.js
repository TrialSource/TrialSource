app.routeSearchResults = function(r) {
  $.getJSON('/api/v1/search', { type: 'trial', query: r.params.term }).done(function(data) {
    $('#main-content').html($('#search-results').html());
    console.log(data);
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: data.searches }));
  });
};
