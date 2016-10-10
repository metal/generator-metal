'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metal:app', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.withOptions({ skipInstall: true })
			.withPrompts({
				defaultKarmaConfig: false,
				repoOwner: 'my-user',
				repoDescription: 'My awesome Metal project'
			})
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'demos/index.html',
			'src/SelectInput.js',
			'src/select-input.scss',
			'src/SelectInput.soy',
			'test/SelectInput.js',
			'test/.jshintrc',
			'gulpfile.js',
			'karma.conf.js',
			'karma-coverage.conf.js',
			'package.json',
			'README.md',
			'.editorconfig',
			'.gitignore',
			'.jshintrc'
		]);
	});
});
