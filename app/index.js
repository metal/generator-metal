'use strict';

var _      = require('lodash');
var chalk  = require('chalk');
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
			message: 'How do you want to name your class?',
			default: 'MyComponent',
			validate: function(input) {
				if (!input) {
					return 'You must provide a class name.';
				}

				return true;
			}
		},
		{
			type: 'list',
			name: 'superClass',
			message: 'Which class do you want your class to extend from?',
			choices: ['Component', 'Attribute', 'none'],
			default: 'Component'
		},
		{
			type: 'list',
			name: 'buildFormat',
			message: 'Which build format will this component use?',
			choices: ['globals', 'jquery', 'amd'],
			default: 'globals',
			validate: function(input) {
				if (!input) {
					return 'You must provide the Metal component build format.';
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
			default: 'My awesome Metal.js project'
		}];

		this.prompt(prompts, function (props) {
			this.capitalizeName = _.capitalize(props.componentName);
			this.lowercaseName = props.componentName[0].toLowerCase() + props.componentName.substr(1);

			this.repoName = 'metal-' + this.lowercaseName;
			this.repoOwner = props.repoOwner;
			this.repoDescription = props.repoDescription;
			this.buildFormat = props.buildFormat;
			this.superClass = props.superClass;

			done();
		}.bind(this));
	},

	writing: function () {
		var demoTemplateName = 'demos/_' + this.buildFormat + '.html';
		if (this.superClass === 'Component') {
			this.fs.copyTpl(
				this.templatePath(demoTemplateName), this.destinationPath('demos/index.html'),
				{
					capitalizeName: this.capitalizeName,
					lowercaseName: this.lowercaseName,
					repoName: this.repoName
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
					capitalizeName: this.capitalizeName,
					lowercaseName: this.lowercaseName
				}
			);
		}
		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate.js'), this.destinationPath('src/' + this.capitalizeName + '.js'),
			{
				capitalizeName: this.capitalizeName,
				lowercaseName: this.lowercaseName,
				superClass: this.superClass
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
				buildFormat: this.buildFormat,
				capitalizeName: this.capitalizeName,
				repoName: this.repoName,
				repoDescription: this.repoDescription
			}
		);
		this.fs.copyTpl(
			this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'),
			{
				buildFormat: this.buildFormat,
				lowercaseName: this.lowercaseName,
				repoName: this.repoName
			}
		);
		this.fs.copy(
			this.templatePath('_karma.conf.js'), this.destinationPath('karma.conf.js')
		);
		this.fs.copy(
			this.templatePath('_karma-coverage.conf.js'), this.destinationPath('karma-coverage.conf.js')
		);
		this.fs.copyTpl(
			this.templatePath('_package.json'), this.destinationPath('package.json'),
			{
				repoName: this.repoName,
				repoOwner: this.repoOwner,
				repoDescription: this.repoDescription
			}
		);
		this.fs.copyTpl(
			this.templatePath('_README.md'), this.destinationPath('README.md'),
			{
				repoName: this.repoName,
				repoDescription: this.repoDescription,
				superClass: this.superClass
			}
		);
		this.fs.copy(
			this.templatePath('_LICENSE.md'), this.destinationPath('LICENSE.md')
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
