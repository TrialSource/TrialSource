app.trialListing = '<ul class="rslts-list"><% m.results.forEach(function(result, i) { %><li data="<%- result.id %>"class="rslt-listing"><span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span><span class="rslt-info"><%- result.conditions[0] %></span><span class="rslt-info"><%- result.location %></span><span class="rslt-info"><%- result.start_on %></span></li><% }) %></ul>';
