import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import * as base from './webpack.config.base';

const outputPath = path.resolve(base.outputPath, 'server');

export const buildConfig = (isDev: boolean): webpack.Configuration =>
{
    const serverConfig: webpack.Configuration = {
        entry: {
            server: path.resolve(__dirname, './app/server.ts')
        },

        output: {
            path: outputPath,
            filename: '[name].js'
        },
    };

    const baseConfig = base.buildConfig(isDev);
    const environmentConfig = isDev ? buildDevAdditions() : buildProdAdditions();
    return merge(baseConfig, serverConfig, environmentConfig);
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