app.routeEditTrialBasic = function(r) {
  if (app.bounce(true)) {
    return;
  }

  $('#main-content').html($('#edit-study').html());

  app.addressAutofill();

  var currentTrial;

  $.getJSON('/api/v1/trials/' + r.params.tid).done(function(data) {
    currentTrial = data.trial;
    loadContent(currentTrial);
  });

  $('.trial-start-input').pickadate({
    format: 'mmmm d, yyyy'
  });
  $('.trial-complete-input').pickadate({
    format: 'mmmm d, yyyy'
  });

  $('.trial-submit').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    var newTrial = grabTrialInfo();
    postTrial(newTrial);
  });

  $('.cancel-edit').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    document.location.hash = 'researcher/' + r.params.id + '/trials';
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

    if (!$('.trial-email-input').val().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/)) {
      $('.error-message').text('not a valid email');
      isValid = false;
    }

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
          { name: $('.trial-condition-input').val(), id: currentTrial.conditions[0].id },
        ],
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
    $.ajax({
      type: "PUT",
      url: '/api/v1/trials/' + r.params.tid,
      data: JSON.stringify(arg),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function(data) {
      document.location.hash = 'researcher/' + r.params.id + '/trials';
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
