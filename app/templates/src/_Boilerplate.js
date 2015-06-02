'use strict';

import Component from 'bower:aui-component/src/Component';
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
import './<%= capitalizeName %>.soy';

class <%= capitalizeName %> extends Component {
  constructor(opt_config) {
    super(opt_config);
  }
}

ComponentRegistry.register('<%= capitalizeName %>', <%= capitalizeName %>);

export default <%= capitalizeName %>;
