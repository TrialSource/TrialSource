app.researcherListing = '<% m.drs.forEach(function(dr) { %><li data="<%- dr.id %>"class="researcher-listing"><span class="r-listing-info"><%- dr.first_name %> <%- dr.last_name %></span><span class="r-listing-info"><%- dr.email %></span><span class="r-listing-info">Active Trials:</span></li><% }) %>';