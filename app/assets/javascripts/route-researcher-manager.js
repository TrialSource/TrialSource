app.routeResearcherManager = function(r) {

  $('#main-content').html($('#manage-researchers').html());
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
      organization: r.params.id,
      login: {  email: $('.researcher-email-input').val(),
                password: $('.researcher-password-one').val(),
              },
    };
  }
};
