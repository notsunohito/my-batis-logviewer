require('normalize-css');
require('./app/stylesheets/style.css');

(function() {
    var Application = require('./app/javascripts/app.js');
    Application.initialize();
})();
