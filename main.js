require('normalize-css');
// require('./app/stylesheets/lib/tomorrow-night.css');
// require('./app/stylesheets/lib/atelier-seaside.light.css');
// require('./app/stylesheets/lib/atelier-lakeside.light.css');
// require('./app/stylesheets/lib/googlecode.css');
require('./app/stylesheets/lib/tomorrow.css');

require('./app/stylesheets/style.css');

(function() {
    var Application = require('./app/javascripts/app.js');
    Application.initialize();
})();
