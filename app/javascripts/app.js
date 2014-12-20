var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var QueryExtractor = require('./module/log/queryextractor.js');
var QueriesView = require('./query/queriesview.js');

var Application = {
    initialize: function() {
        $('#loginput').on('input', this.display);
    },
    display: function() {
        var text = $('#loginput')[0].value;
        if(!text) return;
        var queries = QueryExtractor.extract( text  );
        Application.render( queries );
    },
    render: function(qArr) {
        var models = _.map(qArr, function(query) { return new Backbone.Model( query ); });
        var queries = new Backbone.Collection( models );
        var queriesView = new QueriesView({collection: queries });
        $('#main').html( queriesView.render().el );
    }
};

module.exports = Application;
