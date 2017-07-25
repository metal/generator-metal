'use strict';

const extractTextPlugin = require("extract-text-webpack-plugin");
const karmaWebpack = require('karma-webpack');
const sourceMapLoader = require("karma-sourcemap-loader");
const metalKarmaConfig = require("metal-karma-config");

module.exports = function (config) {
	metalKarmaConfig(config);
	config.plugins.push(karmaWebpack, sourceMapLoader);
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [<% if (buildFormat === 'jquery') { %>
			'node_modules/jquery/dist/jquery.min.js',<% } %>
			'__tests__/**/*.js'
		],

		webpack: {
			module: {
				rules: [<% if (templateLanguage === 'JSX') { %>
					{
						test: /\.js$/,
						exclude: /(node_modules)/,
						use: {
							loader: 'babel-loader',
							options: {
								compact: false,
								presets: ['babel-preset-es2015']
							}
						}
					},<% } %>
					{
						test: /\.scss$/,
						use: extractTextPlugin.extract({
							fallback: "style-loader",
							use: "css-loader"
						})
					}
				]
			},
			plugins: [
				new extractTextPlugin("styles.css"),
			]
		},

		webpackMiddleware: {
      noInfo: true
    },

    preprocessors: {
      '__tests__/**/*.js': ['webpack', 'sourcemap']
		},

		singleRun: true,

    browsers: ['Chrome']
  });
};
