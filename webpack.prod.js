const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()], //minimising
	},
	plugins: [
		new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}), // accomplish asynchronous loading html/js/css
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
});
