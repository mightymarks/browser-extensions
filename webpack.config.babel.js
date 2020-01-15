import CopyPlugin from 'copy-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import SizePlugin from 'size-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { ProvidePlugin } from 'webpack'
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin'
import ExtensionReloader from 'webpack-extension-reloader'

const DIST = path.resolve(__dirname, 'dist')

export default (env = {}) => ({
	target: 'web',

	mode: env.prod ? 'production' : 'development',

	devtool: env.prod ? 'source-map' : 'inline-cheap-module-source-map',

	entry: {
		background: './src/background/index.ts',
		popup: './src/popup/index.tsx',
	},

	output: {
		filename: '[name].js',
		path: DIST,
	},

	module: {
		rules: [
			{
				test: /\.[tj]sx?$/i,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [['@babel/preset-env', { modules: false }]],
				},
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		mainFields: ['module', 'browser', 'main'],
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
	},

	watch: env.dev,
	performance: false,
	stats: env.dev ? 'none' : 'errors-warnings',

	optimization: {
		minimize: env.prod,
		minimizer: [
			new TerserPlugin({
				test: /\.[tj]sx?$/i,
				sourceMap: true,
			}),
		],
	},

	plugins: [
		new ProvidePlugin({
			React: 'react',
		}),
		new WebpackExtensionManifestPlugin({
			config: {
				base: require('./src/manifest.json'),
				extend: { version: require('./package.json').version },
			},
		}),
		new CopyPlugin([
			{
				from: require
					.resolve('webextension-polyfill')
					.replace('.js', '.min.js'),
				to: DIST,
			},
			{
				from: require
					.resolve('webextension-polyfill')
					.replace('.js', '.min.js.map'),
				to: DIST,
			},
		]),
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			chunks: ['popup'],
			inject: false,
			template: require('html-webpack-template'),
			appMountId: 'app',
		}),
		env.dev && new FriendlyErrorsWebpackPlugin(),
		env.dev &&
			new ExtensionReloader({
				port: 8080,
				entries: {
					background: 'background', // REQUIRED
					popup: 'popup',
				},
			}),
		env.prod &&
			new SizePlugin({
				exclude: '{report,browser-polyfill}.*',
				filename: './.tmp/size-plugin.json',
			}),
	].filter(Boolean),

	devServer: {
		port: 8001,
		quiet: true,
		writeToDisk: true,
		disableHostCheck: true,
	},
})
