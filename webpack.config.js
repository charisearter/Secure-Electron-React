const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/renderer/index.js',
	output: {
		path: path.resolve(__dirname, 'src/dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			// loads .js/jsx/json files
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, 'src/renderer')],
				loader: 'babel-loader',
				resolve: {
					extensions: ['.js', '.jsx', '.json'],
				},
			},
			{
				// loads .html files
				test: /\.(html)$/,
				include: [path.resolve(__dirname, 'src/renderer')],
				use: {
					loader: 'html-loader',
				},
			},
			{
				// loads  .scss and .css files
				test: [/\.s[ac]ss$/i, /\.css$/i],
				include: [path.resolve(__dirname, 'src/renderer')],
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
			filename: 'index.html',
		}),
	],
};
