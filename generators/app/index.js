'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the unreal ' + chalk.red('Aui') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('demo/_index.html'), this.destinationPath('demo/index.html')
    );
    this.fs.copy(
      this.templatePath('src/_Boilerplate.js'), this.destinationPath('src/Boilerplate.js')
    );
    this.fs.copy(
      this.templatePath('src/_Boilerplate.scss'), this.destinationPath('src/Boilerplate.scss')
    );
    this.fs.copy(
      this.templatePath('src/_Boilerplate.soy'), this.destinationPath('src/Boilerplate.soy')
    );
    this.fs.copy(
      this.templatePath('test/_Boilerplate.js'), this.destinationPath('test/Boilerplate.js')
    );
    this.fs.copy(
      this.templatePath('test/jshintrc'), this.destinationPath('test/.jshintrc')
    );
    this.fs.copy(
      this.templatePath('_bower.json'), this.destinationPath('bower.json')
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('_karma.conf.js'), this.destinationPath('karma.conf.js')
    );
    this.fs.copy(
      this.templatePath('_package.json'), this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('_README.md'), this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('editorconfig'), this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitignore'), this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('jshintrc'), this.destinationPath('.jshintrc')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
