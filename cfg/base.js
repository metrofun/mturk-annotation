var path = require('path');
var port = 8000;
var srcPath = path.join(__dirname, '/../src');
var publicPath = '/assets/';

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolveLoader: { root: path.join(__dirname, '../node_modules') },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
          test: /\.json/,
          loader: 'json'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
          test: /\.txt/,
          loader: 'raw'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  postcss: function () {
      return [
          require('cssnext')({
              browsers: ['last 2 versions']
          })
      ];
  }
};
