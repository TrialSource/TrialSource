app.trialDetail = {};

app.trialDetail.editable = '<div class="t-detail-container"><button class="reg-btn bck-btn">back</button><h1 class="t-detail-header"><%- m.trial.name %></h1><h2 class="t-detail-subhead"><%- m.trial.conditiony %></h2><h3 class="t-detail-subtitle"><%- m.trial.principal %></h3><p class="t-detail-date">start date: <%- m.trial.starts_on %></p><p class="t-detail-date">est. completion: <%- m.trial.estimated_completed_on %></p><p class="t-detail-location"><%- m.trial.location %></p><p class="t-detail-description"><%- m.trial.description %></p><p class="t-detail-contact">primary contact: <%- m.trial.contact %></p><button class="reg-btn td-btn del-btn">delete study</button><button class="reg-btn td-btn edit-btn">edit study</button><button class="reg-btn td-btn cls-btn">close study</button></div>';

app.trialDetail.readable = '<div class="t-detail-container"><button class="reg-btn bck-btn">back</button><h1 class="t-detail-header"><%- m.trial.name %></h1><h2 class="t-detail-subhead"><%- m.trial.conditiony %></h2><h3 class="t-detail-subtitle"><%- m.trial.principal %></h3><p class="t-detail-date">start date: <%- m.trial.starts_on %></p><p class="t-detail-date">est. completion: <%- m.trial.estimated_completed_on %></p><p class="t-detail-location"><%- m.trial.location %></p><p class="t-detail-description"><%- m.trial.description %></p><p class="t-detail-contact">primary contact: <%- m.trial.contact %></p></div>';
