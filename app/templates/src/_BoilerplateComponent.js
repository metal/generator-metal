'use strict';
<% if (templateLanguage === 'Soy') { %>
import templates from './<%= capCaseName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';<% } else if (templateLanguage === 'JSX') { %>
import JSXComponent from 'metal-jsx';<% } else { %>
import Component from 'metal-component';<% } %>

<% if (templateLanguage === 'JSX') { %>class <%= capCaseName %> extends JSXComponent {
	render() {
		return <div>Hello World</div>;
	}
}<% } else { %>class <%= capCaseName %> extends Component {
}<% } %><% if (templateLanguage === 'Soy') { %>
Soy.register(<%= capCaseName %>, templates);<% } %>

export default <%= capCaseName %>;
