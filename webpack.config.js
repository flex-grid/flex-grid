const path = require('path');
const globby = require('globby');

const packages = globby.sync(['packages/**'], {
    onlyDirectories: true, deep: 0
});

const entries = {};

packages.map((pkg)=>{
    const entry = pkg.split('/')[1];
    entries[entry] = `./${pkg}/src/index.ts`;
});

const buildPath = path.resolve(__dirname, './packages');

module.exports = {
    devtool: 'source-map',
    entry: entries,
    output: {
        filename: `[name]/dist/flex-grid.[name].js`,
        path: buildPath,
        library: ["flexGrid", "[name]"],
		libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env','@babel/preset-typescript']
                }
            }
        ]
    },
    plugins: [],
    resolve: {
        alias: {
            '@flex-grid': path.resolve(__dirname, './packages/')
        }
    }
};
