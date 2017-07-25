'use strict';

import <%= componentName %> from '../src/<%= componentName %>';

describe('<%= componentName %>', function() {
	it('should be tested', function() {<% if (testEnviroment === 'Jest') { %>
		expect('No tests for this module yet.').toBe('Everything is ok.');<% } else { %>
		assert.fail('No tests for this module yet.');<% } %>
	});
});
