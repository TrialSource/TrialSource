app.savemeExcl = '<div class="checkbox-wrapper"><% m.exclusionsList.forEach(function(item) { %><label class="excl-lbl"><input class="excl-chck" type="checkbox" name="<%- item.name %>" value="<%- item.id %>" /><span class="excl-lbl-txt"><%- item.name %></span></label><% }) %></div>'
