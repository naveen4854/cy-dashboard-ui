const path = require('path');
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')


const path_base = path.resolve(__dirname, '..');
function base() {
  const args = [path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}


const paths = {
  DIST: path_base + '/dist',
  JS: path.resolve(__dirname, 'src/js'),
  SRC: path.resolve(__dirname, 'src'),
  client: base.bind(null, path.resolve(__dirname, 'src')),
  dist: base.bind(null, path.resolve(__dirname, 'dist')),
  
};


const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map', 
  resolve: {
    modules: [
      paths.SRC,
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  module: {
    rules: [],
  }
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = path_base+'/src/main.js';

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.DIST,
  publicPath: '/CyDashboard/'
}


// ------------------------------------
// Bundle External
// ------------------------------------
webpackConfig.externals = {
  './static/envconfig': 'envconfig'
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: path_base+'/src/index.html',
    hash: false,
    favicon: path_base+'/src/public/static/favicon.png',
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
   
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}


const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__,
})

webpackConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // we polyfill needed features in src/normalize.js
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ],
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          modules: false,
          targets: {
            ie9: true,
          },
          uglify: true,
        }]
      ]
    },
  }],
})

webpackConfig.module.rules.push({
  test: /\.(css|sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: config.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll: true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: config.sourcemaps,
          },
        },
      },
   
    ],
  })
})

webpackConfig.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  
})

 // Fonts
  // ------------------------------------
  ;[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
  ].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]

    webpackConfig.module.rules.push({
      test: new RegExp(`\\.${extension}$`),
      loader: 'url-loader',
      options: {
        name: 'fonts/[name].[ext]',
        limit: 10000,
        mimetype,
      },
    })
  })

webpackConfig.plugins.push(extractStyles)

module.exports = webpackConfig
