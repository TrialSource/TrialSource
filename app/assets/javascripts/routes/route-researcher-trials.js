app.routeResearcherTrials = function(r) {
  if (app.bounce(true)) {
    return;
  }
  var trials = [];
  var listState = [];
  $('#main-content').html($('#researcher-trials').html());
  $.getJSON('/api/v1/trials/doctor', { doctor: r.params.id }).done(function(data) {
    trials = data.trials;
    listState = trials;
    showList();
  });

  $('.new-t-btn').click(function() {
    document.location.hash = 'researcher/' + r.params.id + '/trials/new';
  });

  function showList() {
    var listTemplate = _.template(app.trialListing.researcher, { variable: 'm' });
    $('.rslts-list').html(listTemplate({ results: listState }));
    addNameListeners();
  }

  function addNameListeners() {
    $('.rslt-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.trialDetail.editable, { variable: 'm' });
        $('.rslts-list').html(detailTemplate({ trial: listState[i] }));
        $('.bck-btn').click(showList);
        activateDeleteButton(i);
        activateEditButton(i);
      });
    });
  }

  function activateDeleteButton(i) {
    $('.del-btn').click(function() {
      var modalTemplate = _.template(app.modals.deleteTrial, { variable: 'm' });
      $('.modal-wrapper').html(modalTemplate({ trial: listState[i] }));
      $('.modal-wrapper').toggleClass('visible');
      $('.cancel-delete').click(function() {
        $('.modal-wrapper').removeClass('visible');
      });
      $('.confirm-delete').click(function() {
        if ($('.modal-title').text().toLowerCase() === $('.delete-confirmation').val().toLowerCase()) {
          url = '/api/v1/trials/' + listState[i].id;
          $.ajax({
            type: "DELETE",
            url: '/api/v1/trials/' + listState[i].id,
            contentType : 'application/json',
            dataType: 'json',
          }).done(function(data) {
            trials.splice(trials.indexOf(listState[i]), 1);
            listState.splice(i, 1);
            $('.modal-wrapper').removeClass('visible');
            showList();
          });
        } else {
          $('.modal-error-message').text('input does not match')
        }
      });
    });
  }

  function activateEditButton(i) {
    $('.edit-btn').click(function() {
    document.location.hash = 'researcher/' + r.params.id + '/trials/edit/' + listState[i].id;
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

  });
}
