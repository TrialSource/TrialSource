app.Researcher = function(spec) {
  spec = spec || {};
  return {
    first_name: spec.firstName,
    last_name: spec.lastName,
    admin_id: spec.adminId,
    login_attributes {
      email: spec.email,
      password: spec.password
    }
  };
};
