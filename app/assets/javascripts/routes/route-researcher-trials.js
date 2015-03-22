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
        activateDeleteButton(i);
        activateEditButton(i);
      });
    });
  }

  function activateDeleteButton(i) {
    $('.del-btn').click(function() {
      var modalTemplate = _.template(app.modals.deleteTrial, { variable: 'm' });
      $('.modal-wrapper').html(modalTemplate({ trial: trials[i] }));
      $('.modal-wrapper').toggleClass('visible');
      $('.cancel-delete').click(function() {
        $('.modal-wrapper').removeClass('visible');
      });
      $('.confirm-delete').click(function() {
        if ($('.modal-title').text().toLowerCase() === $('.delete-confirmation').val().toLowerCase()) {
          url = '/api/v1/trials/' + trials[i].id;
          $.ajax({
            type: "DELETE",
            url: '/api/v1/trials/' + trials[i].id,
          }).done(function(data) {
            trials.splice(i, 1);
            showAllResults();
          });
        } else {
          alert('your shit no match');
        }
      });
    });
  }

  function activateEditButton(i) {

  }
}
