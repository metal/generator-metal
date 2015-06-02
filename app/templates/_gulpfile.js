'use strict';

var auiTasks = require('aui-tasks');

auiTasks({
	bundleCssFileName: '<%= lowercaseName %>.css',
	bundleFileName: '<%= lowercaseName %>.js'
});
