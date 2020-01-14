import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
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
			react: 'preact', // for styled-jsx
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
		new CleanWebpackPlugin(),
		new WebpackExtensionManifestPlugin({
			config: {
				base: require('./src/manifest.json'),
				extend: { version: require('./package.json').version },
			},
		}),
		new CopyPlugin([
			{
				from: require.resolve('webextension-polyfill'),
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
		env.dev &&
			new ExtensionReloader({
				port: 8080,
				entries: {
					background: 'background', // REQUIRED
					popup: 'popup',
				},
			}),
	].filter(Boolean),

	devServer: {
		port: 8001,
		quiet: true,
		writeToDisk: true,
		disableHostCheck: true,
	},
})
