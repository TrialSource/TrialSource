app.researcherListing = '<ul><% m.drs.forEach(function(dr) { %><li data="<%- dr.id %>"class="researcher-listing"><span class="r-listing-info r-name"><%- dr.first_name %> <%- dr.last_name %></span><span class="r-listing-info"><%- dr.login.email %></span><span class="r-listing-info">Active Trials: <%- dr.number_of_trials %></span></li><% }) %></ul>';

// app.researcherListing = '<ul>
//                            <% m.drs.forEach(function(dr) { %>
//                              <li data="<%- dr.id %>"class="researcher-listing">
//                                <span class="r-listing-info r-name"><%- dr.first_name %> <%- dr.last_name %></span>
//                                <span class="r-listing-info"><%- dr.login.email %></span>
//                                <span class="r-listing-info">Active Trials: <%- dr.number_of_trials %></span>
//                              </li>
//                            <% }) %>
//                          </ul>';
