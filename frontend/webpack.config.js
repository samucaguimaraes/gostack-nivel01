/**
 * Webpack: Identifica o tipo de arquivo e aciona o seu respectivo loader
 */
const path = require('path')

 module.exports = {
  /* Automação da busca por tipo de arquivo  - Entrada do arquivo */ 
  entry: path.resolve(__dirname, 'src', 'index.js'),
  /** Saída do arquivo */
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  /** Configuração do server do webpack - yarn add webpack-dev-server */
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), 
  },
  /** Regras para tratar cada arquivo */
  module:{
    rules: [
      /** Javascript com o babel  #yarn add babel-loader  */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
 };