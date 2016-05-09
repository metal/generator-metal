'use strict';
<% if (templateLanguage === 'Soy') { %>
import templates from './<%= capitalizeName %>.soy';<% } %>
import Component from 'metal-component';<% if (templateLanguage === 'Soy') { %>
import Soy from 'metal-soy';<% } %><% if (templateLanguage === 'JSX') { %>
import JSX from 'metal-jsx';<% } %>

class <%= capitalizeName %> extends Component {<% if (templateLanguage === 'JSX') { %>
	render() {
		return <div>Hello World</div>;
	}<% } %>
}<% if (templateLanguage === 'Soy') { %>
Soy.register(<%= capitalizeName %>, templates);<% } else if (templateLanguage === 'JSX') { %>
JSX.register(<%= capitalizeName %>);<% } %>

export default <%= capitalizeName %>;
