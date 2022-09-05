const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "khairul";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      path: path.resolve(__dirname, './public'),
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    devServer: {
      proxy: {
        '/v4/*': {
          target: 'https://api.spacexdata.com',
          secure: false,
          changeOrigin: true
        }
      },
      allowedHosts: 'all',
      compress: true,
      host: '0.0.0.0'
    }
  });
};
