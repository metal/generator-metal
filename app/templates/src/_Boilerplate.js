'use strict';<% if (superClass === 'Component') { %>

import templates from './<%= capitalizeName %>.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';<% } else if (superClass === 'State') { %>

import State from 'metal-state';<% } %>

class <%= capitalizeName %><% if (superClass !== 'none') { %> extends <%= superClass %> <% } %> {
}<% if (superClass === 'Component') { %>
Soy.register(<%= capitalizeName %>, templates);<% } %>

export default <%= capitalizeName %>;
