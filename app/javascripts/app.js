var _ = require('underscore');
var QueryExtractor = require('./module/log/queryextractor.js');

var Application = {
    initialize: function() {
        $('#file-input').on('change', this.display);
    },
    display: function( text ) {
        var queries = QueryExtractor.extract( text  );
        Application.render( queries );
    },
    render: function(messageArr) {

        $('#main').html( queriesView.render().el );
    }
};

module.exports = Application;
