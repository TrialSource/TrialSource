app.Trial = function(spec) {
  spec = spec || {};
  return {
    name: spec.name,
    condition: spec.condition,
    // principal: spec.principal,
    description: spec.description,
    location: spec.location,
    // startDate: spec.startDate,
    // completeDate: spec.completeDate,
  };
};
