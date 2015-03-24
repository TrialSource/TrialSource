app.routeAdminMain = function(r) {
  if (app.bounce(true)) {
    return;
  }
  $.getJSON('/api/v1/organizations/' + r.params.id).done(function(data) {
    $('#main-content').html($('#admin-nav').html());
    $('.admin-dr-link').attr('href', '#admin/' + r.params.id + '/researchers')
    $('.admin-trial-link').attr('href', '#admin/' + r.params.id + '/trials')
    $('.org-name').text(data.organization.org_name + ' ');
  });
};
