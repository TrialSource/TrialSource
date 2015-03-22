app.routeEditTrialBasic = function(r) {
  $('#main-content').html($('#edit-study').html());

  $.getJSON('/api/v1/trials/' + r.params.tid).done(function(data) {
    loadContent(data.trial);
  });

  $('.trial-start-input').pickadate({
    format: 'mmmm d, yyyy'
  });
  $('.trial-complete-input').pickadate({
    format: 'mmmm d, yyyy'
  });

  $('.create-trial-form').submit(function(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    var newTrial = grabTrialInfo();
    postTrial(newTrial);
  });

  function loadContent(trial) {
    $('.trial-condition-input').val(trial.conditions[0].name);
    $('.trial-principal-input').val(trial.principal);
    $('.trial-email-input').val(trial.primary_contact_email);
    $('.trial-location-input').val(trial.location);
    $('.trial-title-input').val(trial.name);
    $('.trial-start-input').val(new Date(trial.start_on).toDateString());
    $('.trial-complete-input').val(new Date(trial.estimated_completed_on).toDateString());
    $('.trial-abstract-input').val(trial.description);
  }


  function validateForm() {
    var isValid = true
    $('.trial-input').toArray().forEach(function(item) {
      if (!$(item).val() || $(item).val() === '') {
        isValid = false;
        $('.error-message').text('all fields are required');
      }
      if (isValid && !verifyDates()) {
        isValid = false;
      }
    });
    return isValid;
  }

  function grabTrialInfo() {
    return {
      trial: {
        conditions_attributes: [
          { name: $('.trial-condition-input').val() },
        ],
        conditiony: $('.trial-condition-input').val(),
        principal: $('.trial-principal-input').val(),
        active: 'active',
        primary_contact_email: $('.trial-email-input').val(),
        location: $('.trial-location-input').val(),
        name: $('.trial-title-input').val(),
        start_on: $('.trial-start-input').val(),
        estimated_completed_on: $('.trial-complete-input').val(),
        description: $('.trial-abstract-input').val(),
        doctor_id: r.params.id,
      },
    };
  }

  function postTrial(arg) {
    console.log(arg);
    $.ajax({
      type: "PUT",
      url: '/api/v1/trials/' + r.params.tid,
      data: JSON.stringify(arg),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
      document.location.hash = 'researcher/' + r.params.rid + '/trials';
    });
  }

  function verifyDates() {
    var now = new Date().getTime()
    var start = new Date($('.trial-start-input').val()).getTime();
    var complete = new Date($('.trial-complete-input').val()).getTime();
    if (start <= now) {
      $('.error-message').text('trials cannot begin in the past');
      return false;
    }
    if (start >= complete) {
      $('.error-message').text('est. complete date must be later than start date');
      return false;
    }
    return true;
  }
}
