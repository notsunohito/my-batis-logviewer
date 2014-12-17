var _ = require('underscore');
var $ = require('jquery');
var QueryExtractor = require('./module/log/queryextractor.js');
var Query    = require('./query/query.js');
var Queries  = require('./query/queries.js');
var QueriesView = require('./query/queriesview.js');

var Application = {
    initialize: function() {
        $('#loginput').on('change', this.display);
    },
    display: function() {
        var text = $('#loginput')[0].value;
        if(!text) return;
        var queries = QueryExtractor.extract( text  );
        Application.render( queries );
    },
    render: function(qArr) {
        var models = _.map(qArr, function(query) { return new Query(query); });
        var queries = new Queries( models );
        var queriesView = new QueriesView({collection: queries });
        $('#main').html( queriesView.render().el );
    }
};

module.exports = Application;
