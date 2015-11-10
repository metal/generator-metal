'use strict';

<% if (superClass === 'Component') { %>import <%= capitalizeName %>Base from './<%= capitalizeName %>.soy';<% } else if (superClass === 'Attribute') { %>import Attribute from 'bower:metal/src/attribute/Attribute';<% } %>

class <%= capitalizeName %><% if (superClass !== 'none') { %> extends <% if (superClass === 'Component') { %><%= capitalizeName %>Base<% } else { %>Attribute<% } %><% } %> {
}<% if (superClass === 'Component') { %>
<%= capitalizeName %>Base.setImpl(<%= capitalizeName %>);<% } %>

export default <%= capitalizeName %>;
