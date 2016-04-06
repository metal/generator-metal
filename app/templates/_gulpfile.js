'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: '<%= lowercaseName %>.css',
	bundleFileName: '<%= lowercaseName %>.js',<% if (buildFormat !== 'globals') { %>
	mainBuildJsTasks: ['build:<%= buildFormat %>:js'],<% } %>
	moduleName: '<%= repoName %>'<% if (templateLanguage !== 'Soy') { %>,
	noSoy: true<% } %><% if (isNodeModule) { %>,
	testNodeSrc: [
		'env/test/node.js',
		'test/**/*.js'
	]<% } %>
});
