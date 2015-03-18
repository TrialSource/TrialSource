app.Admin = function(spec) {
  spec = spec || {};
  return {
    org_name: spec.orgName,
    login_attributes: {
      email: spec.email,
      password: spec.password
    }
  };
};
