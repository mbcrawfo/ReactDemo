import CleanWebpackPlugin from 'clean-webpack-plugin';
import glob from 'glob';
import { last } from 'lodash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import merge from 'webpack-merge';

// files in this folder are loaded as webpack entry points
const entryPointsPath = path.resolve(__dirname, 'app/pages');
// ...except files and folders starting with underscore
const ignoredEntryPointsPaths = [ '**/_*', '**/_*/**' ];
// destination for scripts and assets
const outputPath = path.resolve(__dirname, 'dist');
const outputPublicPath = '/dist/';
// destination for the manifest mapping entrypoints to output files
const manifestOutputPath = path.resolve(__dirname, 'webpack-assets.json');
const serverEntryPoint = 'serverComponentPackage';

export default env =>
{
    const isDev = env.dev as boolean;

    const baseConfig: webpack.Configuration = {
        target: 'web',

        mode: isDev ? 'development' : 'production',

        devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

        stats: {
            builtAt: true,
            colors: true,
        },

        resolve: {
            // must be kept in sync with the tsconfig paths setting
            alias: {
                '@app': path.resolve(__dirname, 'app'),
                '@bootstrap-css': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
            },
            extensions: ['.ts', '.tsx', '.js', '.json', '.html'],
        },

        // Entries are built based on their relative path joined by underscores.  For example
        // {entryPointsPath}/foo/bar/index.ts => foo_bar_index
        entry: () =>
        {
            const entries = {
                [serverEntryPoint]: './app/server.js',
            };

            const entriesGlob = path.resolve(entryPointsPath, '**/*.@(ts|tsx|js|jsx)');
            const lastParentSegment = last(entryPointsPath.split(path.sep));

            glob.sync(entriesGlob, { ignore: ignoredEntryPointsPaths }).forEach(file =>
            {
                // file uses unix separators
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
            publicPath: outputPublicPath,
        },

        module: {
            rules: [
                // typescript
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [ 'ts-loader' ],
                },

                // javascript
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [ 'env' ],
                            },
                        },
                    ],
                },

                // process source maps for all js files
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: [ 'source-map-loader' ],
                },

                // css
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },

                // less
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                    ],
                },

                // images
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]',
                            },
                        },
                     ],
                },

                // fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]',
                            },
                        },
                     ],
                },
            ],
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),

            // make jquery globally available
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
            }),

            // output the manifest the server will use to generate css and script includes
            new WebpackAssetsManifest({
                output: manifestOutputPath,
                writeToDisk: true,
                publicPath: true,
                entrypoints: true,
            }),
        ],

        // always split chunks to avoid duplicating code between the layout and page entrypoints
        optimization: {
            splitChunks: {
                // A slight hack for the server entrypoint... if it is split, webpack generates
                // code to load the split chunks using the window global.  This fails because window
                // isn't present in the server side environment (basically node within .NET)
                chunks: chunk => chunk.name !== serverEntryPoint,
            },
        },
    };

    const environmentConfig = isDev ? devAdditionalConfig() : prodAdditionalConfig();
    return merge(baseConfig, environmentConfig);
};

const devAdditionalConfig = (): webpack.Configuration => ({
    output: {
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/vendors/chunk.[chunkhash].js',
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/chunk.[contenthash].css',
        }),
    ],

    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
    },
});

const prodAdditionalConfig = (): webpack.Configuration => ({
    output: {
        filename: 'scripts/[name].[chunkhash].min.js',
        chunkFilename: 'scripts/vendors/chunk.[chunkhash].min.js',
    },

    plugins: [
        new CleanWebpackPlugin(outputPath, { verbose: true }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].min.css',
            chunkFilename: 'css/chunk.[contenthash].min.css',
        }),
    ],
});
