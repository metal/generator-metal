'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('metal:app', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.withOptions({ skipInstall: true })
			.withPrompts({
				componentName: 'MyComponent',
				repoName: 'my-repo',
				repoOwner: 'my-user',
				repoDescription: 'My awesome Metal project'
			})
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'demo/index.html',
			'src/MyComponent.js',
			'src/MyComponent.scss',
			'src/MyComponent.soy',
			'test/MyComponent.js',
			'test/.jshintrc',
			'bower.json',
			'gulpfile.js',
			'karma.conf.js',
			'package.json',
			'README.md',
			'.editorconfig',
			'.gitignore',
			'.jshintrc'
		]);
	});
});
