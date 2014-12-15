var fs     = require('fs');
var iconv = require('iconv-lite');
require.extensions['.txt'] = function (module, filename) {
    var buffer = fs.readFileSync(filename);
    module.exports = iconv.decode( buffer, 'sjis' );
};

module.exports = require('./testdata.txt');
