import path from 'path';
import glob from 'glob';
import _ from 'lodash';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

// files in this folder are loaded as webpack entry points
const entryPointsPath = path.resolve(__dirname, 'app/pages');
// ...except files and folders starting with underscore
const ignoredEntryPointsPaths = [ '**/_*', '**/_*/**' ];
// destination for scripts and assets
const outputPath = path.resolve(__dirname, 'dist');
const outputPublicPath = '/dist/';
// destination for the manifest mapping entrypoints to output files
const manifestOutputPath = path.resolve(__dirname, 'webpack-assets.json');
const serverEntryPoint = 'serverSideRender';

export default env =>
{
    const isDev = <boolean> env.dev;

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
            builtAt: true,
            colors: true
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.html']
        },

        // Entries are built based on their relative path joined by underscores.  For example
        // {entryPointsPath}/foo/bar/index.ts => foo_bar_index
        entry: () =>
        {
            const entries = {
                [serverEntryPoint]: './app/server.js'
            };

            const entriesGlob = path.resolve(entryPointsPath, '**/*.@(ts|tsx|js|jsx)');
            const lastParentSegment = _.last(entryPointsPath.split(path.sep));

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
            filename: isDev ? '[name].js' : '[name].[chunkhash].min.js',
            chunkFilename: isDev ? '[name].chunk.js' : '[name].chunk.[chunkhash].min.js',
            publicPath: outputPublicPath
        },

        module: {
            rules: [
                // typescript
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        // babel generates source maps
                        babelLoader,
                        'ts-loader'
                    ]
                },

                // javascript
                {
                    test: /\.jsx?$/,
                    use: [ babelLoader ]
                },

                // css
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },

                // less
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader'
                    ]
                },

                // images
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [ 'file-loader' ]
                },

                // fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [ 'file-loader' ]
                }
            ]
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),

            // make jquery globally available
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            }),

            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[contenthash].min.css',
                chunkFilename: isDev ? '[name].chunk.css' : '[name].chunk.[contenthash].min.css'
            }),

            // output the manifest the server will use to generate css and script includes
            new WebpackAssetsManifest({
                output: manifestOutputPath,
                writeToDisk: true,
                publicPath: true,
                entrypoints: true
            })
        ],

        // always split chunks to avoid duplicate code between the layout and page entrypoints
        optimization: {
            splitChunks: {
                // a slight hack for the server entrypoint.  since we are using target='web',
                // chunked files won't load in Reactjs.NET (using node), they would need a
                // seperate config using target='node'.  to avoid this, disable chunking of
                // the server code.
                // this isn't really a loss, since a separate config would only have one
                // entry and would output one file anyway
                chunks: chunk => chunk.name !== serverEntryPoint
            }
        }
    };

    const environmentConfig = isDev ? devAdditionalConfig() : prodAdditionalConfig();
    return merge(baseConfig, environmentConfig);
};

const devAdditionalConfig = (): webpack.Configuration => ({
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
    }
});

const prodAdditionalConfig = (): webpack.Configuration => ({
    plugins: [
        new CleanWebpackPlugin(outputPath, { verbose: true })
    ]
});