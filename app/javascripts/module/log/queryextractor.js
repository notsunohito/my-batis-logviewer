var _ = require('underscore');
var hl = require("highlight.js");


var QueryExtractor = function() {
    var self = this,
        queryMark = new RegExp(/(?:Executing Statement: +(.+?)"(?:\r\n?|\n)).*Parameters: +\[([^\]]+)\]"/g);
    
    this.extract = function( rawContent ) {
        var queries = [],
            extracts = self.extractStatementParams( rawContent );
        queries = _.map( extracts, function( extract ) { 
            return self.createQuery( extract ); 
        });
        return queries;
    };

    this.extractStatementParams = function( rawContent ) {
        var queries    = [],
            statement = '',
            params = [],
            match = [];
        while (match = queryMark.exec(rawContent)) {
            statement = match[1];
            params = match[2];
            queries.push( [ statement, params] );
        }
        return queries;
    };

    this.createQuery = function( extract ) {
        var statement = extract[0].replace(/ +/g,' '),
            params = extract[1].split(', '),
            executed = self.embedParams( statement, params);
        return { statement: statement,
                 params: params,
                 executed: hl.highlight('sql', executed).value };
    };

    this.embedParams = function( statement, params) {
        var embedded = statement,
            quotedParam = '';
        _.each( params, function( param ) {
            quotedParam = "'" + param + "'";
            embedded = embedded.replace( '?', quotedParam);
        });
        return embedded;
    };
};

module.exports = new QueryExtractor();
