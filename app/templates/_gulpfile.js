'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: '<%= lowercaseName %>.css',
	bundleFileName: '<%= lowercaseName %>.js',
	globalName: '<%= namespace %>',
	mainBuildJsTasks: ['build:<%= buildFormat %>'],
	moduleName: '<%= repoName %>'
});
