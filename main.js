require('normalize-css');
require('./app/stylesheets/style.css');
require('./app/stylesheets/lib/tomorrow-night.css');

(function() {
    var Application = require('./app/javascripts/app.js');
    Application.initialize();
})();
