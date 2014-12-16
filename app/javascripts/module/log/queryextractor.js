var _ = require('underscore');


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
            excecuted = self.embedParams( statement, params);
        return { statement: statement,
                 params: params,
                 excecuted: excecuted};
    };

    this.embedParams = function( statement, params) {
        var embedded = statement,
            quoted = '';
        _.each( params, function( param ) {
            quoted = "'" + param + "'";
            embedded = embedded.replace( '?', quoted);
        });
        return embedded;
    };
};

module.exports = new QueryExtractor();
