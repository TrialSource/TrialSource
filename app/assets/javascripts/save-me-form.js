app.populateSaveMe = function(condition, exclusionIds) {
  disableGeoform();
  initializeForm();

  function disableGeoform() {
    $('.geo-element').attr('disabled', 'true');
  }

  function initializeForm() {
    $.getJSON('/api/v1/search', { type: 'condition', query: condition}).done(function(data) {
      var exclusions = buildExclusionList(exclusionIds, data.searches[1])
      $('.rslts-cntnr').html($('#signup').html());
      var listTemplate = _.template(app.savemeExcl, { variable: 'm' });
      $('.signup-exclusion-list').html(listTemplate({ exclusionsList: exclusions }));
      $('.excl-chck').attr('checked', 'true');
      $('.signup-form').submit(function(e) {
        e.preventDefault();
        if (!verifyForm()) {
          return;
        }
        document.location.hash = '';
        document.location.reload(true);
      });
    });
  }

  function buildExclusionList(ids, objects) {
    var list = [];
    for (var i = 0; i < ids.length; ++i) {
      for (var j = 0; j < objects.length; ++j) {
        if (Number(ids[i]) === objects[j].id) {
          list.push(objects[j]);
          break;
        }
      }
    }
    return list;
  }

  function verifyForm() {
    if (!$('.saveme-email-input').val()) {
      $('.saveme-error-message').text('email required');
      return false;
    }
    if (!$('.saveme-email-input').val().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/)) {
      $('.saveme-error-message').text('not a valid email');
      return false;
    }
    return true;
  }

};
