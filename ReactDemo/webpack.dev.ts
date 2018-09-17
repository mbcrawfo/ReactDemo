import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

import { outputPath, default as commonConfig } from './webpack.common';

const config: webpack.Configuration = webpackMerge(commonConfig, {
    mode: 'development',

    devtool: 'inline-source-map'
});

export default config;