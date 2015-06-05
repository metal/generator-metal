'use strict';

var _      = require('lodash');
var chalk  = require('chalk');
var path   = require('path');
var yeoman = require('yeoman-generator');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.log(yosay(
			'Welcome, let\'s generate a ' + chalk.blue('Metal') + ' project!'
		));
	},

	prompting: function () {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'componentName',
			message: 'How do you want to name this component?',
			default: 'MyComponent',
			validate: function(input) {
				if (!input) {
					return 'You must provide a component name.';
				}

				return true;
			}
		},
		{
			type: 'input',
			name: 'namespace',
			message: 'What\'s the metal component namespace?',
			default: 'alloy',
			validate: function(input) {
				if (!input) {
					return 'You must provide the Metal component namespace.';
				}

				return true;
			}
		},
		{
			type: 'input',
			name: 'repoOwner',
			message: 'What\'s the GitHub username?',
			default: 'my-user',
			validate: function(input) {
				if (!input) {
					return 'You must provide a GitHub username.';
				}

				return true;
			}
		},
		{
			type: 'input',
			name: 'repoDescription',
			message: 'How would you describe this project?',
			default: 'My awesome AlloyUI project'
		}];

		this.prompt(prompts, function (props) {
			this.capitalizeName = _.capitalize(props.componentName);
			this.lowercaseName = props.componentName.toLowerCase();

			this.namespace = props.namespace;
			this.repoName = props.namespace + '-' + this.lowercaseName;
			this.repoOwner = props.repoOwner;
			this.repoDescription = props.repoDescription;

			done();
		}.bind(this));
	},

	writing: function () {
		this.fs.copyTpl(
			this.templatePath('demos/_index.html'), this.destinationPath('demos/index.html'),
			{
				capitalizeName: this.capitalizeName,
				lowercaseName: this.lowercaseName
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.js'), this.destinationPath('src/' + this.capitalizeName + '.js'),
			{
				capitalizeName: this.capitalizeName
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/_boilerplate.scss'), this.destinationPath('src/' + this.lowercaseName + '.scss'),
			{
				lowercaseName: this.lowercaseName
			}
		);
		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.soy'), this.destinationPath('src/' + this.capitalizeName + '.soy'),
			{
				capitalizeName: this.capitalizeName
			}
		);
		this.fs.copyTpl(
			this.templatePath('test/_Boilerplate.js'), this.destinationPath('test/' + this.capitalizeName + '.js'),
			{
				capitalizeName: this.capitalizeName
			}
		);
		this.fs.copy(
			this.templatePath('test/jshintrc'), this.destinationPath('test/.jshintrc')
		);
		this.fs.copyTpl(
			this.templatePath('_bower.json'), this.destinationPath('bower.json'),
			{
				capitalizeName: this.capitalizeName,
				namespace: this.namespace,
				repoName: this.repoName,
				repoDescription: this.repoDescription
			}
		);
		this.fs.copyTpl(
			this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'),
			{
				lowercaseName: this.lowercaseName,
				repoName: this.repoName
			}
		);
		this.fs.copy(
			this.templatePath('_karma.conf.js'), this.destinationPath('karma.conf.js')
		);
		this.fs.copyTpl(
			this.templatePath('_package.json'), this.destinationPath('package.json'),
			{
				namespace: this.namespace,
				repoName: this.repoName,
				repoOwner: this.repoOwner,
				repoDescription: this.repoDescription
			}
		);
		this.fs.copyTpl(
			this.templatePath('_README.md'), this.destinationPath('README.md'),
			{
				repoName: this.repoName,
				repoDescription: this.repoDescription
			}
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
