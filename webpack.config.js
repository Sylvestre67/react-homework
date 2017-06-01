const path = require('path');
const webpack = require('webpack');

const LiveReloadPlugin  = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCss = (process.env.NODE_ENV === 'production')
	? new ExtractTextPlugin({ filename: '[contenthash].css' })
	: new ExtractTextPlugin({ filename: '[name].css' });

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry:
		{
			app:'./index.js',
		},
	output:{
		path:  path.resolve(__dirname, 'static/'),
		filename: '[name].js',
		publicPath: '/',
	},
	resolve:{
		modules:[
			path.resolve(__dirname, 'src/'),
			path.resolve(__dirname, 'node_modules'),
		],
	},
	module:{
		rules:[
			{
				test: /\.js$/,
				use: ['babel-loader','eslint-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				use: ['eslint-loader','babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: extractCss.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options:{
							sourceMap:true,
							minimize:true,
						}
					},
				})
			},
			{
				test: /\.less$/,
				use: extractCss.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options:{
								minimize:true,
								sourceMap:true
							}
						},
						{
							loader: 'less-loader',
							options:{
								sourceMap: true,
								paths: [
									path.resolve(__dirname, './assets'),
									path.resolve(__dirname, 'node_modules'),
								]
							}
						}
					],
				}),
			},
			{
				test: /\.html$/, use: ['raw-loader']
			},
			{
				test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			}
		],
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	plugins: [
		new LiveReloadPlugin({}),
		extractCss,
		new HtmlWebpackPlugin({
			chunks: ['app'],
			title:'discount-ascii-warehouse"',
			filename: './index.html',
			template: './index.ejs',
		}),
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test',
			STATIC_DIRECTORY: '\"/static/dist/\"',
		}),
		new CopyWebpackPlugin([

		], {})
	]
};
