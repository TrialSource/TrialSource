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
    clearForm();
    $.ajax({
      type: "POST",
      url: '/api/v1/doctors/',
      data: JSON.stringify(researcher),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function() {
      researchers.push(researcher.doctor);
      listState = researchers;
      showList();
    });
  }

  function addNameListeners() {
    $('.r-name').toArray().forEach(function(name, i) {
      $(name).click(function(e) {
        var detailTemplate = _.template(app.researcherDetail, { variable: 'm' });
        $('.researcher-list-actual').html(detailTemplate({ researcher: researchers[i] }));
        $('.bck-btn').click(showList);
        var trials = [];
        $.getJSON('/api/v1/trials/doctor', { doctor: researchers[i].id }).done(function(data) {
          trials = data.trials;
          var trialsTemplate = _.template(app.trialListing.admin, { variable: 'm' });
          $('.rslts-list').html(trialsTemplate({ results: trials }));
          addTrialListeners(trials);
          activateDeleteButton(i);
          activateEditButton(i);
        });
      });
    });
  }

  function activateDeleteButton(i) {
    $('.del-btn').click(function() {
      var modalTemplate = _.template(app.modals.deleteResearcher, { variable: 'm' });
      $('.modal-wrapper').html(modalTemplate({ researcher: researchers[i] }));
      $('.modal-wrapper').toggleClass('visible');
      $('.cancel-delete').click(function() {
        $('.modal-wrapper').removeClass('visible');
      });
      $('.confirm-delete').click(function() {
        if ($('.modal-title').text().toLowerCase() === $('.delete-confirmation').val().toLowerCase()) {
          $.ajax({
            type: "DELETE",
            url: '/api/v1/doctors/' + researchers[i].id,
            contentType : 'application/json',
            dataType: 'json',
          }).done(function(data) {
            researchers.splice(i, 1);
            listState = researchers;
            $('.modal-wrapper').removeClass('visible');
            showList();
          });
        } else {
          alert('your shit no match');
        }
      });
    });
  }

  function activateEditButton(i) {
    $('.r-edit').click(function() {

    })
  }

  function addTrialListeners(trials) {
    $('.rslt-name').toArray().forEach(function(trial, i) {
      $(trial).click(function(e) {
        var trialDetailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.rslts-list').html(trialDetailTemplate({ trial: trials[i] }));
        $('.t-detail-container').find('.bck-btn').remove();
      })
    })
  }

  function validateInput() {
    var isValid = true;

    if ($('.researcher-password-one').val() !== $('.researcher-password-two').val()) {
      isValid = false
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
