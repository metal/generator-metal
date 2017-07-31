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
			default: 'SelectInput',
			validate: function(input) {
				if (!input) {
					return 'You must provide a class name.';
				}
				if (!/^[^_\-\s\d][^_\-\s]*$/.test(input)) {
					return 'Invalid class name. Class names can\'t contain whitespace or ' +
					'any of the following characters: "-_". Also, class names can\'t ' +
					'start with digits.';
				}

				return true;
			}
		},
		{
			type: 'list',
			name: 'superClass',
			message: 'What do you want your class to extend from?',
			choices: ['Component', 'State', 'None'],
			default: 'Component'
		},
		{
			type: 'list',
			name: 'templateLanguage',
			message: 'Which template language do you want to use?',
			choices: ['Soy', 'JSX', 'None'],
			default: 'Soy',
			when: function(props) {
				return props.superClass === 'Component';
			}
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
			type: 'list',
			name: 'testEnviroment',
			message: 'Which test enviroment do you want to use?',
			choices: ['Jest', 'Karma'],
			default: 'Jest'
		},
		{
			type: 'confirm',
			name: 'isNodeModule',
			message: 'Is this component supposed to run on node environment? (that is, should other modules be able to "require" and use it?)',
			default: false
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
			var componentName = props.componentName;

			this.camelCaseName = _.camelCase(componentName);
			this.componentName = componentName;
			this.capitalizeName = _.startCase(componentName);
			this.kebabCaseName = _.kebabCase(componentName);

			this.testEnviroment = props.testEnviroment;
			this.isNodeModule = props.isNodeModule;
			this.repoName = 'metal-' + this.kebabCaseName;
			this.repoOwner = props.repoOwner;
			this.repoDescription = props.repoDescription;
			this.buildFormat = props.buildFormat;
			this.superClass = props.superClass;
			this.templateLanguage = props.templateLanguage || 'None';

			done();
		}.bind(this));
	},

	writing: function () {
		this.destinationRoot(this.repoName);

		var demoTemplateName = 'demos/_' + this.buildFormat + '.html';
		if (this.superClass === 'Component') {
			this.fs.copyTpl(
				this.templatePath(demoTemplateName), this.destinationPath('demos/index.html'),
				{
					camelCaseName: this.camelCaseName,
					componentName: this.componentName,
					capitalizeName: this.capitalizeName,
					kebabCaseName: this.kebabCaseName,
					repoName: this.repoName
				}
			);
			this.fs.copyTpl(
				this.templatePath('src/_boilerplate.scss'), this.destinationPath('src/' + this.kebabCaseName + '.scss'),
				{
					kebabCaseName: this.kebabCaseName
				}
			);
			if (this.templateLanguage === 'Soy') {
				this.fs.copyTpl(
					this.templatePath('src/_Boilerplate.soy'), this.destinationPath('src/' + this.componentName + '.soy'),
					{
						componentName: this.componentName,
						kebabCaseName: this.kebabCaseName
					}
				);
			}
		}
		this.fs.copyTpl(
			this.templatePath('src/_Boilerplate' + this.superClass + '.js'), this.destinationPath('src/' + this.componentName + '.js'),
			{
				buildFormat: this.buildFormat,
				componentName: this.componentName,
				templateLanguage: this.templateLanguage,
				kebabCaseName: this.kebabCaseName
			}
		);
		this.fs.copyTpl(
			this.templatePath('__tests__/_Boilerplate.js'), this.destinationPath('__tests__/' + this.componentName + '.js'),
			{
				componentName: this.componentName,
				testEnviroment: this.testEnviroment
			}
		);
		this.fs.copy(
			this.templatePath('__tests__/jshintrc'), this.destinationPath('__tests__/.jshintrc')
		);
		if (this.testEnviroment === 'Karma') {
			this.fs.copyTpl(
				this.templatePath('_karma.conf.js'), this.destinationPath('karma.conf.js'),
				{
					buildFormat: this.buildFormat,
					templateLanguage: this.templateLanguage
				}
			);
			this.fs.copy(
				this.templatePath('_karma-coverage.conf.js'), this.destinationPath('karma-coverage.conf.js')
			);
		}
		if (this.isNodeModule) {
			this.fs.copy(
				this.templatePath('env/test/_node.js'), this.destinationPath('env/test/node.js')
			);
		}
		if (this.buildFormat === 'jquery') {
			this.fs.copy(
				this.templatePath('_test-env.js'), this.destinationPath('test-env.js')
			);
		}
		this.fs.copyTpl(
			this.templatePath('_package.json'), this.destinationPath('package.json'),
			{
				buildFormat: this.buildFormat,
				componentName: this.componentName,
				testEnviroment: this.testEnviroment,
				repoName: this.repoName,
				repoOwner: this.repoOwner,
				repoDescription: this.repoDescription,
				superClass: this.superClass,
				templateLanguage: this.templateLanguage
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
		this.fs.copyTpl(
			this.templatePath('_CONTRIBUTING.md'), this.destinationPath('CONTRIBUTING.md'),
			{
				repoName: this.repoName,
				repoOwner: this.repoOwner
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
		this.fs.copyTpl(
			this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js'),
			{
				componentName: this.componentName,
				kebabCaseName: this.kebabCaseName,
				buildFormat: this.buildFormat,
				repoName: this.repoName
			}
		);
		this.fs.copyTpl(
			this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'),
			{
				testEnviroment: this.componentName
			}
		);
	},

	install: function () {
		this.npmInstall();
	}
});
