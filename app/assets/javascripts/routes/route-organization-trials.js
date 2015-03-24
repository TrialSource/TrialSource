app.routeOrganizationTrials = function(r) {
  if (app.bounce(true)) {
    return;
  }
  var trials = [];
  $.getJSON('/api/v1/trials/org', { org: r.params.id }).done(function(data) {
    $('#main-content').html($('#admin-trials').html());
    trials = data.trials;
    showAllResults();
  });

  function showAllResults() {
    var listTemplate = _.template(app.trialListing.admin, { variable: 'm' });
    $('.trial-list').html(listTemplate({ results: trials }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.trial-list').html(detailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(showAllResults);
      });
    });
  }};
