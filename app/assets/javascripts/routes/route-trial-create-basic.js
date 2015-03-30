app.routeCreateTrialBasic = function(r) {
  if (app.bounce(true)) {
    return;
  }

  $('#main-content').html($('#create-study').html());

  app.addressAutofill();

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
        condition_ids: grabConditionIds(),
        conditions_attributes: grabConditionNames(),
        exclusion_ids: grabExclusionIds(),
        exclusions_attributes: grabExclusionNames(),
        principal: $('.trial-principal-input').val(),
        active: true,
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
      type: "POST",
      url: '/api/v1/trials',
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

  $.getJSON('/api/v1/exclusions').done(function(data) {
    var contraTemplate = _.template(app.contraOption, { variable: 'm' });
    $('.contra-selector').html(contraTemplate({ contras: data.exclusions }));
  });

  $('.contra-selector').select2({
    tags: true,
    theme: 'classic',
    dropdownParent: document.querySelector('body'),
  });

  $.getJSON('/api/v1/conditions').done(function(data) {
    var contraTemplate = _.template(app.contraOption, { variable: 'm' });
    $('.trial-condition-input').html(contraTemplate({ contras: data.conditions[2] }));
  });

  $('.trial-condition-input').select2({
    tags: true,
    theme: 'classic',
    dropdownParent: document.querySelector('body'),
  });

  function grabExclusionNames() {
    var exclusionNames = [];

    if ($('.contra-selector').val()) {
      $('.contra-selector').val().forEach(function(item) {
        if (!Number(item)) {
          exclusionNames.push({ name: item });
        }
      });
    }

    return exclusionNames;
  }

  function grabExclusionIds() {
    var exclusionIds = [];

    if ($('.contra-selector').val()) {
      $('.contra-selector').val().forEach(function(item) {
        if (Number(item)) {
          exclusionIds.push(Number(item));
        }
      });
    }

    return exclusionIds;
  }

  function grabConditionNames() {
    var conditionNames = [];

    if ($('.trial-condition-input').val()) {
      $('.trial-condition-input').val().forEach(function(item) {
        if (!Number(item)) {
          conditionNames.push({ name: item });
        }
      });
    }

    return conditionNames;
  }

  function grabConditionIds() {
    var conditionIds = [];

    if ($('.trial-condition-input').val()) {
      $('.trial-condition-input').val().forEach(function(item) {
        if (Number(item)) {
          conditionIds.push(Number(item));
        }
      });
    }

    return conditionIds;
  }
}
