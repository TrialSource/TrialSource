app.researcherListing = '<% m.drs.forEach(function(dr) { %><li data="<%- dr.id %>"class="dr-listing"><span class="dr-info">Dr. <%- dr.first_name %> <%- dr.last_name %></span><span class="dr-info"><%- dr.email %></span><span class="dr-info">Active Trials:</span></li><% }) %>';
