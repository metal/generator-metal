'use strict';
<% if (templateLanguage === 'Soy') { %>
import templates from './<%= componentName %>.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';<% } else if (templateLanguage === 'JSX') { %>
import JSXComponent from 'metal-jsx';<% } else { %>
import Component from 'metal-component';<% } %>

import './<%= kebabCaseName %>.scss';

<% if (templateLanguage === 'JSX') { %>class <%= componentName %> extends JSXComponent {
	render() {
		return <div class="<%= kebabCaseName %>">Hello World</div>;
	}
}<% } else { %>class <%= componentName %> extends Component {
}<% } %><% if (templateLanguage === 'Soy') { %>
Soy.register(<%= componentName %>, templates);<% } %>

export { <%= componentName %> };
export default <%= componentName %>;
