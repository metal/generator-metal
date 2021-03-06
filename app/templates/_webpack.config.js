const webpack = require('webpack');

module.exports = {
	entry: './src/<%= componentName %>.js',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					compact: false,
					presets: ['babel-preset-es2015'],
					plugins: ['babel-plugin-transform-node-env-inline']
				}
			}
		}, {
			test: /\.scss$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "sass-loader"
			}]
		}]
	},
	output: {<% if (buildFormat === 'amd') { %>
		library: '<%= repoName %>/src/<%= componentName %>',
		libraryTarget: '<%= buildFormat %>',
		filename: './build/<%= buildFormat %>/<%= repoName %>/src/<%= componentName %>.js'<% } else { %>
		library: 'metal',
		libraryTarget: 'this',
		filename: './build/<%= buildFormat %>/<%= kebabCaseName %>.js'<% } %>
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
