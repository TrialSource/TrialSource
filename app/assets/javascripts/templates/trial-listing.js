app.trialListing = {};
app.trialListing.admin = '<li class="btn-wrp"><button class="reg-btn r-btn bck-btn">back</button><button class="reg-btn r-btn r-edit">edit</button><button class="reg-btn r-btn del-btn">delete</button></li><li class="rslts-hdr rslt-listing"><span class="rslt-info rslt-hdr-info">trial name</span><span class="rslt-info rslt-hdr-info">conditions</span><span class="rslt-info rslt-hdr-info">location</span><span class="rslt-info rslt-hdr-info">start date</span></li><% m.results.forEach(function(result, i) { %><li data="<%- result.id %>"class="rslt-listing"><span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span><span class="rslt-info"><% m.results[i].conditions.forEach(function(item, j) { %><%- item.name %><% if (j + 1 !== m.results[i].conditions.length) { %>, <% } %><% }) %></span><span class="rslt-info"><%- result.location %></span><span class="rslt-info"><%- result.start_on %></span></li><% }) %>';
app.trialListing.researcher = '<li class="rslts-hdr rslt-listing"><span class="rslt-info rslt-hdr-info">trial name</span><span class="rslt-info rslt-hdr-info">conditions</span><span class="rslt-info rslt-hdr-info">location</span><span class="rslt-info rslt-hdr-info">start date</span></li><% m.results.forEach(function(result, i) { %><li data="<%- result.id %>"class="rslt-listing"><span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span><span class="rslt-info"><% m.results[i].conditions.forEach(function(item, j) { %><%- item.name %><% if (j + 1 !== m.results[i].conditions.length) { %>, <% } %><% }) %></span><span class="rslt-info"><%- result.location %></span><span class="rslt-info"><%- result.start_on %></span></li><% }) %>';

// app.trialListing.admin = '<li class="btn-wrp">
//                             <button class="reg-btn r-btn bck-btn"><span class="icon">a</span> back</button>
//                             <button class="reg-btn r-btn r-edit">edit</button>
//                             <button class="reg-btn r-btn del-btn">delete</button>
//                           </li>
//                           <li class="rslts-hdr rslt-listing">
//                             <span class="rslt-info rslt-hdr-info">trial name</span>
//                             <span class="rslt-info rslt-hdr-info">conditions</span>
//                             <span class="rslt-info rslt-hdr-info">location</span>
//                             <span class="rslt-info rslt-hdr-info">start date</span>
//                           </li>
//                           <% m.results.forEach(function(result, i) { %>
//                             <li data="<%- result.id %>"class="rslt-listing">
//                               <span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span>
//                               <span class="rslt-info">
//                                 <% m.results[i].conditions.forEach(function(item, j) { %>
//                                   <%- item.name %>
//                                   <% if (j + 1 !== m.results[i].conditions.length) { %>, <% } %>
//                                 <% }) %>
//                               </span>
//                               <span class="rslt-info"><%- result.location %></span>
//                               <span class="rslt-info"><%- result.start_on %></span>
//                             </li>
//                           <% }) %>';

app.trialListing.search = '<li class="rslts-hdr rslt-listing"><span class="rslt-info rslt-hdr-info">trial name</span><span class="rslt-info rslt-hdr-info">conditions</span><span class="rslt-info rslt-hdr-info">organization</span><span class="rslt-info rslt-hdr-info">location</span><span class="rslt-info rslt-hdr-info">start date</span></li><% m.results.forEach(function(result, i) { %><li data="<%- result.id %>"class="rslt-listing"><span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span><span class="rslt-info"><% m.results[i].conditions.forEach(function(item, j) { %><%- item.name %><% if (j + 1 !== m.results[i].conditions.length) { %>, <% } %><% }) %></span><span class="rslt-info"><%- result.organization %></span><span class="rslt-info"><%- result.location %></span><span class="rslt-info"><%- result.start_on %></span></li><% }) %>';

// app.trialListing.search = '<li class="rslts-hdr rslt-listing">
//                              <span class="rslt-info rslt-hdr-info">trial name</span>
//                              <span class="rslt-info rslt-hdr-info">conditions</span>
//                              <span class="rslt-info rslt-hdr-info">organization</span>
//                              <span class="rslt-info rslt-hdr-info">location</span>
//                              <span class="rslt-info rslt-hdr-info">start date</span>
//                            </li>
//                            <% m.results.forEach(function(result, i) { %>
//                              <li data="<%- result.id %>"class="rslt-listing">
//                                <span class="rslt-info rslt-name" data="<%- i %>"><%- result.name %></span>
//                                <span class="rslt-info">
//                                  <% m.results[i].conditions.forEach(function(item, j) { %>
//                                    <%- item.name %>
//                                    <% if (j + 1 !== m.results[i].conditions.length) { %>, <% } %>
//                                  <% }) %>
//                                </span><span class="rslt-info"><%- result.organization %>
//                                </span><span class="rslt-info"><%- result.location %></span>
//                                <span class="rslt-info"><%- result.start_on %></span>
//                              </li>
//                            <% }) %>';
