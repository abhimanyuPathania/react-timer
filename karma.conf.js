var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
	config.set({
		//browser in which tests are run
		browsers: ['Chrome'],
		singleRun: true,

		// testing framework used
		frameworks: ['mocha'],

		// locations of files containing the tests
		files: ['app/tests/**/*.test.jsx'],

		// this tells karma to run preprocessors before running the tests
		// we need webpack to load our components
		// sourcemap to point errors to correct files and not the bundle.js
		preprocessors: {
			'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
		},
		reporters: ['mocha'],

		// test runner configuration
		client: {
			// mocha to cancel the test if it takes more than 5 seconds
			mocha: {
				timeout: '5000'
			}
		},

		webpack: webpackConfig,
		// we don't care about the webpackServer
		webpackServer: {
			noInfo: true
		}
	});
}