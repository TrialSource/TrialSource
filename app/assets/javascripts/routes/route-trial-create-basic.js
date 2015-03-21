app.routeCreateTrialBasic = function(r) {
  $('#main-content').html($('#create-study').html());
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
        conditions_attributes: {
          name: $('.trial-condition-input').val(),
        },
        principal: $('.trial-principal-input').val(),
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
      type: "POST",
      url: '/api/v1/trials',
      data: JSON.stringify(arg),
      contentType : 'application/json',
      dataType: 'json'
    }).done(function(data) {
      console.log(trial);
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
