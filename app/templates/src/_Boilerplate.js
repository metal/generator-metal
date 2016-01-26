'use strict';<% if (superClass === 'Component') { %>

import <%= capitalizeName %>Base from './<%= capitalizeName %>.soy';<% } else if (superClass === 'Attribute') { %>

import Attribute from 'npm:metal/src/attribute/Attribute';<% } %>

class <%= capitalizeName %><% if (superClass !== 'none') { %> extends <% if (superClass === 'Component') { %><%= capitalizeName %>Base<% } else { %>Attribute<% } %><% } %> {
}

export default <%= capitalizeName %>;
