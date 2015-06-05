'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './<%= capitalizeName %>.soy';

class <%= capitalizeName %> extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

ComponentRegistry.register('<%= capitalizeName %>', <%= capitalizeName %>);

export default <%= capitalizeName %>;
