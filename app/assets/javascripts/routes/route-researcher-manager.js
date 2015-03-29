app.routeResearcherManager = function(r) {
  if (app.bounce(true)) {
    return;
  }
  var researchers = [];
  var listState = [];
  $('#main-content').html($('#manage-researchers').html());
  $.getJSON('/api/v1/doctors/org', { org: r.params.id }).done(function(data) {
    researchers = data.doctors;
    listState = researchers;
    showList();
  });

  $('.researcher-creation-form').submit(submitNewResearcher);

  function submitNewResearcher(e) {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    var researcher = grabResearcher();
    $.ajax({
      type: "POST",
      url: '/api/v1/doctors/',
      data: JSON.stringify(researcher),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function(data) {
      researchers.push(data.doctor);
      listState = researchers;
      $('.error-message').text('');
      clearForm();
      showList();
    }).fail(function(err) {
      $('.error-message').text('email already in use');
    });
  }

  function addNameListeners() {
    $('.r-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.researcherDetail, { variable: 'm' });
        $('.researcher-list-actual').html(detailTemplate({ researcher: listState[i] }));
        var trials = [];
        $.getJSON('/api/v1/trials/doctor', { doctor: listState[i].id }).done(function(data) {
          trials = data.trials;
          displayResearcherDetail(trials, i);
        });
        $('.researcher-search').attr('disabled', true);
      });
    });
  }

  function displayResearcherDetail(trials, index) {
    var trialsTemplate = _.template(app.trialListing.admin, { variable: 'm' });
    $('.rslts-list').html(trialsTemplate({ results: trials }));
    addTrialListeners(trials, index);
    activateDeleteButton(index);
    activateEditButton(index);
    $('.bck-btn').click(showList);
  }

  function activateDeleteButton(i) {
    $('.del-btn').click(function() {
      var modalTemplate = _.template(app.modals.deleteResearcher, { variable: 'm' });
      $('.modal-wrapper').html(modalTemplate({ researcher: listState[i] }));
      $('.modal-wrapper').toggleClass('visible');
      $('.cancel-delete').click(function() {
        $('.modal-wrapper').removeClass('visible');
      });
      $('.confirm-delete').click(function() {
        if ($('.modal-title').text().toLowerCase() === $('.delete-confirmation').val().toLowerCase()) {
          $.ajax({
            type: "DELETE",
            url: '/api/v1/doctors/' + listState[i].id,
            contentType : 'application/json',
            dataType: 'json',
          }).done(function(data) {
            researchers.splice(researchers.indexOf(listState[i]), 1);
            listState.splice(i, 1);
            $('.modal-wrapper').removeClass('visible');
            showList();
          });
        } else {
          $('.modal-error-message').text('input does not match');
        }
      });
    });
  }

  function activateEditButton(i) {
    $('.r-edit').click(function() {

    })
  }

  function addTrialListeners(trials, j) {
    $('.rslt-name').toArray().forEach(function(trial, i) {
      $(trial).click(function(e) {
        var trialDetailTemplate = _.template(app.trialDetail.admin, { variable: 'm' });
        $('.rslts-list').html(trialDetailTemplate({ trial: trials[i] }));
        $('.bck-btn').click(function() {
          displayResearcherDetail(trials, j)
        })
      })
    })
  }

  function validateInput() {
    var isValid = true;

    if (!$('.researcher-email-input').val().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/)) {
      $('.error-message').text('not a valid email');
      isValid = false;
    }

    if ($('.researcher-password-one').val() !== $('.researcher-password-two').val()) {
      isValid = false;
      $('.error-message').text('passwords must match');
    }

    $('.researcher-input').toArray().forEach(function(item) {
      if (!$(item).val() || $(item).val() === '') {
        isValid = false;
        $('.error-message').text('all fields are required');
      }
    });

    return isValid;
  }

  function showList() {
    var listTemplate = _.template(app.researcherListing, { variable: 'm' });
    $('.researcher-list-actual').html(listTemplate({ drs: listState }));
    addNameListeners();
    $('.researcher-search').removeAttr('disabled');
  }

  function grabResearcher() {
    return {
      doctor: {
        first_name: $('.researcher-first-name-input').val(),
        last_name: $('.researcher-last-name-input').val(),
        organization_id: r.params.id,
        login_attributes: {  email: $('.researcher-email-input').val(),
                  password: $('.researcher-password-one').val(),
                },
      },
    };
  }

  function clearForm() {
    $('.researcher-input').val('');
  }

  $('.researcher-search').keyup(function(e) {
    var term = $('.researcher-search').val().toLowerCase();

    if (!term) {
      listState = researchers;
      showList();
      return;
    }

    var show = setTimeout(performSearch, 250);

    $('.researcher-search').on('keydown', cancelSearch);

    function cancelSearch() {
      clearTimeout(show);
      $('.researcher-search').off('keydown', cancelSearch);
    }

    function performSearch() {
      $('.researcher-search').off('keydown', cancelSearch);
      var tempState = listState;
      listState = [];
      researchers.forEach(function(researcher) {
        var ref = researcher.first_name.toLowerCase() + ' ' + researcher.last_name.toLowerCase();
        if (ref.indexOf(term) > -1) {
          listState.push(researcher)
        }
      });
      showList();
    }

  })
};
