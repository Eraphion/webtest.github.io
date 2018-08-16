const sync = require("browser-sync-webpack-plugin");
const path = require("path");
const prefixer = require('autoprefixer');
const extractCss = require("extract-text-webpack-plugin");

let devModeSettings = { //seems doesn't affect except url
    cssOptions: {
        minimize: false,
        url: false
    },
    path: path.resolve(__dirname,"out")
}

let config = {
    entry: "./modules/main.js",
    output: {
        filename: "bundle.js",
        path: devModeSettings.path,
    },
    watch: true, // отслеживание изменений
    plugins: [
        new sync({
            host: "localhost",
            port: 6555,
            server: {
                baseDir: devModeSettings.path
            },
            open: false
            //,files: ["./*.html"]
        }),
        new extractCss("styles.css")
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use:
                    extractCss.extract({
                        use:
                        [
                            {
                                loader: "css-loader",
                                options: devModeSettings.cssOptions
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        prefixer ({browsers: ['ie >= 9', 'last 2 version']})
                                    ]}
                            },
                            "less-loader"
                        ]})
            },
            {
                test: /\.(?:png|jpe?g|gif|tiff)$/, // assets/* -> out/*
                use:
                 [
                    {
                        loader: "file-loader",
                        options: {
                            regExp: /modules(.*)/, 
                            name: '[1]' 
                        }
                    } 
                ]
            },
            {
                test: /\.pug$/, 
                loader: ['raw-loader', 'pug-html-loader']
            }
        ]
    }
}

module.exports = (env, options) => {
   if(options.mode == "production")
   {
        devModeSettings.cssOptions.minimize = true;
   }
    return config;
}