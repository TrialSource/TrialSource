app.routeResearcherTrials = function(r) {
  $('#main-content').html($('#researcher-trials').html());
  $.getJSON('/api/v1/trials/doctor', { doctor: r.params.id }).done(function(data) {
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.trial-list').html(listTemplate({ results: data.trials }));
  });
  $('.new-t-btn').click(function() {
    document.location.hash = 'researcher/' + r.params.id + '/trials/new';
  });
}
