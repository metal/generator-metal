'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('aui:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'demo/index.html',
      'src/Boilerplate.js',
      'src/Boilerplate.scss',
      'src/Boilerplate.soy',
      'test/Boilerplate.js',
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
