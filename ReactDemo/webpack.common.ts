import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import AssetsWebpackPlugin from 'assets-webpack-plugin';

export const outputPath = path.resolve(__dirname, 'dist');

const config: webpack.Configuration = {
    entry: {
        index: './app/index.ts'
    },

    output: {
        path: outputPath,
        filename: '[name].[chunkhash].js',
        library: 'MyTest',
        libraryTarget: 'var'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.html']
    },

    target: 'web',

    module: {
        rules: [
            {
                test: /.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(outputPath, {
            verbose: true
        }),

        new AssetsWebpackPlugin({
            fullPath: true,
            prettyPrint: true
        }),

        new webpack.NoEmitOnErrorsPlugin()
    ],

    stats: {
        colors: true
    }
};

export default config;