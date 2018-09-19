import path from 'path';
import webpack from 'webpack';

export const outputPath = path.resolve(__dirname, 'dist');
export const outputPublicPath = '/dist/';

export const buildConfig = (isDev: boolean): webpack.Configuration =>
{
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
        devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

        stats: {
            colors: true
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
                }
            ]
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            }),

            new webpack.NoEmitOnErrorsPlugin()
        ]
    };

    return config;
};