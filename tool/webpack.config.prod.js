import path from 'path'
import webpack from 'webpack'
import stats from './stats'

const basePath = path.resolve(__dirname, '../src');

export default {

	devtool: 'source-map',
	context: basePath,
	entry: path.join(basePath, 'index.js'),

	stats,

	output: {
		path: './build',
		filename: 'decorator.min.js',
		library: 'AspectDecorator',
		libraryTarget: 'umd'
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: [ /node_modules/ ],
				loader: 'babel'
			}
		]
	},

	resolve: {
		extensions: [ '', '.js' ]
	},

	plugins: [

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}