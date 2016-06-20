'use strict';
<% if (templateLanguage === 'Soy') { %>
import templates from './<%= capitalizeName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';<% } else if (templateLanguage === 'JSX') { %>
import JSXComponent from 'metal-jsx';<% } else { %>
import Component from 'metal-component';<% } %>

<% if (templateLanguage === 'JSX') { %>class <%= capitalizeName %> extends JSXComponent {
	render() {
		return <div>Hello World</div>;
	}
}<% } else { %>class <%= capitalizeName %> extends Component {
}<% } %><% if (templateLanguage === 'Soy') { %>
Soy.register(<%= capitalizeName %>, templates);<% } %>

export default <%= capitalizeName %>;
