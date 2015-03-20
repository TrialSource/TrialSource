app.routeResearcherManager = function(r) {

  $('#main-content').html($('#manage-researchers').html());
  // var listTemplate = _.template(app.researcherListing, { variable: 'm' });
  // $('.rslts-list').html(listTemplate({ results: data.trials }));


  // $.getJSON('/api/v1/search/', query).done(function(data) {
  //   console.log(data);
  // });

  $.getJSON('/api/v1/doctors/org', { org: r.params.id }).done(function(data) {
    console.log(data);
  });

  // $.ajax({
  //   type: "GET",
  //   url: '/api/v1/search/',
  //   data: JSON.stringify(query),
  //   contentType : 'application/json',
  //   dataType: 'json'
  // }).done(function(data) {
  //   console.log('fire');
  //   console.log(data);
  // });

  $('.researcher-creation-form').submit(function(e) {
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
      console.log('fire');
      console.log(data);
    });
  })

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

  function grabResearcher() {
    return {
      first_name: $('.researcher-first-name-input').val(),
      last_name: $('.researcher-last-name-input').val(),
      organization_id: r.params.id,
      login_attributes: {  email: $('.researcher-email-input').val(),
                password: $('.researcher-password-one').val(),
              },
    };
  }
};
