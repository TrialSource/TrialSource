app.routeResearcherManager = function(r) {
  var researchers = [];
  $('#main-content').html($('#manage-researchers').html());
  $.getJSON('/api/v1/doctors/org', { org: r.params.id }).done(function(data) {
    researchers = data.doctors;
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
    }).done(function(data) {
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
          var trialsTemplate = _.template(app.trialListing, { variable: 'm' });
          $('.rsrchr-trials-cntnr').html(trialsTemplate({ results: trials }));
          addTrialListeners(trials);
        });
      });
    });
  }

  function addTrialListeners(trials) {
    $('.rslt-name').toArray().forEach(function(trial, i) {
      $(trial).click(function(e) {
        var trialDetailTemplate = _.template(app.trialDetail.readable, { variable: 'm' });
        $('.rsrchr-trials-cntnr').html(trialDetailTemplate({ trial: trials[i] }));
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
    $('.researcher-list-actual').html(listTemplate({ drs: researchers }));
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
};
