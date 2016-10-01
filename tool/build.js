import webpack from 'webpack';
import webpackConfig from './webpack.config.prod';

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		return reject(err);
	}
	console.log(stats.toString(webpackConfig.stats));
});