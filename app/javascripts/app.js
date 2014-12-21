var _              = require('underscore');
var $              = require('jquery');
var Backbone       = require('backbone');
var QueryExtractor = require('./module/log/queryextractor.js');
var QueriesView    = require('./query/queriesview.js');

var Application = {
    initialize: function() {
        $('#loginput').on('input', this.display);
        $('#clear').on('click', this.clear);
        $('#paste').on('click', this.paste);
    },
    display: function() {
        var input = $('#loginput')[0].value;
        var queries = QueryExtractor.extract( input );
        Application.render( queries );
    },
    render: function(queries) {
        var queryModels = _.map(queries, function(query) {
            return new Backbone.Model( query ); 
        });
        var queryCollection = new Backbone.Collection( queryModels );
        var queriesView = new QueriesView({ collection: queryCollection });
        $('#main').html( queriesView.render().el );
    },
    clear: function() {
        $('#loginput')[0].value = '';
        $('#main').empty();
    },
    paste: function() {
        if (window.clipboardData){
            var clipboardData = window.clipboardData.getData( "Text" );
            $('#loginput')[0].value = clipboardData;
            $('#loginput').trigger("input");
        }
    }
};

module.exports = Application;
