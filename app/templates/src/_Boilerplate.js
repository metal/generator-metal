'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './<%= capitalizeName %>.soy';

class <%= capitalizeName %> extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

<%= capitalizeName %>.ELEMENT_CLASSES = '<%= lowercaseName %>';

ComponentRegistry.register('<%= capitalizeName %>', <%= capitalizeName %>);

export default <%= capitalizeName %>;
