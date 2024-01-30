const path = require('path');

module.exports = (env, args) => {
    const isProduction = args.mode === 'production';

    console.log(`--- WEBPACK ---  Mode: ${args.mode}`);

    return {
        mode: isProduction ? 'production' : 'development',
        entry: "./src/app.js",
        cache: true,
        target: "node",
        output: {
            filename: "ubnt-discovery.js",
            path: path.join(__dirname, './dist'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
        },
        devtool: isProduction ? false : 'eval-cheap-module-source-map',
    }
};
