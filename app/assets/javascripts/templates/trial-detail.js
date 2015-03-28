app.trialDetail = {};

app.trialDetail.editable = '<div class="t-detail-container"><button class="reg-btn bck-btn td-bck-btn">back</button><h1 class="t-detail-header"><%- m.trial.name %></h1><h2 class="t-detail-subhead"><% m.trial.conditions.forEach(function(item, i) { %><%- item.name %><% if (i + 1 !== m.trial.conditions.length) { %>, <% } %><% }) %></h2><div class="sub-dtl-wrap"><p class="t-detail-stats">start date: <%- m.trial.start_on %></br>est. completion: <%- m.trial.estimated_completed_on %></p><p class="t-detail-stats">clicks: <%- m.trial.number_of_views || 0 %></br>appearances: <%- m.trial.number_of_appearances || 0 %></p><p class="t-detail-description"><%- m.trial.description %></p><h3 class="t-detail-subtitle">principal(s): <%- m.trial.principal %></h3><p class="t-detail-contact">primary contact: <%- m.trial.primary_contact_email %></p></div></div><div class="btn-wrp"><button class="reg-btn td-btn del-btn">delete study</button><button class="reg-btn td-btn edit-btn">edit study</button><button class="reg-btn td-btn cls-btn">close study</button></div>';

// app.trialDetail.editable = '<div class="t-detail-container">
//                               <button class="reg-btn bck-btn">back</button>
//                               <h1 class="t-detail-header"><%- m.trial.name %></h1>
//                               <h2 class="t-detail-subhead"><% m.trial.conditions.forEach(function(item, i) { %><%- item.name %><% if (i + 1 !== m.trial.conditions.length) { %>, <% } %><% }) %></h2>
//                               <h2 class="t-detail-org"><%- m.trial.organization %>, <%- m.trial.location %></h2>
//                               <div class="sub-dtl-wrap">
//                                 <h3 class="t-detail-subtitle">principal investigator: <%- m.trial.principal %></h3>
//                                 <span class="t-detail-date">start date: <%- m.trial.start_on %></span>
//                                 <span class="t-detail-date">, est. completion: <%- m.trial.estimated_completed_on %></span>
//                                 <p class="t-detail-description"><%- m.trial.description %></p>
//                                 <p class="t-detail-contact">primary contact: <%- m.trial.primary_contact_email %></p>
//                               </div>
//                             </div>
//                             <div class="btn-wrp">
//                               <button class="reg-btn td-btn del-btn">delete study</button>
//                               <button class="reg-btn td-btn edit-btn">edit study</button>
//                               <button class="reg-btn td-btn cls-btn">close study</button>
//                             </div>';

app.trialDetail.search = '<div class="t-detail-container"><button class="reg-btn bck-btn td-bck-btn">back</button><h1 class="t-detail-header"><%- m.trial.name %></h1><h2 class="t-detail-subhead"><% m.trial.conditions.forEach(function(item, i) { %><%- item.name %><% if (i + 1 !== m.trial.conditions.length) { %>, <% } %><% }) %></h2><div class="sub-dtl-wrap"><p class="t-detail-stats">start date: <%- m.trial.start_on %></p><p class="t-detail-stats">est. completion: <%- m.trial.estimated_completed_on %></p><p class="t-detail-description"><%- m.trial.description %></p><h3 class="t-detail-subtitle">principal(s): <%- m.trial.principal %></h3><p class="t-detail-contact">primary contact: <%- m.trial.primary_contact_email %></p></div></div>';

app.trialDetail.admin = '<div class="t-detail-container"><button class="reg-btn bck-btn td-bck-btn">back</button><h1 class="t-detail-header"><%- m.trial.name %></h1><h2 class="t-detail-subhead"><% m.trial.conditions.forEach(function(item, i) { %><%- item.name %><% if (i + 1 !== m.trial.conditions.length) { %>, <% } %><% }) %></h2><div class="sub-dtl-wrap"><p class="t-detail-stats">start date: <%- m.trial.start_on %></br>est. completion: <%- m.trial.estimated_completed_on %></p><p class="t-detail-stats">clicks: <%- m.trial.number_of_views || 0 %></br>appearances: <%- m.trial.number_of_appearances || 0 %></p><p class="t-detail-description"><%- m.trial.description %></p><h3 class="t-detail-subtitle">principal(s): <%- m.trial.principal %></h3><p class="t-detail-contact">primary contact: <%- m.trial.primary_contact_email %></p></div></div>';

// app.trialDetail.readable = '<div class="t-detail-container">
//                               <button class="reg-btn bck-btn d-bck-btn">back</button>
//                               <h1 class="t-detail-header"><%- m.trial.name %></h1>
//                               <h2 class="t-detail-subhead"><% m.trial.conditions.forEach(function(item, i) { %><%- item.name %><% if (i + 1 !== m.trial.conditions.length) { %>, <% } %><% }) %></h2>
//                               <h2 class="t-detail-org"><%- m.trial.organization %>, <%- m.trial.location %></h2>
//                               <div class="sub-dtl-wrap">
//                                 <h3 class="t-detail-subtitle">principal investigator: <%- m.trial.principal %></h3>
//                                 <span class="t-detail-date">start date: <%- m.trial.start_on %></span>
//                                 <span class="t-detail-date">, est. completion: <%- m.trial.estimated_completed_on %></span>
//                                 <p class="t-detail-description"><%- m.trial.description %></p>
//                                 <p class="t-detail-contact">primary contact: <%- m.trial.primary_contact_email %></p>
//                               </div>
//                             </div>';
