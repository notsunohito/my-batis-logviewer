require('normalize-css');

require('./app/font/octicons.css');
require('./app/font/octicons.eot');
require('./app/font/octicons.svg');
require('./app/font/octicons.ttf');
require('./app/font/octicons.woff');

require('./app/stylesheets/lib/tomorrow.css');
require('./app/stylesheets/style.css');

(function() {
    var Application = require('./app/javascripts/app.js');
    Application.initialize();
})();
