import * as web from './webpack.config.web';
import * as server from './webpack.config.server';

export default () =>
{
    const isDev = process.env.NODE_ENV === 'development';

    return [
        web.buildConfig(isDev),
        server.buildConfig(isDev)
    ] ;
};