import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

import entrypoints from "./webpack.entrypoints";

export default function()
{
    const isDev = process.env.NODE_ENV === 'development';

    const outputPathName = 'dist';
    const outputPath = path.resolve(__dirname, outputPathName);

    const babelLoader: webpack.RuleSetUseItem = {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: [
                "env"
            ]
        }
    };

    const config: webpack.Configuration = {
        mode: isDev ? 'development' : 'production',
        cache: true,
        target: 'web',
        devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

        entry: entrypoints,

        output: {
            path: outputPath,
            filename: isDev ? '[name].[chunkhash].js' : '[name].[chunkhash].min.js',
            chunkFilename: isDev ? '[name].[chunkhash].js' : '[name].[chunkhash].min.js',
            publicPath: `/${outputPathName}/`,
            library: 'MyTest',
            libraryTarget: 'var'
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.html']
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [ babelLoader, 'ts-loader' ]
                },

                {
                    test: /\.js$/,
                    use: [ babelLoader ]
                },

                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },

                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader'
                    ]
                },

                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [ 'file-loader' ]
                },

                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [ 'file-loader' ]
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(outputPath, {
                verbose: true
            }),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            }),

            new MiniCssExtractPlugin({
                filename: isDev ? '[name].[contenthash].css' : '[name].[contenthash].min.css',
                chunkFilename: isDev ? '[name].[contenthash].css' : '[name].[contenthash].min.css'
            }),

            new WebpackAssetsManifest({
                output: path.resolve(__dirname, 'webpack-assets.json'),
                writeToDisk: true,
                publicPath: true,
                entrypoints: true
            }),

            new webpack.NoEmitOnErrorsPlugin()
        ],

        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },

        stats: {
            colors: true
        }
    };

    return config;
};