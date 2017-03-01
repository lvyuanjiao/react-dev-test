const fs = require('fs');
const path = require('path');
const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

const port = 8000;
const serverOptions = {
  contentBase: `http://localhost:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express();

app.use(Express.static(path.join(__dirname, './static')));

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  fs.createReadStream(path.join(__dirname, './index.html')).pipe(res);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', port);
  }
});
