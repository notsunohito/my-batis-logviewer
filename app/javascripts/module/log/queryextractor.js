var _ = require('underscore');


var QueryExtractor = function() {
    var self = this,
        queryMark = new RegExp(/(?:Executing Statement: +([\s\S]+?)"(?:\r\n?|\n)).*Parameters: +\[([^\]]+)\]"/g);
    
    this.extract = function( rawContent ) {
        var queries = [],
            threelines = this.extract3lines( rawContent );

        queries = _.map( threelines, function( threeline ) { 
            return self.createQuery( threeline ); 
        });

        return queries;
    };

    this.createQuery = function( threeline ) {
        var query = { statement: '', params: [] };
        query.statement = threeline[0].replace(/ +/g,' ');
        query.params = threeline[1].split(', ');
        return query;
    };

    this.extract3lines = function( rawContent ) {
        var queries    = [];
        var statement = '';
        var params = [];
        var match;
        while (match = queryMark.exec(rawContent)) {
            statement = match[1];
            params = match[2];
            queries.push( [ statement, params] );
        }
        return queries;
    };
    this.createExcecuted = function() {
        
    }
};

module.exports = new QueryExtractor();
