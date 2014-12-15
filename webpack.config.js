module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
   module: {
     loaders: [
      
       // 拡張子がCSSの場合はCSSのLoaderを採用
       { test: /\.css$/, loader: 'style!css' },
    
       // bootstrap.cssの中に使うWebFontを（デフォルトで）base64エンコードされます
       { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
       { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
       { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
       { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
     ]
   }
};
