app.routeOrganizationTrials = function(r) {
  if (app.bounce(true)) {
    return;
  }
  $('#main-content').html($('#admin-trials').html());
  var trials = [];
  var listState = [];
  $.getJSON('/api/v1/trials/org', { org: r.params.id }).done(function(data) {
    trials = data.trials;
    listState = trials;
    showList();
  });

  function showList() {
    var listTemplate = _.template(app.trialListing.researcher, { variable: 'm' });
    $('.trial-list').html(listTemplate({ results: listState }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.trial-list').html(detailTemplate({ trial: listState[i] }));
        $('.bck-btn').click(showList);
      });
    });
  }
  $('.search-trials-input').keyup(function(e) {
    var term = $('.search-trials-input').val().toLowerCase();

    if (!term) {
      listState = trials;
      showList();
      return;
    }

    var show = setTimeout(performSearch, 250);

    $('.search-trials-input').on('keydown', cancelSearch);

    function cancelSearch() {
      clearTimeout(show);
      $('.search-trials-input').off('keydown', cancelSearch);
    }

    function performSearch() {
      $('.search-trials-input').off('keydown', cancelSearch);
      var tempState = listState;
      listState = [];
      trials.forEach(function(trial) {
        var ref = buildSearchRef(trial).toLowerCase();
        if (ref.indexOf(term) > -1) {
          listState.push(trial)
        }
      });
      showList();
    }

    function buildSearchRef(obj) {
      var ref;
      ref += obj.name;
      ref += obj.location;
      ref += obj.principal;
      ref += obj.start_on;
      obj.conditions.forEach(function(item) {
        ref += item.name;
      });

      return ref;
    }

  })
};
