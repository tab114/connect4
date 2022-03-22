const path = require('path');

module.exports = {
	mode: 'development',
	entry: './game/app.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
}