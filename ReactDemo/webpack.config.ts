import path from 'path';
import glob from 'glob';
import _ from 'lodash';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const entryPointPagesPath = path.resolve(__dirname, './app/pages');
const outputPath = path.resolve(__dirname, 'dist');
const outputPublicPath = '/dist/';
const manifestOutputPath = path.resolve(__dirname, 'webpack-assets.json');

export default () =>
{
    const isDev = process.env.NODE_ENV === 'development';

    const babelLoader: webpack.RuleSetUseItem = {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: [
                "env"
            ]
        }
    };

    const baseConfig: webpack.Configuration = {
        target: 'web',
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

        stats: {
            colors: true
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.html']
        },

        entry: () =>
        {
            const pageGlob = path.resolve(entryPointPagesPath, '**/*.@(ts|tsx|js)');
            const ignoredPaths = [ '**/_*', '**/_*/**' ];
            const lastParentSegment = _.last(entryPointPagesPath.split(path.sep));
            const entries = {
                serverSideRender: './app/server.js'
            };

            glob.sync(pageGlob, { ignore: ignoredPaths }).forEach(file =>
            {
                // file always uses unix separators
                const pathSegments = path.dirname(file).split('/');
                const prefixStart = pathSegments.lastIndexOf(lastParentSegment) + 1;
                let entrypoint = path.basename(file, path.extname(file));

                if (prefixStart < pathSegments.length)
                {
                    const prefix = pathSegments.slice(prefixStart).join('_');
                    entrypoint = `${prefix}_${entrypoint}`;
                }

                entries[entrypoint] = file;
            });

            return entries;
        },

        output: {
            path: outputPath,
            filename: isDev ? '[name].js' : '[name].[chunkhash].min.js',
            chunkFilename: isDev ? '[name].chunk.js' : '[name].chunk.[chunkhash].min.js',
            publicPath: outputPublicPath
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
                    test: /\.js$/,
                    use: [ 'source-map-loader' ],
                    enforce: 'pre'
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
            new webpack.NoEmitOnErrorsPlugin(),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            }),

            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[contenthash].min.css',
                chunkFilename: isDev ? '[name].chunk.css' : '[name].chunk.[contenthash].min.css'
            }),

            new WebpackAssetsManifest({
                output: manifestOutputPath,
                writeToDisk: true,
                publicPath: true,
                entrypoints: true
            })
        ]
    };

    const environmentConfig = isDev ? buildDevAdditions() : buildProdAdditions();
    return merge(baseConfig, environmentConfig);
};

const buildDevAdditions = (): webpack.Configuration => ({
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
    }
});

const buildProdAdditions = (): webpack.Configuration => ({
    plugins: [
        new CleanWebpackPlugin(outputPath, {
            verbose: true
        })
    ]
});