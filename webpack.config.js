const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './game/app.js',
	output: {
		filename: 'main.[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: './game/template.html'
	})],
}
