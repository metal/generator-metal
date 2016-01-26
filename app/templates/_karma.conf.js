'use strict';

var babelOptions = {
	presets: ['metal'],
	sourceMap: 'both'
};

module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'source-map-support', 'commonjs'],

		files: [
			'node_modules/closure-templates/soyutils.js',
			'node_modules/metal/src/**/*.js',
			'src/**/*.js',
			'test/**/*.js'
		],

		preprocessors: {
			'src/**/*.js': ['babel', 'commonjs'],
			'node_modules/metal/**/*.js': ['babel', 'commonjs'],
			'test/**/*.js': ['babel', 'commonjs']
		},

		browsers: ['Chrome'],

		babelPreprocessor: {options: babelOptions}
	});
};
