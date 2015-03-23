app.routeOrganizationTrials = function(r) {
  var trials = [];
  $.getJSON('/api/v1/trials/org', { org: r.params.id }).done(function(data) {
    $('#main-content').html($('#admin-trials').html());
    console.log(data);
    trials = data.trials;
    showAllResults();
  });

  function showAllResults() {
    var listTemplate = _.template(app.trialListing.search, { variable: 'm' });
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
