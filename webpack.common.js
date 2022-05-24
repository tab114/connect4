const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {main: './game/app.js'},
	plugins: [new HtmlWebpackPlugin({template: './game/template.html'})],
};
