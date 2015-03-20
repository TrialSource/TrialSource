app.routeAdminMain = function(r) {
  $.getJSON('/api/v1/organizations/' + r.params.id).done(function(data) {
    $('#main-content').html($('#admin-nav').html());
    $('.admin-dr-link').attr('href', '#admin/' + r.params.id + '/researchers')
    $('.org-name').text(data.organization.org_name + ' ');
  });
};
