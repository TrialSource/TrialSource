app.routeResearcherTrials = function(r) {
  var trials = [];
  $('#main-content').html($('#researcher-trials').html());
  $.getJSON('/api/v1/trials/doctor', { doctor: r.params.id }).done(function(data) {
    trials = data.trials;
    showAllResults();
  });
  $('.new-t-btn').click(function() {
    document.location.hash = 'researcher/' + r.params.id + '/trials/new';
  });

  function showAllResults() {
    var listTemplate = _.template(app.trialListing, { variable: 'm' });
    $('.trial-list').html(listTemplate({ results: trials }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.editable, { variable: 'm' });
        $('.trial-list').html(detailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(showAllResults);
      });
    });
  }
}
