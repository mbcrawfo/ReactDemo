import path from 'path';
import glob from 'glob';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

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
        target: 'web',
        devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

        entry: function()
        {
            const pageGlob = path.resolve('./app/pages', '**/*.@(ts|tsx|js)');
            const ignoredPaths = [ '**/_*', '**/_*/**' ];
            const entries = {};

            glob.sync(pageGlob, { ignore: ignoredPaths }).forEach(file =>
            {
                const pathSegments = path.dirname(file).split('/');
                const pagesIndex = pathSegments.indexOf('pages');
                const prefix = pathSegments.slice(pagesIndex + 1).join('_');
                let entrypoint = path.basename(file, path.extname(file));

                if (prefix)
                {
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
            publicPath: `/${outputPathName}/`
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

    if (isDev)
    {
        config.watchOptions = {
            aggregateTimeout: 500,
            ignored: /node_modules/,
        };
    }

    if (!isDev)
    {
        config.plugins.push(new CleanWebpackPlugin(outputPath, {
            verbose: true
        }));
    }

    return config;
};